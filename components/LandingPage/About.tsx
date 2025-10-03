import React from 'react'
import Image from 'next/image'
import teams from '@/public/teams.jpg'
import Otherdev from '@/public/slide3.jpg'
import { Users,InspectIcon } from 'lucide-react'
import { PersonIcon,CodeIcon,ComponentInstanceIcon,CodeSandboxLogoIcon } from '@radix-ui/react-icons'

export default function About() {
  return (
    <section className='py-10 xs:px-4 md:px-36'>

      <div className='py-8 flex flex-col gap-10'>

        <div className='xs:flex xs:flex-col md:grid md:grid-cols-2 gap-10 py-4'>
          <div className='col-start-1 col-end-2 py-10 px-10'> 
            <h1 className='text-3xl font-opensans font-bold'>
              <span>Finding the right team with</span> 
              <span className='text-purple-500'> ease!</span>
            </h1>
            <div className='text-sm opacity-70 flex flex-col gap-3 py-12 px-8'>
              <p className='flex gap-3 items-center'>
                <span><PersonIcon className='size-8 bg-purple-200 p-2 rounded '/></span>
                <span>Hard to find people with similar interests/skills.</span>
              </p>
              <p className='flex gap-3 items-center'>
                <span><CodeIcon className='size-8 bg-purple-200 p-2 rounded '/></span>
                <span>Join Impresive Hackathon teams.</span>
              </p>
              <p className='flex gap-3 items-center'>
                <span><ComponentInstanceIcon className='size-8 bg-purple-200 p-2 rounded '/></span>
                <span>Callaborate with others.</span>
              </p>
            </div>
          </div>
          <div className="flex justify-center xs:px-8 col-start-2 col-end-3 md:px-0 md:justify-start">
            <Image 
              src={teams} 
              alt='teams' 
              className='border w-auto md:h-auto rounded-l-[2.5rem] rounded-t-[2.5rem] hover:bg-gradient-to-b  hover:from-white hover:to-black'
              width={500}
              height={400}
              priority
            />
          </div>
        </div>

        <div className='xs:flex xs:flex-col md:grid md:grid-cols-2 gap-16 py-4'>
        <div className="flex justify-center xs:px-8 col-start-1 col-end-2 md:px-0 md:justify-start">
          <Image 
            src={Otherdev} 
            alt='otherdev' 
            className='border rounded-r-[2.5rem] rounded-t-[2.5rem]'
            width={500}
            height={400}
            priority
          />
        </div>
          <div className='col-start-2 col-end-3 py-10 px-10'>
            <h1 className='text-2xl font-opensans font-bold'>
              <span>Connect with </span> 
              <span className='text-purple-500'> like-minded people </span>
            </h1>
            <div className='text-sm opacity-70 flex flex-col gap-3 py-12 px-8'>
              <p className='flex gap-3 items-center'>
                  <span><Users className='size-8 bg-purple-200 p-2 rounded '/></span>
                  <span>without awkward face-to-face interactions.</span>
              </p>
              <p className='flex gap-3 items-center'>
                  <span><InspectIcon className='size-8 bg-purple-200 p-2 rounded '/></span>
                  <span>Invite them to join your team.</span>
              </p>
              <p className='flex gap-3 items-center'>
                  <span><CodeSandboxLogoIcon className='size-8 bg-purple-200 p-2 rounded '/></span>
                  <span>Create Your Own team.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


