"use client"
import React from 'react'
import { TeamCardInfoType } from '@/types/types'
import { useRouter } from 'next/navigation'
import toast from "react-hot-toast";
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

export default function Teamcard({props} : { props : TeamCardInfoType,}){
    const router = useRouter()
    const {user} = useUser()

    async function handledeleteteam() {
        try {

            const res = await fetch(`/api/deleteTeam/${props?.id}`,{
                method: 'DELETE',
                headers : {
                  'Content-Type' : 'application/json'
                },
                body : JSON.stringify({ userId:user?.id })
            })
            
            if(!res.ok){
                const errtext = await res.json()
                console.log(errtext?.error)
                return;
            }

            const data  = await res.json()

            console.log(data?.message)
            toast.success('team deleted')
            router.refresh()
            
        } catch (error) {
            console.log(`Issue occured deleting user: ${error}`)
        }
    }

  return (
    <div className='border border-black inline-block px-2 py-1 bg-white shadow-md shadow-white cursor-pointer'>
        <div className='px-4 py-3 inline-block text-xs w-64 '>
            <div className='flex flex-col gap-1'>
                <div className='flex justify-between items-center'>
                    <p>Team: {props?.teamname}</p>
                    <div className='flex gap-1 items-center'>
                      <p className='text-xs border px-3 py-1 rounded-3xl bg-green-200'>{props?.teamstatus}</p>
                      <button className='bg-black text-white px-4 rounded text-[10px] py-1' onClick={handledeleteteam}>Delete</button>
                    </div>
                </div>
                <div>
                  <Link href={`/dashboard/teamdata/${props?.id}`} className='flex flex-col gap-2'>
                    <p>leader: <span className='opacity-70'>{props?.leadername}</span></p>
                    <p>Project name: <span className='opacity-70'>{props?.projectname}</span></p>
                    <p>Project desc: <span className='opacity-70'>{props?.projectdesc}</span></p>
                    <p>Hackathon name: <span className='opacity-70'>{props?.hackathonname}</span></p>
                    <p>Proj desc: <span className='opacity-70'>{props?.hackathondesc}</span></p>
                  </Link>
                </div>
            </div>
        </div>
        <p className='text-[10px] opacity-50 text-right'>created at: {props?.createdAt}</p>
    </div>
  )
}


// onClick={() => {
//                   router.push(`/dashboard/teamdata/${props?.id}`)
//                 }} 