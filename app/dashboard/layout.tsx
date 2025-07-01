"use client"
import React, { useEffect, useState } from 'react'
// import { CrumpledPaperIcon } from '@radix-ui/react-icons'
import ProtectedRoute from '@/components/ProtectedRoute'
import SideBarComp from '@/components/SideBarComp'
import { useUser } from '@clerk/nextjs'
import { Bell, Sidebar } from 'lucide-react'
import SidebarForSmSc from '@/components/SidebarForSmSc'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface Dashboardlayoutprops {
    children : React.ReactNode
}

// find user from the database , if user is there nothinh to do , if not create a new user
const DashboardLayout: React.FC<Dashboardlayoutprops> = (props) => {
    // const [userCredit,setUserCredit] = useState<number>()
    const [showSidebar,setShowSideBar] = useState(false)
    const [userProfileUrl,setUserProfileUrl] = useState('/Winnerteam.png')
    
    const { user } = useUser()
    const router = useRouter()
    
    // useeffect to find user if no user create one.
    useEffect(() => {
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

            setUserProfileUrl(result?.data?.profileurl)

          } catch (error) {
            console.log(`Failed to create User: ${error}`)
          }
        }

      FindorcreateUser()
    },[user])

    // useeffect to fetch total credit.
    // useEffect(() => {
    //   findUserTotalCredit()
    // },[])

    // async function findUserTotalCredit(){
    //   try {
         
    //     const res = await fetch(`/api/findusercredit`)

    //     if(!res.ok){
    //       const errtext = await res.text()
    //       console.log(errtext)
    //       return;
    //     }

    //     const data = await res.json()

    //     if(!data){
    //       console.log('Failed to covert res to json')
    //       return;
    //     }

    //     console.log(data?.message)

    //     setUserCredit(data?.data?.initialCredit)
        
    //   } catch (error) {
    //     console.log(`Failed to create User: ${error}`)
    //   }
    // }
    
    return(
        <ProtectedRoute>
          {/* changing bakground color  */}
          <main className='bg-gradient-to-b from-[#e0e0e0] via-purple-50 to-[#e0e0e0]'>
            <div className='xs:block md:grid md:grid-cols-7 min-h-screen overflow-x-hidden'>
              <div className='col-start-1 col-end-2 border-black border-r md:visible md:block  xs:hidden xs:invisible'>
                <SideBarComp />
              </div>
              {showSidebar ? 
              <div className='xs:visible xs:block  md:hidden md:invisible'>
                <SidebarForSmSc showSidebar={showSidebar} setShowSideBar={setShowSideBar} />
              </div> : 
              <div className='col-start-2 col-end-8'>
                <div className='flex justify-between px-3 py-2 items-center border-b border-black'>
                    {/* show this on large screen and hide on small screen */}
                    <p className={`text-xs xs:hidden xs:invisible font-semibold md:visible md:block  `}>Buildyourhackathonteam</p>
                    {/* show this on smalll screen and hide this on small scrren  */}
                    <Sidebar className='size-4 md:hidden md:invisible xs:visible xs:block font-bold' onClick={() => setShowSideBar(!showSidebar)} />
                    <div className='flex items-center gap-4'>
                        <div className='flex gap-4 items-center'>
                          <Bell className='size-8 rounded cursor-pointer hover:bg-purple-300 p-2' onClick={() => router.push(`/notification`)} />
                          {/* <div className='flex items-center hover:bg-purple-100 rounded p-1' onClick={() => router.push(`/dashboard/usercredit`)}>
                            <CrumpledPaperIcon className='size-3 cursor-pointer' />
                            <p className='text-xs'>{userCredit}</p>
                          </div> */}
                        </div>
                        <Image
                          src={userProfileUrl || "/default-user.jpg"}
                          alt="User Profile"
                          width={150}
                          height={50}
                          className="rounded-[50%] cursor-pointer max-w-sm max-h-52 size-7"
                          onClick={() => router.push('/dashboard/me')}
                        />
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