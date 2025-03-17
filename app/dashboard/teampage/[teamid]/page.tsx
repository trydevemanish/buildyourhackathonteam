"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function Page() {
    const [fetchdevdata,setfetchdevdata] = useState([])
    const {teamid} = useParams()

    useEffect(() => {
        const findUserInATeam =async() => {
            try {
                const res  = await fetch(`/api/fetchteammembers/${teamid}`)

                if(!res.ok){
                    console.log(await res.text())
                    toast.error(await res.text())
                    return;
                }

                const data = await res.json()

                console.log(data?.message)

                console.log(data)

                setfetchdevdata(data?.data)

            } catch (error) {
                console.log(`Issue occured while fetching user : ${error}`)
            }
        }
        findUserInATeam()
    },[])

  return (
    <section>
        <div className='grid grid-cols-5 py-2 text-sm overflow-y-auto scrollbar-hide max-h[calc(96vh-2rem)] border-b'>
            <p className='col-start-1 col-end-2 text-center'>Serial</p>
            <p className='col-start-2 col-end-3 text-center'>Name</p>
            <p className='col-start-3 col-end-4 text-center'>Email</p>
            <p className='col-start-4 col-end-5 text-center'>Role</p>
        </div>
    </section>
  )
}


{/* <section>
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
                    </section> */}