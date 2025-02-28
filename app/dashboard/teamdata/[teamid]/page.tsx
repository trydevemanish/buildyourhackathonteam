"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import sample from "@/public/sample.jpeg"
import { TeamCardInfoType } from '@/types/types'
import { useParams } from 'next/navigation'

export default function Page() {

  const [teamdata,setTeamData] = useState({} as TeamCardInfoType)
  const { teamid } = useParams()
  
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
  },[])

  return (
    <div className='px-8 py-4'>
      <p className='text-lg text-center'>Welcome to team: {teamdata?.teamname}.</p>
      <p className='text-[12px] opacity-65 text-center'>by: Dev kumar ( leader ).</p>

      <div className='flex flex-col gap-7 px-16 py-9'>
        <div className='flex flex-col gap-1'>
          <p className='text-sm'>Project name : </p>
          <p className='opacity-80 text-[12px]'> {teamdata?.projectname}</p>
        </div>

        <div className='flex flex-col gap-1'>
          <p className='text-sm'>Project desc : </p>
          <p className='opacity-80 text-[12px]'>{teamdata?.projectdesc}</p>
        </div>

        <div className='flex flex-col gap-1'>
          <p className='text-sm'>Hackathon Name : </p>
          <p className='opacity-80 text-[12px]'>{teamdata?.hackathonname}</p>
        </div>

        <div className='flex flex-col gap-1'>
          <p className='text-sm'>Hackathon desc : </p>
          <p className='opacity-80 text-[12px]'>{teamdata?.hackathondesc}</p>
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
          <button className='bg-black text-white text-xs px-9 py-1 rounded'>send a request !</button>
        </div>

      </div>
    </div>
  )
}