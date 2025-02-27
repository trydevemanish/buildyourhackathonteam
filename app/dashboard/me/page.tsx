"use client"
import React from 'react'
import { DialogDemoTextArea,DialogDemoInput,DialogDemoSelect } from '@/components/EditBox'
import { useUser } from '@clerk/nextjs'

export default function page() {
  const { user } = useUser()
  return (
    <div className='px-16 py-10'>
      <div className='flex flex-col gap-y-3 text-xs'>
        <p>
          <span className='text-xl'>Welcome, </span>
          <span className='text-base'>Manish</span>
        </p>
        <img src={`${user?.imageUrl}`} alt='user_profile' className='rounded-[50%] size-14 '/>

        <div className='flex items-center gap-2'>
          <DialogDemoTextArea props={{ nameOfProp: 'Description' }} />
          <p>Add a small intro of youself .</p>
        </div>

        <div className='flex items-center gap-2'>
          <DialogDemoSelect props={{ nameOfProp: 'Role' }} />
          <p>
            <span>Role: Backend</span>
            <span className="text-[9px] font-normal pl-5">*Note: you only have 5 chances to change it.</span>
          </p>
        </div>

        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <DialogDemoInput props={{ nameOfProp: 'Email' }} />
            <p>msh17679@gmail.com</p>
          </div>

          <div className='flex items-center gap-2'>
            <DialogDemoInput props={{ nameOfProp: 'Github' }} />
            <p>https://github.com/mainshSharma1-dev</p>
          </div>

          <div className='flex items-center gap-2'>
            <DialogDemoInput props={{ nameOfProp: 'Linkedin' }} />
            <p>https://linkedin/in/Manihsh11</p>
          </div>
        </div>

        <div className='py-9 border-t flex flex-col gap-5'>
          <p>Joined At: date</p>
          <p>Team Created: 0</p>
        </div>

     </div>
   </div>
  )
}


{/* <main className='px-16 py-10'>
<p className={`text-center text-lg font-bold pb-8 items-center`}>User Profile :</p>
<div className='grid grid-cols-8'>
    <div className='col-start-1 col-end-3'>
        <Image src={sample} alt='user_profile' className='rounded-[50%] size-44 '/>
    </div>
    <div className='col-start-3 col-end-9'>
        <p>role: Backend dev</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum consequuntur, quae nam mollitia natus debitis laboriosam illum, obcaecati dicta molestias quis facilis accusamus ut quod nihil modi enim. Provident, eum.</p>
        <p>github: </p>
    </div>
</div>
</main> */}