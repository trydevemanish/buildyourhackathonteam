"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { teamCreatedData,WholeUserdata } from '@/types/types'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
//   SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from '@/components/ui/skeleton'
import toast from 'react-hot-toast'
import LoadingComponent from '@/components/LoadingComponent'
import { teamCreatedAttributeNamenType } from '@/types/types'


const socialMediaObject = [
  {
    name : 'email'
  },
  {
    name : 'github'
  },
  {
    name : 'linkedin'
  },
]

type socialMediaObjecttype = {
  name:string
}

const teamCreatedAttributeNamen = [
  {
    attribute : 'Serial',
    className : 'col-start-1 col-end-2 text-center'
  },
  {
    attribute : 'Teamname',
    className : 'col-start-2 col-end-3 text-center'
  },
  {
    attribute : 'Category',
    className:'col-start-3 col-end-4 text-center'
  },
  {
    attribute : 'ProjectName',
    className:'col-start-4 col-end-5 text-center'
  },
]


// Userdata
// this is an important page , profile of othe devs
export default function Page() {
    const [userdata,setUserData] = useState({} as WholeUserdata)
    const [teamcreatedData,setTeamCreatedData] = useState([])
    const [selectedTeamId,setSelectedTeamID] = useState('')
    const [fetchinguserdata,setFetchingUserData] = useState(false)
    const [userProfileUrl,setUserProfileUrl] = useState('/default-user.jpg')
    const {userid} = useParams()
    const { user } = useUser()

    useEffect(() => {
        const fetchUserData = async() => {
            try {

                setFetchingUserData(true)

                const res = await fetch(`/api/finduserbyid/${userid}`)

                if(!res.ok){
                    console.log(await res.text())
                    return;
                }

                const data  = await res.json()

                setUserData(data?.Data)
                setUserProfileUrl(data?.Data?.profileurl)
                
            } catch (error) {
                console.log(`Issue Occured while fetching user detail: ${error}`)
            } finally { 
                setFetchingUserData(false)
            }
        }
        // fetchUserData() 
    },[userid])

    // this useeffect will help me find all the teams, that the leader who is visiting the developer page has created.
    useEffect(() => {
        const fetchLoginUserData = async() => {
            try {

                setFetchingUserData(true)

                const res = await fetch(`/api/finduserbyid/${user?.id}`)

                if(!res.ok){
                    console.log(await res.text())
                    return;
                }

                const data  = await res.json()

                setTeamCreatedData(data?.Data?.teamcreated)
                
            } catch (error) {
                console.log(`Issue Occured while fetching user detail: ${error}`)
            } finally {
                setFetchingUserData(false)
            }
        }
        fetchLoginUserData()  
    },[user?.id])


    // this function help leader to make a request to the user to join team 
    async function handleMakeAreqBytheLeadertoTheUserTojointheirteam(selectedTeamId:string) {
        try {

            // the one issue arise here i as the leader, how will i send the team id , what if i have multiple team ,then how to pass the team id in which i want to add the user

            toast.remove('Sending invitation to user')

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

            toast.loading(data?.message)

        } catch (error) {
            console.log(`Issue Occured while making req to the user: ${error}`)
        }
    }

  return (
    <div className='px-16 py-10'>
        {
            fetchinguserdata ? 
            <LoadingComponent label='Fetching devloper data...' /> :
            (
                userdata != null ? 
                <div className='flex flex-col gap-y-3 text-xs'>
                    <p className='font-medium py-2'>
                        <span className='text-xl'>Hi this is, </span>
                        <span className='text-xl capitalize '> {userdata?.name ? userdata?.name : 'new user'}</span>
                    </p>

                    <div className='py-2'>
                        <Image
                            src={userProfileUrl || "/default-user.jpg"}
                            alt="User Profile"
                            width={150}
                            height={40}
                            className="rounded-[50%] size-14 max-w-sm max-h-52 hover:grayscale"
                        />
                    </div>

                    <div className='flex justify-between'>
                        <p className='font-opensans text-xs'>{userdata?.bio ? userdata?.bio : 'No bio added.'}</p>

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
                            <button 
                                className='bg-black text-xs text-white px-8 py-1 rounded shadow' 
                                onClick={() => handleMakeAreqBytheLeadertoTheUserTojointheirteam(selectedTeamId)}
                            >
                                Invite to join team
                            </button>
                        </div>
                    </div>

                    <p>
                        <span className='text-xs font-opensans'>Role : </span>
                        <span>{userdata?.role ? userdata?.role : 'undefined role'}</span>
                    </p>

                    <div className='flex items-center justify-between w-full gap-2'>
                        {
                            socialMediaObject.map((data:socialMediaObjecttype,idx:number) => (
                                <>
                                    {
                                        data.name == 'email' ?
                                        <p>{userdata?.email ? userdata?.email : 'No email added.'}</p>
                                        :
                                        (
                                            data.name == 'github' ? 
                                            <p>{userdata?.github ? userdata?.github : 'No github added.'}</p>
                                            :
                                            <p>{userdata?.linkedin ? userdata?.linkedin : 'No linkedin added.'}</p>
                                        )
                                    }
                                </>
                            ))
                        }
                    </div>

                    <div className='py-5 border-t flex flex-col gap-5'>
                        <p className='text-center font-opensans text-sm underline decoration-purple-200 underline-offset-4'>Team detail</p>
                        <div className='flex flex-row items-center gap-8'>
                            <p>
                                <span className='font-opensans pr-2'>Joined At :</span> 
                                <span>{userdata?.createdAt}</span>
                            </p>
                            <p>
                                <span className='font-opensans pr-2'>Team Joined: </span> 
                                <span>{userdata?.teamjoined?.length}</span>
                            </p>
                        </div>

                        <div>
                            <p>
                                <span className='font-opensans pr-2'>Team Created :</span> 
                                <span>{userdata?.teamcreated?.length}</span>
                            </p>
                            {
                                userdata?.teamcreated?.length > 0 ?
                                <section>
                                    <div className="overflow-x-auto scrollbar-hide border-b  w-full">
                                        <div className='grid grid-cols-4 gap-1 overflow-y-auto scrollbar-hide max-h[calc(96vh-2rem)] text-xs pt-5 max-h-[calc(50vh-10rem)]'>
                                            {
                                            teamCreatedAttributeNamen.map((data:teamCreatedAttributeNamenType,idx:number) => (
                                                <p className={`${data?.className} bg-purple-200 py-1`}key={idx}>{data?.attribute}</p>
                                            ))
                                            }
                                        </div>
                                    </div>

                                    <div>
                                        {
                                            userdata?.teamcreated.map((data : teamCreatedData,idx : number) => (
                                                <div className="overflow-x-auto scrollbar-hide w-full" key={data?.id || idx}>
                                                <div className='grid grid-cols-4 font-opensans items-center py-2 min-w-[600px] border-b'>
                                                    <p className='col-start-1 col-end-2 text-center opacity-70 text-xs'>{idx + 1}</p>
                                                    <p className='col-start-2 col-end-3 text-center opacity-70 text-xs'>{data?.teamname}</p>
                                                    <p className='col-start-3 col-end-4 text-center opacity-70 text-xs'>{data?.category}</p>
                                                    <p className='col-start-4 col-end-5 text-center opacity-70 text-xs'>{data?.projectname}</p>
                                                </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </section>   
                                :
                                <p>No team created.</p>
                            }
                        </div>
                    </div>
                </div> 
                :
                (
                    <LoadingComponent label='Issue occured while fetching dev data.' />
                )
            )
        }
    </div>
  )
}
