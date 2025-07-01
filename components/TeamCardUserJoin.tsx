"use client"
import React from 'react'
import { useRouter } from "next/navigation"
import { TeamJoinedByUserDetail } from '@/types/types'

export default function TeamCardUserJoin({ props } : { props : TeamJoinedByUserDetail }){
  const router = useRouter()

  return (
       <div className='border border-black inline-block px-2 py-1 bg-white shadow-md shadow-white cursor-pointer'> 
        <div className='px-4 py-3 inline-block text-xs w-64 '>
            <div className='flex flex-col gap-1'>
                <div className='flex justify-between items-center'>
                    <p>team: {props?.team?.teamname}</p>
                </div>
                <div onClick={() => router.push(`/dashboard/teamdata/${props?.team?.id}`)} className='flex flex-col gap-2 text-xs'>
                  <p>leader :   
                    <span className='opacity-70 text-xs'> { props?.team?.leadername}</span> 
                  </p>
                  <p>Project name : 
                    <span className='opacity-70 text-xs'> { props?.team?.projectname}</span>
                  </p>
                  <p>Project desc :
                    <span className='opacity-70 text-xs'> { props?.team?.projectdesc}</span>
                  </p>
                  <p>Hackathon name :
                    <span className='opacity-70 text-xs'>  { props?.team?.hackathonname}</span>
                  </p>
                  <p>Proj desc : 
                    <span className='opacity-70 text-xs'> {props?.team?.hackathondesc}</span>
                  </p>
                </div>
            </div>
        </div>
        <p className='text-[10px] text-right'>Joined at : 
          <span className='text-[10px] opacity-70'> {props?.joinedAt}</span>
        </p>
    </div> 
  )
}
