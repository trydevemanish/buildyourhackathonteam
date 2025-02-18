import React from 'react'
import ProfileCard from '@/components/ProfileCard'

export default function Page() {
  return (
    <div className='px-10 py-5'>
      <div className='text-center text-base'>
        <p>Connect with other devs.</p>
        <p className='text-xs opacity-60 pt-2 pb-10'>invite them to your hackathon team.</p>
      </div>

      <div className='flex flex-wrap items-center justify-center gap-5'>
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
      </div>

    </div>
  )
}
