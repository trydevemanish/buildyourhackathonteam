'use client'

import React from 'react'
import Link from 'next/link'
import { useFetchData } from '@/hook/useFetchData'
import TeamCardUserJoin from '../TeamCardUserJoin'
import { TeamJoinedByUserDetail } from '@/types/types'

export default function TeamJoinedByUserDetails() {
    const { data : fetchteamJoinedData,errors : teamJoinedError,loading } = useFetchData<TeamJoinedByUserDetail[]>({ url:'/api/fetchallteamuserjoinedasmember' })

    if(teamJoinedError){  
        console.log(`Error checking user exits: ${teamJoinedError}`)
    }

    if(fetchteamJoinedData){
        console.log('fetchteamJoinedData',fetchteamJoinedData)
    }

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
            (
                <div className='flex flex-col gap-2 py-2'>
                    <p className='text-center font-opensans underline decoration-purple-400 underline-offset-4 decoration-2'>Team Joined</p>
                    <div className="flex xs:flex-col md:flex-row gap-2 flex-wrap xs:px-4 md:px-6 pt-2">
                        {fetchteamJoinedData.map((teamdata : TeamJoinedByUserDetail, idx : number) => (
                            <TeamCardUserJoin key={idx} props={teamdata} />
                        ))}
                    </div>
                </div>
            )
            :
            (
                <div className='flex flex-col gap-3 justify-center items-center min-h-[calc(97vh-3rem)]'>
                    <div className='flex flex-col items-center gap-1'>
                        <p className='text-lg'>You {"Haven't"} Join any team yet, </p>
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
