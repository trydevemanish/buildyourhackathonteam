"use client"
import React, { useEffect, useState } from 'react'
import Sample from '@/public/sample.jpeg'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useUser } from '@clerk/nextjs'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type teamCreatedData = {
    id:string;
    teamname:string;
    projectname:string;
    category:string;
}

type Userdata = {
    id:string;
    name:string;
    bio:string;
    createdAt:string;
    github:string;
    linkedin:string;
    email:string;
    role:string;
    teamcreated : [teamCreatedData],
    teamjoined : [
        length : number,
    ];
}

export default function Page() {
    const [userdata,setUserData] = useState({} as Userdata)
    const [teamcreatedData,setTeamCreatedData] = useState([])
    const [selectedTeamId,setSelectedTeamID] = useState('')
    const {userid} = useParams()
    const { user } = useUser()

    useEffect(() => {
        const fetchUserData = async() => {
            try {

                const res = await fetch(`/api/finduserbyid/${userid}`)

                if(!res.ok){
                    console.log(await res.text())
                    return;
                }

                const data  = await res.json()

                setUserData(data?.Data)
                
            } catch (error) {
                console.log(`Issue Occured while fetching user detail: ${error}`)
            }
        }
        fetchUserData() 
    },[])

    // this useeffect will help me find all the team leader has created.
    useEffect(() => {
        const fetchLoginUserData = async() => {
            try {

                const res = await fetch(`/api/finduserbyid/${user?.id}`)

                if(!res.ok){
                    console.log(await res.text())
                    return;
                }

                const data  = await res.json()

                setTeamCreatedData(data?.Data?.teamcreated)
                
            } catch (error) {
                console.log(`Issue Occured while fetching user detail: ${error}`)
            }
        }
        fetchLoginUserData()  
    },[])

    async function handleMakeAreqBytheLeadertoTheUserTojointheirteam(selectedTeamId:string) {
        try {

            // the one issue arise here i as the leader, how will i send the team id , what if i have multiple team ,then how to pass the team id in which i want to add the user

            const res = await fetch('/api/leaderrequsertojointeam',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({ userid:userid,teamid:selectedTeamId })
            })

            if(!res.ok){
                console.log(await res.text())
                return;
            }

            const data = await res.json()
            console.log(data?.message)

        } catch (error) {
            console.log(`Issue Occured while making req to the user: ${error}`)
        }
    }

  return (
    <div className='px-16 py-10'>
        <div className='flex flex-col gap-y-3 text-xs'>
            <p>
                <span className='text-xl'>Hi this is, </span>
                <span className='text-base'>{userdata?.name}</span>
            </p>
            <Image src={Sample} alt='user_profile' className='rounded-[50%] size-14 '/>
            <div className='flex justify-between'>
                <p>{userdata?.bio}</p>
                <div className='flex gap-7 items-center'>
                    <Select onValueChange={(value) => setSelectedTeamID(value)}>
                        <SelectTrigger className="w-[100px] h-7 text-xs shadow-none border-none focus:outline-white outline-white">
                        <SelectValue placeholder="Select Team" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectGroup className='text-[9px]'>
                            {teamcreatedData.map((teamdata:teamCreatedData,idx:number) => (
                                <SelectItem className='text-[12px]' value={`${teamdata?.id}`} key={idx}>{teamdata?.projectname}</SelectItem>
                            ))}
                        </SelectGroup>
                        </SelectContent>
                    </Select>
                    <button className='bg-black text-[9px] text-white px-8 py-1 rounded shadow' onClick={() => handleMakeAreqBytheLeadertoTheUserTojointheirteam(selectedTeamId)}>invite to join team</button>
                </div>
            </div>
            <p>Role: {userdata?.role}</p>

            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <p>{userdata?.email ?? 'Email not mentioned'}</p>
                </div>

                <div className='flex items-center gap-2'>
                    <p>{userdata?.github ?? 'Github not mentioned'}</p>
                </div>

                <div className='flex items-center gap-2'>
                    <p>{userdata?.linkedin ?? 'Linkedin not mentioned'}</p>
                </div>
            </div>

            <div className='py-9 border-t flex flex-col gap-5'>
                <p>Joined At: {userdata?.createdAt}</p>
                <p>Team Joined: {userdata?.teamjoined?.length}</p>
                <div>
                    <p>Team Created: {userdata?.teamcreated?.length}</p>
                    {userdata?.teamcreated?.length > 0 ?
                    <section>
                       <div className='grid grid-cols-4 py-2 overflow-y-auto scrollbar-hide max-h[calc(96vh-2rem)] border-b border-black text-xs pt-5 max-h-[calc(50vh-10rem)]'>
                            <p className='col-start-1 col-end-2 text-center'>Serial</p>
                            <p className='col-start-2 col-end-3 text-center'>Teamname</p>
                            <p className='col-start-3 col-end-4 text-center'>Category</p>
                            <p className='col-start-4 col-end-5 text-center'>ProjectName</p>
                       </div>

                       <div>
                        {userdata?.teamcreated.map((data : teamCreatedData,idx : number) => (
                            <div className='grid grid-cols-4 items-center py-2 border-b cursor-pointer' key={data?.id || idx}>
                            <p className='col-start-1 col-end-2 text-center opacity-70 text-xs'>{idx + 1}</p>
                            <p className='col-start-2 col-end-3 text-center opacity-70 text-xs'>{data?.teamname}</p>
                            <p className='col-start-3 col-end-4 text-center opacity-70 text-xs'>{data?.category}</p>
                            <p className='col-start-4 col-end-5 text-center opacity-70 text-xs'>{data?.projectname}</p>
                          </div>
                        ))}
                       </div>
                    </section>   
                       :
                       <p>No team created.</p>
                    }
                </div>
            </div>
        </div>
    </div>
  )
}
