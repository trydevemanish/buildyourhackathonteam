"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { CrumpledPaperIcon } from '@radix-ui/react-icons'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useUser } from '@clerk/nextjs'
import { SignOutButton } from "@clerk/nextjs"
import { Bell } from 'lucide-react'

interface Dashboardlayoutprops {
    children : React.ReactNode
}

// find user from the database , if user is there nothinh to do , if not create a new user

const DashboardLayout: React.FC<Dashboardlayoutprops> = (props) => {
    const [userCredit,setUserCredit] = useState<number>()
    
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
            <div className='grid grid-cols-7 min-h-screen overflow-x-hidden'>
              <div className='col-start-1 col-end-2 border-black border-r'>
                <div className='flex flex-col justify-between min-h-screen py-4 px-1'>
                    <div className='flex flex-col text-[11px]'>
                        <p className={`cursor-pointer hover:bg-purple-100 py-1 px-2 rounded`}>
                          <Link href={'/dashboard'}>your team</Link>
                        </p>
                        <p className={` cursor-pointer hover:bg-purple-100 py-1 px-2 rounded`}>
                          <Link href={'/dashboard/allteams'}>other teams to join</Link>
                        </p>
                        <p className={`cursor-pointer hover:bg-purple-100 py-1 px-2 rounded`}>
                          <Link href={'/dashboard/teamjoined'}>team joined as member</Link>
                        </p>
                        <p className={`cursor-pointer hover:bg-purple-100 py-1 px-2 rounded`}>
                          <Link href={'/dashboard/otherdev'}>meet other developers</Link>
                        </p>
                    </div>
                    <div className='bg-black flex justify-center text-white px-6 py-1 text-xs rounded'>
                      <SignOutButton />
                    </div>
                </div>
              </div>
              <div className='col-start-2 col-end-8'>
                <div className='flex justify-between px-3 py-1 items-center border-b border-black'>
                    <p className={`text-xs`}>buildyourhackathonteam</p>
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
                          <img src={`${user?.imageUrl}`} alt='user_profile' className='rounded-[50%] size-7 hover:grayscale'/>
                        </Link>
                    </div>
                </div>
                {props.children}
              </div>
            </div>
        </main>
        </ProtectedRoute>
    )
}

export default DashboardLayout