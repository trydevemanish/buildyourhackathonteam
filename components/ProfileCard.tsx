import Image from 'next/image'
import React from 'react'
import sample from "@/public/sample.jpeg"

export default function ProfileCard() {
  return (
    <div className='inline-block'>
      <div className='flex gap-2 items-center px-3 rounded py-2 bg-zinc-200'>
        <Image src={sample} alt='profile_cover' className='rounded-[50%] size-9' />
        <div className='text-xs'>
          <p>manish</p>
          <p>role: backend</p>
        </div>
        <div>
          <button className='bg-black text-white text-[10px] px-3 py-1 rounded'>invite</button>
        </div>
      </div>
    </div>
  )
}
