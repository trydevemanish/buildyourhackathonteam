import React from 'react'
import Image from 'next/image'
import sample from "@/public/sample.jpeg"
// import { useUser } from '@clerk/nextjs'

export default function page() {
  // const { user } = useUser()d
  return (
   <div className='px-16 py-10'>
     <div className='flex flex-col gap-y-3 text-xs'>
      <p>
        <span className='text-xl'>Welcome, </span>
        <span className='text-base'>Manish</span>
      </p>
      {/* <img src='#' alt='profile' /> */}
      <Image src={sample} alt='user_profile' className='rounded-[50%] size-14 '/>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod, perspiciatis voluptas iusto architecto expedita, similique corrupti quos accusantium dolorem aut eius omnis! Eligendi pariatur reprehenderit alias. Assumenda excepturi vel est!</p>
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