import React from 'react'
import Coding from "@/public/coding.png"
import Image from 'next/image' 
import { GitHubLogoIcon,TwitterLogoIcon,LinkedInLogoIcon,CodeSandboxLogoIcon } from '@radix-ui/react-icons' 


export default function Footer() {
  return (
    <section className='xs:px-10 md:px-36 py-10'>
      <div className='xs:flex xs:flex-col xs:gap-10  md:grid md:grid-cols-2'>

        <div className=' md:col-start-1 md:col-end-2 xs:flex xs:items-center xs:flex-col xs:gap-3'>
          <div className='flex items-center gap-2'>
            <Image src={Coding} alt='logo' className='size-5' />
            <p className={`font-semibold text-xs `}>Buildyourhackathonteam</p>
          </div>
          <div className='py-5 flex gap-4 '>
            <GitHubLogoIcon className='size-3' />
            <LinkedInLogoIcon className='size-3' />
            <TwitterLogoIcon className='size-3' />
          </div>
        </div>
        <div className='col-start-2 col-end-3 flex justify-center items-center flex-col gap-6'>
            <div className='flex items-center justify-center gap-2'>
                <CodeSandboxLogoIcon className='size-3' />
                <p>Hackathons are better with the right team.</p>
            </div>
            <button className='bg-purple-500 px-8 py-2 text-xs rounded text-white'>Get started.</button>
        </div>
      </div> 
    </section>
  )
}
