"use client"
import React from 'react'
import Coding from "@/public/coding.png"
import Image from 'next/image'
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Navbar() {

    const { isSignedIn } = useUser()
    const router = useRouter()

    // need to change the route of the login page whwn i will deploy it .
    async function handleSignin() {
      return isSignedIn ? router.push('/dashboard') : router.push(`/sign-in`)
    }

  return (
    <section className='flex justify-between items-center px-36 py-4 xs:px-4 md:px-36'>
      <div className='flex items-center gap-2'>
        <Image src={Coding} alt='logo' className='size-5' />
        <p className={`font-bold font-opensans text-xs `}>Buildyourhackathonteam</p>
      </div>
      <div className='flex items-center font-inter gap-10 text-xs xs:hidden xs:invisible md:flex md:visible'>
        <p className='cursor-pointer hover:underline' onClick={() => router.push('/sign-in')}>Login</p>
        <p className='cursor-pointer hover:underline' onClick={() => router.push('/Author')}>About</p>
        <p className='text-xs bg-purple-500 cursor-pointer text-white px-4 py-2 rounded' onClick={handleSignin}>Dashboard</p>
      </div>
      <div className='md:invisible md:hidden xs:visible xs:block'>
        <p className='text-xs bg-purple-500 cursor-pointer text-white px-4 py-2 rounded' onClick={handleSignin}>Dashboard</p>
      </div>
    </section>
  )
}
