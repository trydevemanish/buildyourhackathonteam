'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Teamcard from "@/components/Teamcard"
import { TeamCardInfoType } from "@/types/types"
import { useFetchData } from '@/hook/useFetchData'

export default function AllTeam() {
    const router = useRouter()
    const { data : eveyteamdata,errors,loading } = useFetchData<TeamCardInfoType[]>({ url:'/api/fetcheveryteam' })

    if(errors){
        console.log(`Error fetching every team data: ${errors}`)
    }

    if(loading){
        return (
            <div className='flex flex-col gap-3 justify-center items-center min-h-[calc(95vh-3rem)]'>
                <p className='opacity-70 text-xs animate-pulse'>Wait fetching others teams...</p>
            </div>
        )
    }

    if(!eveyteamdata || eveyteamdata.length <= 0){
        return (
            <div className='flex flex-col gap-3 justify-center items-center min-h-[calc(96vh-14rem)]'>
                <p className='text-base'>No team has been Created Yet, Why {"don't"} you start this revolution.</p>
                <p className=' text-xs bg-purple-300 text-black font-opensans cursor-pointer px-4 py-1 rounded-md' onClick={() => router.push('/createteam')}>Create your first team</p>
            </ div>
        )
    }

  return (
    <section className="overflow-y-auto scrollbar-hide py-2">
        <div className="flex flex-wrap gap-5 px-8 py-2">
                {eveyteamdata.map((teamdata : TeamCardInfoType, idx : number) => (
                    <Teamcard props={teamdata} key={idx}/>
                ))}
            </div> 
    </section>
  )
}