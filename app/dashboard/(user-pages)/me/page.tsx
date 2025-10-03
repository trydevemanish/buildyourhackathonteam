"use client"
import React, {useRef, Suspense } from 'react'
import { DialogDemoTextArea,DialogDemoInput,DialogDemoSelect } from '@/components/EditBox'
import { useUser } from '@clerk/nextjs'
import { WholeUserdata,teamCreatedData } from '@/types/types'
import Image from 'next/image'
import { teamCreatedAttributeNamenType } from '@/types/types'
import LoadingComponent from '@/components/LoadingComponent'
import { useFetchData } from '@/hook/useFetchData'


export default function Page() {
  return (
    <div className='xs:px-4 md:px-16 py-8 overflow-y-auto scrollbar-hide max-h-[calc(96vh-2rem)]'>
      <Suspense fallback={<LoadingComponent label='Feching profile data...' />}>
        <UserData />
      </Suspense>
   </div>
  )
}

// ---------------------------------------------------------------------------------

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
  },
  {
    attribute : 'Teamname',
  },
  {
    attribute : 'Category',
  },
  {
    attribute : 'ProjectName',
  },
]

function UserData(){
  const { user } = useUser()
  const descriptionupdated = useRef(false)
  const { data : userdata, errors } = useFetchData<WholeUserdata>({ url: `/api/finduserbyid/${user?.id}`, state: [descriptionupdated.current] })

  if(!userdata){
    return (
      <LoadingComponent label='Feching profile data...' />
    )
  }

  if(errors){
    return (
      <LoadingComponent label='Issue Occured while fetching user profile data.' />
    )
  }

  return (
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
        priority
      />
    </div>

    {/* shows bio  */}
    <div className='flex items-center pt-2 gap-2'>
      <DialogDemoTextArea props={{ nameOfProp: 'Description',onUpdate: () => descriptionupdated.current = !descriptionupdated.current  }} />
      {/* <DialogDemoTextArea props={{ nameOfProp: 'Description' }} /> */}
      <p className='font-opensans'>
          {userdata?.bio ? userdata?.bio : 'Add a small intro of yourself .'}
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

    <TeamDetail userdata={userdata} />

</div>
  )
}



function TeamDetail({userdata}:{userdata : WholeUserdata | undefined}) {

  if(!userdata){
    return (
      <div>
        <p className='text-center py-7'>Wait fetching your team detail!</p>
      </div>
    )
  }

  if(userdata == null){
     <div>
      <p className='text-center py-7'>You {"aren't"} related to any team!</p>
    </div>
  }

  return (
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
              userdata && userdata?.teamcreated?.length > 0 ?
              <section>
                  <div className="overflow-x-auto scrollbar-hide border-b  w-full">
                    <div className='grid grid-cols-4 gap-1 overflow-y-auto scrollbar-hide max-h[calc(96vh-2rem)] text-xs pt-5 max-h-[calc(50vh-10rem)]'>
                        {
                          teamCreatedAttributeNamen.map((data:teamCreatedAttributeNamenType,idx:number) => (
                            <p className={`text-center bg-purple-200 py-1`}key={idx}>{data?.attribute}</p>
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
  )
}