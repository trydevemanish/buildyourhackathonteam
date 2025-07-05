"use client"
import React from 'react'
import { TeamCardInfoType } from '@/types/types'
import { useUser } from '@clerk/nextjs'
import { CircleOff } from 'lucide-react'
import { useRouter } from "next/navigation"
import toast from 'react-hot-toast'

export default function Teamcard({ props } : { props : TeamCardInfoType }){
  const router = useRouter()
  const { user } = useUser()

  // i as a user making the req to the tweam leader to join their team
  async function UserMadeaReqToTheTeamLeaderToJoinThereTeam(){
    try {

      toast.success('sending req')

      const res = await fetch(`/api/userReqtoJoinTeam`,{
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({ leaderid: props?.leaderid ,teamid: props?.id })
      }) 

      if(!res.ok){
        toast.error(await res.text())
        return;
      }

      const data  = await res.json()

      toast.success(data?.message)
      
    } catch (error) {
      console.log(`Failed to make req to leader: ${error}`)
      toast.error(`Failed to make req to leader.`)
    }
  }

  return (
       <div className='border border-black inline-block px-2 py-1 bg-white shadow-md shadow-white cursor-pointer'> 
        <div className='px-4 py-3 inline-block text-xs w-64 '>
            <div className='flex flex-col gap-1'>
                <div className='flex justify-between items-center'>
                    <p>team: {props?.teamname}</p>
                    {
                      user?.id === props.leaderid ? 
                      <button className='bg-black text-white px-8 opacity-80 rounded text-[10px] py-2'>
                        <CircleOff className='size-3' />
                      </button> : 
                      <button className='bg-black text-white px-4 rounded text-[10px] py-1' onClick={UserMadeaReqToTheTeamLeaderToJoinThereTeam}>
                        req send.
                      </button>
                    } 
                </div>
                <div onClick={() => router.push(`/dashboard/teamdata/${props?.id}`)} className='flex flex-col gap-1 text-xs'>
                  <p>leader :   
                    <span className='opacity-70 text-xs'> { props?.leadername}</span> 
                  </p>
                  <p>Project name : 
                    <span className='opacity-70 text-xs'> { props?.projectname}</span>
                  </p>
                  <p>Project desc :
                    <span className='opacity-70 text-xs'> { props?.projectdesc}</span>
                  </p>
                  <p>Hackathon name :
                    <span className='opacity-70 text-xs'>  { props?.hackathonname}</span>
                  </p>
                  <p>Proj desc : 
                    <span className='opacity-70 text-xs'> {props?.hackathondesc}</span>
                  </p>
                </div>
            </div>
        </div>
        <p className='text-[10px] text-right'>Created at : 
          <span className='text-[10px] opacity-70'> {props?.createdAt}</span>
        </p>
    </div> 
  )
}
