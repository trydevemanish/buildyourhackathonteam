import React from 'react'
import Link from 'next/link'
import { SignOutButton } from "@clerk/nextjs"

export default function SideBarComp() {
  return (
    <div className='flex flex-col justify-between min-h-screen py-4 px-1'>
        <div className='flex flex-col text-[11px]'>
            <p className={`cursor-pointer hover:bg-purple-100 py-1 px-2 rounded`}>
            <Link href={'/dashboard'}>your team</Link>
            </p>
            <p className={` cursor-pointer hover:bg-purple-100 py-1 px-2 rounded`}>
            <Link href={'/dashboard/allteams'}>other teams to join</Link>
            </p>
            <p className={`cursor-pointer hover:bg-purple-100 py-1 px-2 rounded`}>
            <Link href={'/dashboard/teamjoined'}>team joined as member</Link>
            </p>
            <p className={`cursor-pointer hover:bg-purple-100 py-1 px-2 rounded`}>
            <Link href={'/dashboard/otherdev'}>meet other developers</Link>
            </p>
        </div>
        <div className='bg-black flex justify-center text-white px-6 py-1 text-xs rounded'>
        <SignOutButton />
        </div>
    </div>
  )
}
