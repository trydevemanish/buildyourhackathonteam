"use client"
import React,{ useEffect, useState } from 'react'
import Link from 'next/link'
import Teamcard from '@/components/TeamcardForteamleader'
import { TeamCardInfoType } from '@/types/types'
// import { MessagesSquare } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Page() {

  const [teamDataFromBackend,setTeamDataFromBackend] = useState([])
  const router = useRouter()

  useEffect(() => {
    const handlefindUserData = async() => {
      try {

        const res = await fetch('/api/fetchallteamCreatedbyuser')
  
        if(!res.ok){
          const errText = await res.text()
          console.log(errText)
          return;
        }
  
        const data = await res.json()
  
        console.log(data?.message)

        setTeamDataFromBackend(data?.data)
        
      } catch (error) {
        console.error("Issue Occured :",error)
      }
    }
    handlefindUserData()
  },[])

  return (
    <main>
      {teamDataFromBackend?.length > 0 ? 
        <section>
          <div className='flex justify-end items-center gap-3 px-3 border py-1'>
            <button className='bg-black inline text-white px-8 py-[6px] text-xs rounded'>
              <Link href="/dashboard/createteam">
                <span className='opacity-80 hover:opacity-100'>+ create one </span>
              </Link>
            </button>
            {/* <MessagesSquare className='size-7 rounded bg-neutral-200 px-2 py-1 cursor-pointer' /> */}
          </div> 
          <div className='flex gap-5 px-8 py-2 overflow-y-auto scrollbar-hide'>
            {
              teamDataFromBackend.map((teamdata : TeamCardInfoType, idx : number) => (
                <Teamcard props={teamdata} key={idx} />
              ))
            }
          </div>
        </section>
        : 
        <div className='flex flex-col gap-3 justify-center items-center mt-40'>
          <p className='font-semibold'>No prev team found</p>
          <p className='opacity-70 text-sm'>Create new team to get started !</p>
          <button className='bg-black text-white px-8 py-1 text-xs rounded'>
            <Link href="/dashboard/createteam">
              <p className='flex gap-3'>
                 <span>+</span>
                 <span>Create Team</span>
              </p> 
            </Link>
          </button>
        </ div>
       }
      
    </main>
  )
}