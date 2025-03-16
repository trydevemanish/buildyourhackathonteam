import React from 'react'
import { TeamCardInfoType } from '@/types/types'
import { useRouter } from 'next/navigation'
import toast from "react-hot-toast";

export default function Teamcard(
  {
    props,
  } : 
  {
    props : TeamCardInfoType,
  }
){

    const router = useRouter()

    async function handledeleteteam() {
        try {

            toast.loading('deleting team.')

            const res = await fetch(`/api/deleteTeam/${props?.id}`,{
                method: 'DELETE'
            })
            
            if(!res.ok){
                const errtext = await res.json()
                console.log(errtext?.error)
                return;
            }

            const data  = await res.json()
            console.log(data?.message)

            toast.success('team deleted')
            
        } catch (error) {
            console.log(`Issue occured deleting user: ${error}`)
        }
    }

  return (
    <div className='border border-black inline-block px-2 py-1 shadow shadow-neutral-100 rounded cursor-pointer'>
        <div className='px-4 py-3 inline-block text-xs w-64 '>
            <div className='flex flex-col gap-1'>
                <div className='flex justify-between items-center'>
                    <p>Team: {props?.teamname}</p>
                    <button className='bg-black text-white px-4 rounded text-[10px] py-1' onClick={handledeleteteam}>Delete</button>
                </div>
                <div onClick={() => {
                  toast.loading('moving to team Data.')
                  router.push(`/dashboard/teamdata/${props?.id}`)
                }} >
                  <p>leader: {props?.leadername}</p>
                  <p>Project name: {props?.projectname}</p>
                  <p>Project desc: {props?.projectdesc}</p>
                  <p>Hackathon name: {props?.hackathonname}</p>
                  <p>{props?.hackathondesc}</p>
                </div>
            </div>
        </div>
        <p className='text-[10px] opacity-50 text-right'>created at: {props?.createdAt}</p>
    </div>
  )
}
