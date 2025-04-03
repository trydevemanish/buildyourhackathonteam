import React from 'react'
import { SignOutButton } from "@clerk/nextjs"
import { useRouter } from 'next/navigation'

const layoutDataNavigationStructure = [
  {
    pushto : '/dashboard',
    para :'your team '
  },
  {
    pushto : '/dashboard/allteams',
    para : 'other teams to join'
  },
  {
    pushto : '/dashboard/teamjoined',
    para : 'team joined as member'
  },
  {
    pushto : '/dashboard/otherdev',
    para : 'meet other developers'
  }
]

type layoutDataNavigationStructure = {
  pushto  :string,
  para  :string;
}

export default function SideBarComp() {
  const router = useRouter()
  return (
    <div className='flex flex-col justify-between min-h-screen py-4 px-1'>
        <div className='flex flex-col text-[11px]'>
            {layoutDataNavigationStructure.map((data : layoutDataNavigationStructure,idx : number) => (
              <p className={`cursor-pointer hover:bg-purple-100 py-1 px-2 rounded`} onClick={() => router.push(data?.pushto)} key={idx} >{data?.para}</p>
            ))}
        </div>
        <div className='bg-black flex justify-center text-white px-6 py-1 text-xs rounded'>
        <SignOutButton />
        </div>
    </div>
  )
}
