import React from 'react'
import { TeamCardInfoType } from '@/types/types'

export default function Teamcard(
  {
    props,
  } : 
  {
    props : TeamCardInfoType,
  }
){
  return (
    <div className='border border-black inline-block px-2 py-1 rounded cursor-pointer'>
        <div className='px-4 py-3 inline-block text-xs w-64 '>
            <div className='flex flex-col gap-1'>
                <div className='flex justify-between items-center'>
                    <p>team: {props?.teamname}</p>
                    <button className='bg-black text-white px-4 rounded text-[10px] py-1'>join</button>
                </div>
                <p>leader: {props?.leadername}</p>
                <p>Project name: {props?.projectname}</p>
                <p>Project desc: {props?.projectdesc}</p>
                <p>Hackathon name: {props?.hackathonname}</p>
                <p>{props?.hackathondesc}</p>
            </div>
        </div>
        <p className='text-[10px] opacity-50 text-right'>created at: {props?.createdat}</p>
    </div>
  )
}
