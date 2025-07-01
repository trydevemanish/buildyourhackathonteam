"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Friend from '@/public/noteam.avif'
import TeamCardUserJoin from '@/components/TeamCardUserJoin'
import { TeamJoinedByUserDetail } from '@/types/types'

export default function Page() {
    const [fetchteamJoinedData, setfetchTeamJoinedData] = useState([])
    const [loading,setLoading] = useState(false)

    useEffect(() => {
        const fetchJoinedTeam = async() => {
            try {

                setLoading(true)

                const res = await fetch('/api/fetchallteamuserjoinedasmember')

                if(!res.ok){
                    const errtext = await res.text()
                    console.log(`Error: `,errtext)
                    return;
                }

                const data = await res.json()
                console.log(data?.message)
                console.log(data)

                setfetchTeamJoinedData(data?.data)
                
            } catch (error) {
                console.log(`Failed: `,error)
            } finally {
                setLoading(false)
            }
        }
        // fetchJoinedTeam()
    },[])

  return (
    <div>
       {
        loading ? 
        <div className='flex flex-col gap-3 justify-center items-center min-h-[calc(96vh-3rem)]'>
            <p className='opacity-70 text-xs text-black animate-pulse'>Fetching Team Joined.</p>
        </div>
        :
        (
            Array.isArray(fetchteamJoinedData) && fetchteamJoinedData.length > 0 ?
                <div className="flex xs:flex-col md:flex-row gap-2 flex-wrap xs:px-4 md:px-6 pt-2">
                    {fetchteamJoinedData.map((teamdata : TeamJoinedByUserDetail, idx : number) => (
                        <TeamCardUserJoin key={idx} props={teamdata} />
                    ))}
                </div>
            :
            (
                <div className='flex flex-col gap-3 justify-center items-center min-h-[calc(97vh-3rem)]'>
                    <div className='flex flex-col items-center gap-1'>
                        <p className='text-lg'>You Haven't Join any team yet, </p>
                        <p className='text-sm opacity-70'> Join team to get started.</p>   
                    </div>
                    <button className='bg-black text-white px-8 py-1 text-xs rounded'>
                        <Link href="/dashboard/allteams">
                            <p className='flex gap-3'>
                                <span>+</span>
                                <span>Join Team</span>
                            </p> 
                        </Link>
                    </button>
                </ div>
            )
        )
       } 
    </div>
  )
}