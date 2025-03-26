"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import sample from "@/public/sample.jpeg"
import { TeamCardInfoType } from '@/types/types'
import { useParams } from 'next/navigation'
import { MessagesSquare } from 'lucide-react'
import { Skeleton } from "@/components/ui/skeleton"
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { AirplayIcon } from 'lucide-react'

export default function Page() {
  const [checkReqSend,setCheckingReqSend] = useState(false)
  const [teamdata,setTeamData] = useState({} as TeamCardInfoType)
  const { teamid } = useParams()
  const { user } = useUser()
  const router = useRouter()
  
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

        setTeamData(data?.data)
        
      } catch (error) {
        console.log(`Failed: ${error}`)
      }
    }
    
    findTeamData()
  },[teamid])

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

      toast.success(data?.message)
      
    } catch (error) {
      console.log(`Failed to make req to leader: ${error}`)
    } finally {
      setCheckingReqSend(false)
    }
  }

  async function DeleteTeam() {
    try {
    
      const res = await fetch(`/api/deleteTeam/${teamdata?.id}`,{
          method: 'DELETE'
      })
      
      if(!res.ok){
          const errtext = await res.json()
          console.log(errtext)
          toast.error(errtext)
          return;
      }

      const data  = await res.json()

      console.log(data?.message)

      toast.success('team deleted')
      
    } catch (error) {
        console.log(`Issue occured deleting user: ${error}`)
    }
  }

  // only move if user is in team
  async function movetoChatPage() {
    try {

      const res = await fetch(`/api/checkUserisInteam/${teamdata?.id}`,{
        method : 'POST',
        headers : {
          'Content-Type':'application/json'
        },
        body : JSON.stringify({ userid : user?.id })
      })

      if(!res.ok){
        console.log(await res.text())
        return;
      }

      const data = await res.json()
      console.log(data?.message)

      if(user?.id == data?.data?.userId){
        router.push(`/dashboard/${teamdata?.id}/ch/${teamdata?.teamname}`)
      } else {
        console.log('User is not in team.')
      }
      
    } catch (error) {
      console.log(`Issue Occured while checking: ${error}`)
    }
  }

  
  return (
    <div className='px-8 py-4 overflow-y-auto scrollbar-hide max-h-[calc(96vh-2rem)]'>
      <div>
        <p className='text-lg text-center'>Welcome to team: {teamdata?.teamname}.</p>
        <p className='text-[12px] opacity-65 text-center'>by: Dev kumar ( leader ).</p>
      </div>

      <div className='flex flex-col gap-7 xs:px-4 md:px-16 py-9'>
        <div className='flex justify-between'>
          <div className='flex flex-col gap-1'>
            <p className='text-sm'>Project name : </p> 
            <div className='opacity-80 text-[12px]'>{teamdata?.projectname ? teamdata?.projectname :   <Skeleton className='rounded w-20 h-4' />  }
            </div> 
          </div>
          <div className='flex items-center gap-6'>
            <AirplayIcon onClick={() => router.push(`/dashboard/teampage/${teamdata?.id}`)}  className='size-7 rounded bg-purple-100 px-2 hover:bg-purple-300 py-1 cursor-pointer'/>
            <MessagesSquare onClick={movetoChatPage} className='size-7 rounded bg-purple-100 px-2 hover:bg-purple-300 py-1 cursor-pointer' />
          </div>
        </div>   
        <div className='flex flex-col gap-1'>
          <p className='text-sm'>Project desc : </p>
          <div className='opacity-80 text-[12px]'>{teamdata?.projectdesc ? teamdata?.projectdesc :  <Skeleton className='rounded w-20 h-4' />}</div>
        </div>

        <div className='flex flex-col gap-1'>
          <p className='text-sm'>Hackathon Name : </p>
          <div className='opacity-80 text-[12px]'>{teamdata?.hackathonname ? teamdata?.hackathonname :  <Skeleton className='rounded w-20 h-4' /> }</div>
        </div>

        <div className='flex flex-col gap-1'>
          <p className='text-sm'>Hackathon desc : </p>
          <div className='opacity-80 text-[12px]'>{teamdata?.hackathondesc ? teamdata?.hackathondesc :  <Skeleton className='rounded w-20 h-4' /> }</div>
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
          <button className='bg-black text-white text-xs px-9 py-1 rounded'>
            {user?.id === teamdata?.leaderid ? <div onClick={DeleteTeam}>delete</div> : <div onClick={UserMadeaReqToTheTeamLeaderToJoinThereTeam}>{checkReqSend ? 'sending...' : 'send req!'}</div> }
          </button>
        </div>

      </div>
    </div>
  )
}