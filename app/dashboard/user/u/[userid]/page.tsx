"use client"
import React, { useEffect, useState } from 'react'
import Sample from '@/public/sample.jpeg'
import Image from 'next/image'
import { useParams } from 'next/navigation'

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
    const {userid} = useParams()

    useEffect(() => {
        const fetchUserData = async() => {
            try {

                const res = await fetch(`/api/finduserbyid/${userid}`)

                if(!res.ok){
                    console.log(await res.text())
                    return;
                }

                const data  = await res.json()

                console.log(data)

                setUserData(data?.Data)
                
            } catch (error) {
                console.log(`Issue Occured while fetching user detail: ${error}`)
            }
        }
        fetchUserData() 
    },[])

  return (
    <div className='px-16 py-10'>
        <div className='flex flex-col gap-y-3 text-xs'>
            <p>
                <span className='text-xl'>Hi this is, </span>
                <span className='text-base'>{userdata?.name}</span>
            </p>
            <Image src={Sample} alt='user_profile' className='rounded-[50%] size-14 '/>
            <p>{userdata?.bio}</p>
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
