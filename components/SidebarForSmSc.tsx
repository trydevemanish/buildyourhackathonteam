import React from 'react'
import Link from 'next/link'
import { SignOutButton } from "@clerk/nextjs"
import { SidebarCloseIcon } from 'lucide-react'


export default function SidebarForSmSc({ showSidebar, setShowSideBar }: { showSidebar : boolean,setShowSideBar: (data :boolean) => void }) {

  return (
    <div className='flex flex-col justify-between min-h-screen py-4 px-1'>
        <div className='flex flex-col text-[11px]'>
            <SidebarCloseIcon className='size-4 cursor-pointer' onClick={() => setShowSideBar(!showSidebar) } /> 
            <p className={`cursor-pointer hover:bg-purple-100 py-1 px-2 rounded`} onClick={() => setShowSideBar(!showSidebar)}>
            <Link href={'/dashboard'}>your team</Link>
            </p>
            <p className={` cursor-pointer hover:bg-purple-100 py-1 px-2 rounded`} onClick={() => setShowSideBar(!showSidebar)}>
            <Link href={'/dashboard/allteams'}>other teams to join</Link>
            </p>
            <p className={`cursor-pointer hover:bg-purple-100 py-1 px-2 rounded`} onClick={() => setShowSideBar(!showSidebar)}>
            <Link href={'/dashboard/teamjoined'}>team joined as member</Link>
            </p>
            <p className={`cursor-pointer hover:bg-purple-100 py-1 px-2 rounded`} onClick={() => setShowSideBar(!showSidebar)}>
            <Link href={'/dashboard/otherdev'}>meet other developers</Link>
            </p>
        </div>
        <div className='bg-black flex justify-center text-white px-6 py-1 text-xs rounded'>
        <SignOutButton />
        </div>
    </div>
  )
}
