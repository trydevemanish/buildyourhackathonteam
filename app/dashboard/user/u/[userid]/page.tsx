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

// Userdata

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
        fetchUserData() 
    },[userid])

    // this useeffect will help me find all the team leader has created.
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

    async function handleMakeAreqBytheLeadertoTheUserTojointheirteam(selectedTeamId:string) {
        try {

            // the one issue arise here i as the leader, how will i send the team id , what if i have multiple team ,then how to pass the team id in which i want to add the user

            toast.loading('Sending invitation to user')

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
        <div className='flex flex-col gap-y-3 text-xs'>
            <div>
                <span className='text-xl'>Hi this is, </span>
                <span className='text-base'>
                    {fetchinguserdata ? <Skeleton className='rounded w-20 h-4' /> : 
                        <>
                            {userdata?.name ? userdata?.name : 'new user'}
                        </>
                    }
                </span>
            </div>
            <Image
                src={userProfileUrl || "/default-user.jpg"}
                alt="User Profile"
                width={150}
                height={40}
                className="rounded-[50%] size-14 max-w-sm max-h-52 hover:grayscale"
            />

            <div className='flex justify-between'>
                <div>
                    {fetchinguserdata ? <Skeleton className='rounded w-20 h-4' /> : 
                        <>
                            {userdata?.bio ? userdata?.bio : 'No bio added.'}
                        </>
                    }
                </div>
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
            <div>
                {fetchinguserdata ? <Skeleton className='rounded w-20 h-4' /> : 
                    <>
                        <span>Role: {userdata?.role ? userdata?.role : 'undefined role'}</span>
                    </>
                }
            </div>

            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <div>
                        {fetchinguserdata ? <Skeleton className='rounded w-20 h-4' /> : 
                            <>
                                {userdata?.email ? userdata?.email : 'No email added.'}
                            </>
                        }
                    </div>
                </div>

                <div className='flex items-center gap-2'>
                    <div>
                        {fetchinguserdata ? <Skeleton className='rounded w-20 h-4' /> : 
                            <>
                                {userdata?.github ? userdata?.github : 'No github added.'}
                            </>
                        }
                    </div>
                </div>

                <div className='flex items-center gap-2'>
                    <div>{fetchinguserdata ? <Skeleton className='rounded w-20 h-4' /> : 
                            <>
                                {userdata?.linkedin ? userdata?.linkedin : 'No linkedin added.'}
                            </>
                        }
                    </div>
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
                        {fetchinguserdata ? <Skeleton className='rounded w-full h-4' /> : 
                            <>
                            {userdata?.teamcreated.map((data : teamCreatedData,idx : number) => (
                                <div className='grid grid-cols-4 items-center py-2 border-b' key={data?.id || idx}>
                                <p className='col-start-1 col-end-2 text-center opacity-70 text-xs'>{idx + 1}</p>
                                <p className='col-start-2 col-end-3 text-center opacity-70 text-xs'>{data?.teamname}</p>
                                <p className='col-start-3 col-end-4 text-center opacity-70 text-xs'>{data?.category}</p>
                                <p className='col-start-4 col-end-5 text-center opacity-70 text-xs'>{data?.projectname}</p>
                                </div>
                            ))}
                            </>
                        }
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
