import React from 'react'
import think from '@/public/think.jpg'
import teams from '@/public/teams.png'
import Image from 'next/image'
import Otherdev from '@/public/otherdev.png'

export default function About() {
  return (
    <section className='py-10 px-36'>
      <div className='flex'>
        <Image src={think} alt='think' className=' size-24' />
        <div className='flex gap-2 items-end'>
          <h1 className='text-4xl'>Why ? </h1>
        </div>
      </div>

      <div className='py-8 flex flex-col gap-10'>

        <div className='grid grid-cols-2 gap-16 py-4'>
          <div className='col-start-1 col-end-2 py-10 px-10'>
            <h1 className='text-2xl'>
              <span>Finding the right team with</span> 
              <span className='text-purple-500'> ease!</span>
            </h1>
            <p className='text-sm opacity-70 py-8'>Hard to find people with similar interests/skills.</p>
          </div>
          <Image src={teams} alt='teams' className='col-start-2 col-end-3 border' />
        </div>

        <div className='grid grid-cols-2 gap-16 py-4'>
          <Image src={Otherdev} alt='otherdev' className='col-start-1 col-end-2 border' />
          <div className='col-start-2 col-end-3 py-10 px-10'>
            <h1 className='text-2xl'>
              <span>Connect with </span> 
              <span className='text-purple-500'> like-minded people </span>
            </h1>
            <p className='text-sm opacity-70 py-8'>without awkward face-to-face interactions.</p>
          </div>
        </div>
      </div>
      <p className='bg-purple-500 text-xs rounded cursor-pointer text-white px-8 py-2 inline-block'>Show more.</p>
    </section>
  )
}


