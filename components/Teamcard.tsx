import React from 'react'
import { TeamCardInfoType } from '@/types/types'

// { props } : {props : TeamCardInfoType}
export default function Teamcard(){
  return (
    <div className='border border-black inline-block px-2 py-1 rounded  cursor-pointer'>
        <div className='px-4 py-3 inline-block text-xs w-64 '>
            <div className='flex flex-col gap-1'>
                <div className='flex justify-between items-center'>
                    <p>team: cortex</p>
                    <button className='bg-black text-white px-4 rounded text-[10px] py-1'>join</button>
                </div>
                <p>leader: dev</p>
                <p>Project name: Ai aigent for room alotttment.</p>
                <p>Project desc: Building an ai aigent for room alotttment, making it easy</p>
                <p>Hackathon name: hackfest 2025</p>
                <p>Hackathon desc: hackfest happening at kerela ,kochi ,prize pool : $2000.</p>
            </div>
        </div>
        <p className='text-[10px] opacity-50 text-right'>created at: 45/54/545</p>
    </div>
  )
}
