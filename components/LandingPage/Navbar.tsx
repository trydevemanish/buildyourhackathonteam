"use client"
import React from 'react'
import Coding from "@/public/coding.png"
import Image from 'next/image'
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Navbar() {

    const { isSignedIn } = useUser()
    const router = useRouter()

    const redirectUrl =
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL_PRODUCTION
        : process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL_DEVELOPMENT    

  
    // need to change the route of the login page whwn i will deploy it .
    async function handleSignin() {
      return isSignedIn ? router.push('/dashboard') : router.push(`/sign-in/redirect_url=${redirectUrl}`)
    }

  return (
    <section className='flex justify-between items-center px-36 py-4 xs:px-4 md:px-36'>
      <div className='flex items-center gap-2'>
        <Image src={Coding} alt='logo' className='size-5' />
        <p className={`font-bold font-opensans text-xs `}>Buildyourhackathonteam</p>
      </div>
      <div className='flex items-center font-inter gap-10 text-xs xs:hidden xs:invisible md:flex md:visible'>
        <p className='cursor-pointer hover:underline' onClick={() => router.push('https://easy-meerkat-32.accounts.dev/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2Fdashboard')}>Login</p>
        <p className='cursor-pointer hover:underline' onClick={() => router.push('/Author')}>About</p>
        <p className='text-xs bg-purple-500 cursor-pointer text-white px-4 py-2 rounded' onClick={handleSignin}>Dashboard</p>
      </div>
      <div className='md:invisible md:hidden xs:visible xs:block'>
        <p className='text-xs bg-purple-500 cursor-pointer text-white px-4 py-2 rounded' onClick={handleSignin}>Dashboard</p>
      </div>
    </section>
  )
}
