import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Coding from "@/public/coding.png"
import { SignInButton } from '@clerk/nextjs'

export default function Navbar() {
  return (
    <section className='flex justify-between items-center px-36 py-4 xs:px-4 md:px-36'>
      <div className='flex items-center gap-2'>
        <Image src={Coding} alt='logo' className='size-5' />
        <p className={`font-bold font-opensans text-xs `}>Buildyourhackathonteam</p>
      </div>
      <div className='flex items-center font-inter gap-10 text-xs xs:hidden xs:invisible md:flex md:visible'>
        <SignInButton>Login</SignInButton>
        <Link href={'/dashboard'} className='text-xs bg-purple-500 cursor-pointer text-white px-4 py-2 rounded'>Dashboard</Link>
      </div>
      <div className='md:invisible md:hidden xs:visible xs:block'>
        <Link href={'/dashboard'} className='text-xs bg-purple-500 cursor-pointer text-white px-4 py-2 rounded'>Dashboard</Link>
      </div>
    </section>
  )
}
