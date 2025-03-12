import React from 'react'
import Coding from "@/public/coding.png"
import Image from 'next/image'

export default function Navbar() {
  return (
    <section className='flex justify-between items-center px-36 py-4'>
      <div className='flex items-center gap-2'>
        <Image src={Coding} alt='logo' className='size-5' />
        <p className={`font-semibold text-xs `}>Buildyourhackathonteam</p>
      </div>
      <div className='flex items-center gap-10 text-xs'>
        <p className='cursor-pointer hover:underline'>Login</p>
        <p className='cursor-pointer hover:underline'>About</p>
        <p className='text-xs bg-purple-500 text-white px-4 py-2 rounded'>Dashboard</p>
      </div>
    </section>
  )
}
