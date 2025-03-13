"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import sample from "@/public/sample.jpeg"
import { TeamCardInfoType } from '@/types/types'
import { useParams } from 'next/navigation'
import { MessagesSquare } from 'lucide-react'
import Link from 'next/link'
import { Skeleton } from "@/components/ui/skeleton"
import { useUser } from '@clerk/nextjs'

export default function Page() {
  const [checkReqSend,setCheckingReqSend] = useState(false)
  const [teamdata,setTeamData] = useState({} as TeamCardInfoType)
  const { teamid } = useParams()
  const { user } = useUser()
  
  useEffect(() => {
    const findTeamData = async() => {
      try {

        const res = await fetch(`/api/findteambyid/${teamid}`)

        if(!res.ok){
          const errtext = await res.text()
          console.log(errtext)
          return;
        }

        const data = await res.json()
        console.log(data?.message)
        console.log(data)

        setTeamData(data?.data)
        
      } catch (error) {
        console.log(`Failed: ${error}`)
      }
    }
    
    findTeamData()
  },[])

  async function UserMadeaReqToTheTeamLeaderToJoinThereTeam(){
    try {

      setCheckingReqSend(true)

      const res = await fetch(`/api/userReqtoJoinTeam`,{
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({ leaderid: teamdata.leaderid ,teamid: teamdata.id })
      }) 

      if(!res.ok){
        console.log(await res.text())
        return;
      }

      const data  = await res.json()

      console.log(data?.message)
      
    } catch (error) {
      console.log(`Failed to make req to leader: ${error}`)
    } finally {
      setCheckingReqSend(false)
    }
  }

  return (
    <div className='px-8 py-4 overflow-y-auto scrollbar-hide max-h-[calc(96vh-2rem)]'>
      <div>
        <p className='text-lg text-center'>Welcome to team: {teamdata?.teamname}.</p>
        <p className='text-[12px] opacity-65 text-center'>by: Dev kumar ( leader ).</p>
      </div>

      <div className='flex flex-col gap-7 px-16 py-9'>
        <div className='flex justify-between'>
          <div className='flex flex-col gap-1'>
            <p className='text-sm'>Project name : </p> 
            <p className='opacity-80 text-[12px]'>{teamdata?.projectname ? teamdata?.projectname : <Skeleton className='w-20 h-4 rounded' />  }</p>
          </div>
          <Link href={`/dashboard/${teamdata?.id}/ch/${teamdata?.teamname}`}><MessagesSquare className='size-7 rounded bg-neutral-200 px-2 hover:bg-neutral-300 py-1 cursor-pointer' /></Link>
        </div> 

        <div className='flex flex-col gap-1'>
          <p className='text-sm'>Project desc : </p>
          <p className='opacity-80 text-[12px]'>{teamdata?.projectdesc ? teamdata?.projectdesc : <Skeleton className='w-20 h-4 rounded' />}</p>
        </div>

        <div className='flex flex-col gap-1'>
          <p className='text-sm'>Hackathon Name : </p>
          <p className='opacity-80 text-[12px]'>{teamdata?.hackathonname ? teamdata?.hackathonname : <Skeleton className='w-20 h-4 rounded' /> }</p>
        </div>

        <div className='flex flex-col gap-1'>
          <p className='text-sm'>Hackathon desc : </p>
          <p className='opacity-80 text-[12px]'>{teamdata?.hackathondesc ? teamdata?.hackathondesc : <Skeleton className='w-20 h-4 rounded' /> }</p>
        </div>

        <div className='flex flex-col gap-1'>
          <p className='text-sm'>Hackathon link : </p>
          <p className='opacity-80 text-[12px] cursor-pointer'>https://devpost/hackathon?id=322</p>
        </div>

        <div className='flex flex-col gap-1'>
          <p className='text-sm pb-1'>Team Members : </p>
            <Image src={sample} alt='profile' className='rounded-[50%] size-6'/>
        </div>

        <div>
          <button className='bg-black text-white text-xs px-9 py-1 rounded' onClick={UserMadeaReqToTheTeamLeaderToJoinThereTeam}>
            {/* {checkReqSend ? 'sending...' : 'send req!'} */}
            {user?.id === teamdata?.leaderid ? 'Delete' : 'send req!'}
          </button>
        </div>

      </div>
    </div>
  )
}