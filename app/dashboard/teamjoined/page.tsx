"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { TeamCardInfoType } from '@/types/types'
import Teamcard from '@/components/Teamcard'

export default function Page() {
    const [fetchteamJoinedData, setfetchTeamJoinedData] = useState([])

    useEffect(() => {
        const fetchJoinedTeam = async() => {
            try {

                const res = await fetch('/api/fetchallteamuserjoinedasmember')

                if(!res.ok){
                    const errtext = await res.text()
                    console.log(`Error: `,errtext)
                    return;
                }

                const data = await res.json()
                console.log(data?.message)

                setfetchTeamJoinedData(data?.data)
                
            } catch (error) {
                console.log(`Failed: `,error)
            }
        }
        // fetchJoinedTeam()
    })
  return (
    <main>
         {
            fetchteamJoinedData.length > 0 ? 
            <div className="flex gap-2 flex-wrap justify-center pt-2">
            {fetchteamJoinedData.map((teamdata : TeamCardInfoType, idx : number) => (
                <Teamcard key={idx} />
            ))}
            </div>
            : 
            <div className='flex flex-col gap-3 justify-center items-center mt-40'>
                <p className='font-semibold'>No team Joined</p>
                <p className='opacity-70 text-sm'>Join teams to get started.</p>
                <button className='bg-black text-white px-8 py-1 text-xs rounded'>
                    <Link href="/dashboard/allteams">
                    <p className='flex gap-3'>
                        <span>+</span>
                        <span>Join Team</span>
                    </p> 
                    </Link>
                </button>
            </ div>
        }
    </main>
  )
}
