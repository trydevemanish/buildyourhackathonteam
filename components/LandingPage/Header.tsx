import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import header from '@/public/header.png'

export default function Header() {
  return (
    <section className='py-12 bg-gradient-to-b from-white via-purple-100 to-white xs:px-4 md:px-0'>
      <div className='xs:flex xs:flex-col xs:gap-10      md:grid md:grid-cols-2 md:gap-12 md:pl-36'>
        <div className='col-start-1 col-end-2 py-12'> 
          <h1 className='font-opensans flex flex-col gap-4 font-bold text-3xl xs:text-center md:text-left'>
            <span>Build & Join Hackathon Teams</span>
            <span> with Ease!</span>
          </h1>
          <p className='py-6 text-sm xs:text-center md:text-left'>Struggling to find teammates for hackathons ?</p>
          <p className='text-xs  xs:text-center md:text-left'>
            <span className='opacity-70'>Whether {"you're"} an introvert or just don’t know where to start,</span>
            <span className='text-purple-500 font-bold'> Join here</span>
            <span className='opacity-70'> it easy to create, join, and collaborate on the perfect hackathon team.</span>
          </p>
          <div className='py-16  xs:flex xs:justify-center md:block'>
            <Link href='/dashboard'><button className='bg-purple-500 text-white px-8 py-2 text-xs rounded-md'>Get started</button></Link>
          </div>
        </div>
        <div className="flex justify-center md:justify-start">
          <Image 
            src={header} 
            width={500}
            height={600}
            priority
            alt="header" 
            className="
              w-full max-w-[50rem] h-auto 
              xs:px-6 xs:rounded-xl 
              md:px-0 md:rounded-none
              shadow-md shadow-purple-100
            " 
          />
        </div>
      </div>
    </section>
  )
}
