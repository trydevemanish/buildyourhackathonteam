import React, { useState } from 'react'
import { SignOutButton } from "@clerk/nextjs"
import { useRouter } from 'next/navigation'

const layoutDataNavigationStructure = [
  {
    id:1,
    pushto : '/dashboard',
    para :`${"Your's team"}`
  },
  {
    id:2,
    pushto : '/dashboard/otherdev',
    para : 'Meet developers'
  },
  {
    id:3,
    pushto : '/dashboard/allteams',
    para : 'Other teams to join'
  },
  {
    id:4,
    pushto : '/dashboard/hackathonpage',
    para : 'Upcoming Hackathons'
  },
  {
    id:5,
    pushto : '/dashboard/teamjoined',
    para : 'Team joined as member'
  }
]

type layoutDataNavigationStructure = {
  id:number,
  pushto  :string,
  para  :string;
}

type props = {
  closeSidebar : () => void
}

export default function SideBarComp({closeSidebar}:props) {
  const [selected,setSelected] = useState(1)
  const router = useRouter()

  async function handleMenuSelect(pushto:string,id:number){
    setSelected(id)
    router.push(pushto)
  }

  return (
    <div className='flex flex-col justify-between min-h-screen py-4 px-1 relative bg-gradient-to-b from-[#ffffff] via-purple-50 to-[#ffffff]'>
      <button
        className="absolute top-2 right-2 md:hidden text-xl font-bold"
        onClick={closeSidebar}
      >
        ✕
      </button>
      <div className='flex flex-col gap-1 text-[12px]'>
          {layoutDataNavigationStructure.map((data : layoutDataNavigationStructure,idx : number) => (
            <p className={`cursor-pointer font-semibold ${selected && selected == data?.id ? 'bg-purple-300' : ''} hover:bg-purple-300 py-1 px-2 rounded`} onClick={async() => await handleMenuSelect(data?.pushto,data?.id)} key={idx} >{data?.para}</p>
          ))}
      </div>
      <div className='bg-black flex justify-center text-white px-6 py-1 text-xs rounded'>
        <SignOutButton />
      </div>
    </div>
  )
}
