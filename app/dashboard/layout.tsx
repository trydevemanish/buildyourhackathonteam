"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { CrumpledPaperIcon } from '@radix-ui/react-icons'
import ProtectedRoute from '@/components/ProtectedRoute'
import SideBarComp from '@/components/SideBarComp'
import { useUser } from '@clerk/nextjs'
import { Bell, Sidebar } from 'lucide-react'
import SidebarForSmSc from '@/components/SidebarForSmSc'
import Image from 'next/image'

interface Dashboardlayoutprops {
    children : React.ReactNode
}

// find user from the database , if user is there nothinh to do , if not create a new user

const DashboardLayout: React.FC<Dashboardlayoutprops> = (props) => {
    const [userCredit,setUserCredit] = useState<number>()
    const [showSidebar,setShowSideBar] = useState(false)
    
    const { user } = useUser()
    
    // useefeect to find user if no user create one.
    useEffect(() => {
      FindorcreateUser()
    },[user])

    async function FindorcreateUser(){
      try {

        const res = await fetch('/api/findandcreateUser',{
          method : 'POST',
          headers: {
            'Content-Type' : 'application/json'
          }
        })

        if(!res.ok){
          const errTxt = await res.text()
          console.log(errTxt)
          return ;
        }

        const result = await res.json()

        console.log(result?.message)
        
      } catch (error) {
        console.log(`Failed to create User: ${error}`)
      }
    }

    //useeffect to fetch total credit.
    useEffect(() => {
      findUserTotalCredit()
    },[])

    async function findUserTotalCredit(){
      try {
         
        const res = await fetch(`/api/findusercredit`)

        if(!res.ok){
          const errtext = await res.text()
          console.log(errtext)
          return;
        }

        const data = await res.json()

        if(!data){
          console.log('Failed to covert res to json')
          return;
        }

        console.log(data?.message)

        setUserCredit(data?.data?.initialCredit)
        
      } catch (error) {
        console.log(`Failed to create User: ${error}`)
      }
    }
    

    return(
        <ProtectedRoute>
          <main>
            <div className='xs:block  md:grid md:grid-cols-7 min-h-screen overflow-x-hidden'>
              <div className='col-start-1 col-end-2 border-black border-r md:visible md:block  xs:hidden xs:invisible'>
                <SideBarComp />
              </div>
              {showSidebar ? 
              <div className='xs:visible xs:block  md:hidden md:invisible'>
                <SidebarForSmSc showSidebar={showSidebar} setShowSideBar={setShowSideBar} />
              </div> : 
              <div className='col-start-2 col-end-8'>
                <div className='flex justify-between px-3 py-1 items-center border-b border-black'>
                    {/* show this on large screen and hide on small screen */}
                    <p className={`text-xs xs:hidden xs:invisible md:visible md:block  `}>buildyourhackathonteam</p>
                    {/* show this on smalll screen and hide this on small scrren  */}
                    <Sidebar className='size-4 md:hidden md:invisible xs:visible xs:block font-bold' onClick={() => setShowSideBar(!showSidebar)} />
                    <div className='flex items-center gap-4'>
                        <div className='flex gap-4 items-center'>
                          <Link href={`/dashboard/notification`}>
                            <Bell className='size-5 rounded cursor-pointer hover:bg-purple-200 p-1' />
                          </Link>
                          <div className='flex items-center hover:bg-purple-100 rounded p-1'>
                            <Link href={`/dashboard/usercredit`}>
                              <CrumpledPaperIcon className='size-3 cursor-pointer' />
                            </Link>
                            <p className='text-xs'>{userCredit}</p>
                          </div>
                        </div>
                        <Link href={'/dashboard/me'}>
                          {/* <img src={`${user?.imageUrl}`} alt='user_profile' className='rounded-[50%] size-7 hover:grayscale'/> */}
                          <Image
                            src={user?.imageUrl || "/default-profile.png"} 
                            alt="User Profile"
                            className="rounded-[50%] size-7 hover:grayscale"
                          />
                        </Link>
                    </div>
                </div>
                {props.children}
              </div>
            }
            </div>
        </main>
        </ProtectedRoute>
    )
}

export default DashboardLayout