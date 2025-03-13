"use client"
import React, { useEffect, useState } from 'react'
import { DialogDemoTextArea,DialogDemoInput,DialogDemoSelect } from '@/components/EditBox'
import { useUser } from '@clerk/nextjs'
import { WholeUserdata,teamCreatedData } from '@/types/types'

export default function page() {
  const { user } = useUser()
  const [userdata,setUserdata] = useState({} as WholeUserdata)

  useEffect(() => {
    const fetchUserDetail = async() => {
      try {

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
      }
    }
    fetchUserDetail()
  },[])

  return (
    <div className='px-16 py-10 overflow-y-auto scrollbar-hide max-h-[calc(96vh-2rem)]'>
      <div className='flex flex-col gap-y-3 text-xs'>
        <p>
          <span className='text-xl'>Welcome, </span>
          <span className='text-sm'>{userdata?.name ? userdata?.name : 'new user'}</span>
        </p>
        <img src={`${user?.imageUrl}`} alt='user_profile' className='rounded-[50%] size-14 '/>

        <div className='flex items-center gap-2'>
          <DialogDemoTextArea props={{ nameOfProp: 'Description' }} />
          <p>{userdata?.bio ? userdata?.bio : 'Add a small intro of youself .'}</p>
        </div>

        <div className='flex items-center gap-2'>
          <DialogDemoSelect props={{ nameOfProp: 'Role' }} />
          <p>
            <span>Role: {userdata?.role ? userdata?.role : 'undefined role'}</span>
            <span className="text-[9px] font-normal pl-5">*Note: you only have 5 chances to change it.</span>
          </p>
        </div>

        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <DialogDemoInput props={{ nameOfProp: 'Email' }} />
            <p>{userdata?.email ? userdata?.email : 'No email added.'}</p>
          </div>

          <div className='flex items-center gap-2'>
            <DialogDemoInput props={{ nameOfProp: 'Github' }} />
            <p>{userdata?.github ? userdata?.github : 'No github added.'}</p>
          </div>

          <div className='flex items-center gap-2'>
            <DialogDemoInput props={{ nameOfProp: 'Linkedin' }} />
            <p>{userdata?.linkedin ? userdata?.linkedin : 'No linkedin added.'}</p>
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
                      <div className='grid grid-cols-4 items-center py-2 border-b' key={data?.id || idx}>
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