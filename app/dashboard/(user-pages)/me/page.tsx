"use client"
import React, { useEffect, useState } from 'react'
import { DialogDemoTextArea,DialogDemoInput,DialogDemoSelect } from '@/components/EditBox'
import { useUser } from '@clerk/nextjs'
import { WholeUserdata,teamCreatedData } from '@/types/types'
import Image from 'next/image'
import { teamCreatedAttributeNamenType } from '@/types/types'
import LoadingComponent from '@/components/LoadingComponent'

const socialMediaObject = [
  {
    nameOfProp : 'Email'
  },
  {
    nameOfProp : 'Github'
  },
  {
    nameOfProp : 'Linkedin'
  },
]

type socialMediaObjecttype = {
  nameOfProp:string
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
    <div className='xs:px-8 md:px-16 py-8 overflow-y-auto scrollbar-hide max-h-[calc(96vh-2rem)]'>

      {
        fetchinguserdata ? 
        <LoadingComponent label='Feching profile data...' />
        :
        (
          userdata != null ? 
          <div className='flex flex-col gap-y-1 text-xs'>
              <p className='font-medium py-3'>
                <span className='text-xl'>Welcome, </span>
                <span className='text-xl capitalize '>{userdata?.name ? userdata?.name : 'new user'}</span>
              </p>

              {/* <img src={`${user?.imageUrl}`} alt='user_profile' className='rounded-[50%] size-14 '/> */}
              <div className='py-2'>
                <Image
                  src={user?.imageUrl || "/default-profile.png"} 
                  alt="user_Profile"
                  width={90}
                  height={90}
                  className="rounded-[50%] size-14 border shadow-sm shadow-slate-300"
                />
              </div>

              {/* shows bio  */}
              <div className='flex items-center pt-2 gap-2'>
                <DialogDemoTextArea props={{ nameOfProp: 'Description' }} />
                <p className='font-opensans'>
                    {userdata?.bio ? userdata?.bio : 'Add a small intro of youself .'}
                </p>
              </div>

              {/* shows role  */}
              <div className='flex items-center pt-2 gap-2'>
                <DialogDemoSelect props={{ nameOfProp: 'Role' }} />
                <p className='font-opensans'>Role: {userdata?.role ? userdata?.role : 'undefined role'}</p>
              </div>

              {/* shows social media  */}
              <div className="overflow-x-auto scrollbar-hide py-1 pb-2 w-full ">
                <div className='flex items-center justify-between font-opensans py-1 rounded-md w-full'>
                  {
                    socialMediaObject.map((data:socialMediaObjecttype,idx:number) => (
                      <div className='flex items-center gap-2' key={idx}>
                        <DialogDemoInput props={{ nameOfProp: data.nameOfProp }} />
                        <div>
                          {
                            data?.nameOfProp == 'Email' ? 
                              <p>{userdata?.email ? userdata?.email : 'No email added.'}</p>
                            :
                            (
                              data?.nameOfProp == 'Github' ?
                              <p>{userdata?.github ? userdata?.github : 'No github added.'}</p>
                              :
                              <p>{userdata?.linkedin ? userdata?.linkedin : 'No linkedin added.'}</p>
                            )
                          }
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>

              <div className='py-5 border-t flex flex-col gap-5'>
                {/* shows simple data like team joined by user and when user joined the website  */}
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
                        <p className="py-4">No team created.</p>
                      }
                  </div>
              </div>

          </div>
          :
          (
            <LoadingComponent label='Issue Occured while fetching user profile data.' />
          )
        )
      }

   </div>
  )
}


            {/* <div className='flex items-center gap-2'>
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
            </div> */}