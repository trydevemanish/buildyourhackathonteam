"use client"
import React, { Suspense, useState } from 'react'
import Image from 'next/image'
import sample from "@/public/sample.jpeg"
import { TeamCardInfoType } from '@/types/types'
import { useParams } from 'next/navigation'
import { LucidePersonStanding, MessageSquareDotIcon } from 'lucide-react'
import { Skeleton } from "@/components/ui/skeleton"
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import LoadingComponent from '@/components/LoadingComponent'
import { useFetchData } from '@/hook/useFetchData'

const teamdataInfoAttribute = [
  {
    name : 'Project desc :',
    label : 'project_description'
  },
  {
    name : 'Hackathon Name :',
    label : 'hackathon_name'
  },
  {
    name : 'Hackathon desc :',
    label : 'hackathon_description'
  },
  {
    name : 'Hackathon link : ',
    label : 'hackathon_link'
  },
]

type teamdataInfoAttributeType = {
  name : string;
  label : string;
}

type props = {
  teamid:string | string[] | undefined;
}


function TeamPageData ({teamid}:props){
  const router = useRouter()
  const { data : teamdata, loading, errors } = useFetchData<TeamCardInfoType>({ url: `/api/findteambyid/${teamid}`, state: [teamid] })


  if(loading){
    return (
      <div className='flex flex-col gap-3 justify-center items-center min-h-[calc(97vh-3rem)]'>
        <p className='opacity-70 text-xs animate-pulse'>Searching Team Data....</p>
      </ div>
    )
  }

  if(errors){
    console.log('An Error Occured fetching hackathon project detail',errors)
    return (
      <div className='flex flex-col gap-3 justify-center items-center min-h-[calc(97vh-3rem)]'>
        <p className='opacity-70 text-base animate-pulse'>An Error Occured fetching hackathon project detail!</p>
      </ div>
    )
  }

  return  (
    <div>
      {
        <div>
          <div>
            <p className='text-lg text-center'>Welcome to team: {teamdata?.teamname}.</p>
            <p className='text-[12px] opacity-65 text-center'>by: {teamdata?.leadername}</p>
          </div>

          <div className='flex flex-col gap-7 xs:px-4 md:px-16 py-9'>
            
            <div className='flex justify-between'>
              <div className='flex flex-col gap-1'>
                <p className='text-sm'>Project name : </p> 
                <div className='opacity-80 text-[12px]'>
                  {teamdata?.projectname ? teamdata?.projectname :   <Skeleton className='rounded w-20 h-4' />}
                </div> 
              </div>
              <div className='flex items-center gap-6'>
                <p className='text-xs border px-3 py-1 rounded-3xl bg-green-200'>{teamdata?.teamstatus ?? 'in-active'}</p>

                <LucidePersonStanding onClick={() => router.push(`/dashboard/teampage/${teamdata?.id}`)}  className='size-7 rounded bg-purple-100 px-2 hover:bg-purple-300 py-1 cursor-pointer'/>
                <MovetoTeamMembersChatPage teamdata={teamdata} />
              </div>
            </div> 

            {
              teamdataInfoAttribute.map((data:teamdataInfoAttributeType,idx:number) => (
                <div className='flex flex-col gap-1' key={idx}>
                  <p className='text-sm'>{data?.name}</p>
                  <div className='opacity-80 text-[12px]'>
                    {
                      data.label == 'project_description' ? 
                      <div>{teamdata?.projectdesc ? teamdata?.projectdesc :  <Skeleton className='rounded w-20 h-4' />}</div>
                      :
                      (
                        data.label == 'hackathon_name' ?
                        <div>{teamdata?.hackathonname ? teamdata?.hackathonname :  <Skeleton className='rounded w-20 h-4' /> }</div>
                        : 
                        (
                          data.label == 'hackathon_description' ? 
                          <div>{teamdata?.hackathondesc ? teamdata?.hackathondesc :  <Skeleton className='rounded w-20 h-4' /> }</div>
                          :
                          <p className='opacity-80 text-[12px] cursor-pointer'>{teamdata?.hackathonlink}</p>
                        )
                      )
                    }
                  </div>
                </div>
              ))
            }

            <div className='flex flex-col gap-1'>
              <p className='text-sm pb-1'>Team Members : </p>
              <Image 
                src={sample} 
                alt='profile' 
                className='rounded-[50%] size-6'
                width={80}
                height={80}
                priority
              />
            </div>

            <ButtonComponentToSendReqOrDelete teamdata={teamdata} />

          </div>
        </div>
      }
    </div>
  )
}



function MovetoTeamMembersChatPage({teamdata}:{teamdata:TeamCardInfoType | undefined}){
  const { user } = useUser()
  const router = useRouter()

  // only move if user is in team
  async function movetoChatPage() {
    try {

      if(!teamdata){
        console.log('Wait team Data is undefined till now.')
        return
      }

      const res = await fetch(`/api/checkUserisInteam/${teamdata?.id}`)

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
        return
      }
      
    } catch (error) {
      console.log(`Issue Occured while checking: ${error}`)
    }
  }

  return (
    <>
      <MessageSquareDotIcon onClick={movetoChatPage} className='size-7 rounded bg-purple-100 px-2 hover:bg-purple-300 py-1 cursor-pointer' />
    </>
  )
}


function ButtonComponentToSendReqOrDelete({teamdata}:{teamdata:TeamCardInfoType | undefined}){
  const { user } = useUser()
  const [checkReqSend,setCheckingReqSend] = useState(false)

      // making req to the team leader to join team 
  async function UserMadeaReqToTheTeamLeaderToJoinThereTeam(){
    try {

      if(!teamdata){
        console.log('Wait fetching team data')
        return
      }

      setCheckingReqSend(true)

      const res = await fetch(`/api/userReqtoJoinTeam`,{
        method : 'POST',
        credentials:'include',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({ leaderid: teamdata.leaderid ,teamid: teamdata.id,userId:user?.id })
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

      if(!teamdata){
        console.log('Wait team Data is undefined till now.')
        return
      }
    
      const res = await fetch(`/api/deleteTeam/${teamdata?.id}`,{
          method: 'DELETE',
          credentials:'include'
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
  
  return (
    <div>
      <button className='bg-black text-white text-xs px-9 py-1 rounded'>
        {
          user?.id === teamdata?.leaderid ? 
          <div onClick={DeleteTeam}>delete</div> 
          : 
          <div onClick={UserMadeaReqToTheTeamLeaderToJoinThereTeam}>
            {checkReqSend ? 'sending...' : 'send req!'}
          </div>
        }
      </button>
    </div>
  )
}


// ---------------------------

// this is the actual team page where all the general data related to a team is given
export default function Page() {
  const { teamid } = useParams()

  return (
    <div className='px-8 py-4 overflow-y-auto scrollbar-hide max-h-[calc(96vh-2rem)]'>
      <Suspense fallback={<LoadingComponent label='Searching Team Data....' />}>
        <TeamPageData teamid={teamid} />
      </Suspense>
    </div> 
  )
}
