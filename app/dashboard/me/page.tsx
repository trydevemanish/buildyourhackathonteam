"use client"
import React, { useEffect, useState } from 'react'
import { DialogDemoTextArea,DialogDemoInput,DialogDemoSelect } from '@/components/EditBox'
import { useUser } from '@clerk/nextjs'
import { WholeUserdata,teamCreatedData } from '@/types/types'
import { Skeleton } from "@/components/ui/skeleton"
import Image from 'next/image'

export default function Page() {
  const { user } = useUser()
  const [userdata,setUserdata] = useState({} as WholeUserdata)
  const [fetchinguserdata,setFetchingUserData] = useState(false)

  useEffect(() => {
    const fetchUserDetail = async() => {
      try {

        setFetchingUserData(true)

         const res = await fetch(`/api/finduserbyid/${user?.id}`)

         if(!res.ok){
          console.error(await res.text())
          return;
         }

         const data = await res.json()

         console.log(data?.message)

         setUserdata(data?.Data)
        
      } catch (error) {
        console.error(`Issue ocuured while fetching User detail : ${error}`)
      } finally { 
        setFetchingUserData(false)
      }
    }
    fetchUserDetail()
  },[user?.id])

  return (
    <div className='xs:px-8 md:px-16 py-10 overflow-y-auto scrollbar-hide max-h-[calc(96vh-2rem)]'>
      <div className='flex flex-col gap-y-3 text-xs'>
        <div>
          <span className='text-xl'>Welcome, </span>
          <span className='text-sm'>
            {fetchinguserdata ? <Skeleton className='rounded w-20 h-4' /> : 
              <>
                {userdata?.name ? userdata?.name : 'new user'}
              </>
            }
          </span>
        </div>

        {/* <img src={`${user?.imageUrl}`} alt='user_profile' className='rounded-[50%] size-14 '/> */}
        <Image
          src={user?.imageUrl || "/default-profile.png"} 
          alt="user_Profile"
          className="rounded-[50%] size-14 "
        />

        <div className='flex items-center gap-2'>
          <DialogDemoTextArea props={{ nameOfProp: 'Description' }} />
          <div>
            {fetchinguserdata ? <Skeleton className='rounded w-20 h-4' /> : 
              <>
                  {userdata?.bio ? userdata?.bio : 'Add a small intro of youself .'}
              </>
            }
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <DialogDemoSelect props={{ nameOfProp: 'Role' }} />
          <div>
            {fetchinguserdata ? <Skeleton className='rounded w-20 h-4' /> : 
              <>
                  <span>Role: {userdata?.role ? userdata?.role : 'undefined role'}</span>
                  <span className="text-[9px] font-normal pl-5">*Note: you only have 5 chances to change it.</span>
              </>
            }
          </div>
        </div>

        <div className="overflow-x-auto scrollbar-hide w-full">
          <div className='flex items-center justify-between min-w-[600px]'>
            <div className='flex items-center gap-2'>
              <DialogDemoInput props={{ nameOfProp: 'Email' }} />
              <div>
                {fetchinguserdata ? <Skeleton className='rounded w-20 h-4' /> : 
                  <>
                      {userdata?.email ? userdata?.email : 'No email added.'}
                  </>
                }
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <DialogDemoInput props={{ nameOfProp: 'Github' }} />
              <div>
                {fetchinguserdata ? <Skeleton className='rounded w-20 h-4' /> : 
                  <>
                    {userdata?.github ? userdata?.github : 'No github added.'}
                  </>
                }
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <DialogDemoInput props={{ nameOfProp: 'Linkedin' }} />
              <div>
                {fetchinguserdata ? <Skeleton className='rounded w-20 h-4' /> : 
                  <>
                    {userdata?.linkedin ? userdata?.linkedin : 'No linkedin added.'}
                  </>
                }
              </div>
            </div>
          </div>
        </div>

        <div className='py-9 border-t flex flex-col gap-5'>
            <p>Joined At: {userdata?.createdAt}</p>
            <div>Team Joined: 
              {fetchinguserdata ? <Skeleton className='rounded w-20 h-4' /> : 
                <>
                  {userdata?.teamjoined?.length}
                </>
              }
            </div>
            <div>
                <p>Team Created: {userdata?.teamcreated?.length}</p>
                {userdata?.teamcreated?.length > 0 ?
                <section>
                    <div className="overflow-x-auto scrollbar-hide w-full">
                      <div className='grid grid-cols-4 py-2 overflow-y-auto scrollbar-hide max-h[calc(96vh-2rem)] border-b border-black text-xs pt-5 max-h-[calc(50vh-10rem)]'>
                        <p className='col-start-1 col-end-2 text-center'>Serial</p>
                        <p className='col-start-2 col-end-3 text-center'>Teamname</p>
                        <p className='col-start-3 col-end-4 text-center'>Category</p>
                        <p className='col-start-4 col-end-5 text-center'>ProjectName</p>
                      </div>
                    </div>

                    <div>
                    {fetchinguserdata ? <Skeleton className='rounded w-20 h-4' /> : 
                      <>
                        {userdata?.teamcreated.map((data : teamCreatedData,idx : number) => (
                          <div className="overflow-x-auto scrollbar-hide w-full" key={data?.id || idx}>
                            <div className='grid grid-cols-4 items-center py-2 min-w-[600px] border-b'>
                              <p className='col-start-1 col-end-2 text-center opacity-70 text-xs'>{idx + 1}</p>
                              <p className='col-start-2 col-end-3 text-center opacity-70 text-xs'>{data?.teamname}</p>
                              <p className='col-start-3 col-end-4 text-center opacity-70 text-xs'>{data?.category}</p>
                              <p className='col-start-4 col-end-5 text-center opacity-70 text-xs'>{data?.projectname}</p>
                            </div>
                          </div>
                        ))}
                      </>
                    }
                    </div>
                </section>   
                    :
                    <p className="py-4">No team created.</p>
                }
            </div>
        </div>

     </div>
   </div>
  )
}