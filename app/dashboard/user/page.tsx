import React from 'react'
import Sample from '@/public/sample.jpeg'
import Image from 'next/image'

export default function Page() {
  return (
    <div className='px-16 py-10'>
        <div className='flex flex-col gap-y-3 text-xs'>
            <p>
                <span className='text-xl'>Hi this is, </span>
                <span className='text-base'>Manish</span>
            </p>
            <Image src={Sample} alt='user_profile' className='rounded-[50%] size-14 '/>
            <p>Your Intro here.</p>
            <p>Role: Backend</p>

            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <p>msh17679@gmail.com</p>
                </div>
    
                <div className='flex items-center gap-2'>
                    <p>https://github.com/mainshSharma1-dev</p>
                </div>
    
                <div className='flex items-center gap-2'>
                    <p>https://linkedin/in/Manihsh11</p>
                </div>
            </div>

            <div className='py-9 border-t flex flex-col gap-5'>
                <p>Joined At: date</p>
                <p>Team Created: 0</p>
            </div>

        </div>
    </div>
  )
}
