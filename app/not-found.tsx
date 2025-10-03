'use client'
import { Bell } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import DefaultImage from '@/public/default-user.jpg'
import NotFoundImage from '@/public/noteamcreatedyet.jpg'

export default function NotFound() {
  const router = useRouter()
  return (
    <div>
      <div className="flex justify-between px-3 py-2 items-center border-b border-black">
        <p className={`text-xs xs:hidden xs:invisible font-semibold md:visible md:block  `}>
          <span onClick={() => router.push('/dashboard')}>Buildyourhackathonteam</span>
        </p>
        <div className='flex items-center gap-4'>
            <Image
              src={DefaultImage}
              alt="User Profile"
              width={150}
              height={50}
              priority
              className="rounded-[50%] cursor-pointer max-w-sm max-h-52 size-7"
              onClick={() => router.push('/dashboard/me')}
            />
        </div>
        </div>
        <div >
          <div className='flex flex-col items-center justify-center w-auto bg-gradient-to-b from-neutral-100 min-h-[calc(97vh-2rem)] via-purple-200 to-neutral-100'>
            <Image
              src={NotFoundImage}
              alt='Not Found Page'
              width={300}
              height={500}
              priority
              className='object-contain'
            />
            <p className='font-semibold text-lg'>Invalid Page!</p>
            <p className='cursor-pointer bg-emerald-300 px-6 py-1 mt-5 text-sm rounded-md duration-200 transition-all underline hover:underline-offset-2' onClick={() => router.push('/dashboard')}>Move to dashboard</p>
          </div>
        </div>
    </div>
  )
}
