import Image from 'next/image'
import React from 'react'
import sample from "@/public/sample.jpeg"
import { UserData } from '@/types/types'
import { useRouter } from 'next/navigation'

export default function ProfileCard({props}:{props:UserData}) {

  const router = useRouter()

  return (
    <div className='inline-block'>
      <div className='flex gap-2 items-center px-3 rounded py-2 cursor-pointer bg-zinc-200' onClick={() => router.push(`/dashboard/user/u/${props?.id}`)}>
        <Image src={sample} alt='profile_cover' className='rounded-[50%] size-9' />
        <div className='text-xs'>
          <p>{props?.name}</p>
          <p>role: {props?.role}</p>
        </div>
        <div>
          <button className='bg-black text-white text-[10px] px-3 py-1 rounded'>invite</button>
        </div>
      </div>
    </div>
  )
}
