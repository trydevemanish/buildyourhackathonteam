import React from 'react'
import header from '@/public/header.png'
import Image from 'next/image'

export default function Header() {
  return (
    <section className='py-12 pl-36 bg-gradient-to-b from-white via-purple-50 to-purple-200'>
      <div className='grid grid-cols-2 gap-12'>
        <div className=' col-start-1 col-end-2 py-12'> 
          <h1 className='text-3xl flex flex-col gap-4'>
            <span>Build & Join Hackathon Teams </span>
            <span>with Ease!</span>
          </h1>
          <p className='py-6 text-sm'>Struggling to find teammates for hackathons ?</p>
          <p className='text-xs'>
            <span className='opacity-70'>Whether you're an introvert or just don’t know where to start,</span>
            <span className='text-purple-500 font-bold'> Join here</span>
            <span className='opacity-70'> it easy to create, join, and collaborate on the perfect hackathon team.</span>
          </p>
          <div className='py-16'>
            <button className='bg-purple-500 text-white px-8 py-2 text-xs rounded-md'>Get started</button>
          </div>
        </div>
        <Image src={header} alt='header' className='w-[33rem] h-[29rem] col-start-2 col-end-2 rounded-b' />
      </div>
    </section>
  )
}
