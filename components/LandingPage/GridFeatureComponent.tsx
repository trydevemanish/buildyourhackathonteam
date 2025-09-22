import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Confused from '@/public/Confused.png'
import CurvedArrow from '@/public/curved.png'
import WinnerTeam from '@/public/Winnerteam.png'
import { UserRoundCheckIcon,Wand2Icon,TreeDeciduous } from 'lucide-react'

const paraObject = [
    {
        Elementname : <UserRoundCheckIcon className='bg-purple-600 p-2 text-white rounded size-8' />,
        para: "Don’t let team-hunting slow you down. Join, create, and innovate!"
    },
    {
        Elementname : <Wand2Icon className='bg-purple-600 p-2 text-white rounded size-8' />,
        para:"Find the right teammates, collaborate effortlessly, and build fast."
    },
    {
        Elementname : <TreeDeciduous className='bg-purple-600 p-2 text-white rounded size-8' />,
        para:"Your hackathon journey starts here."
    }
]

interface paraObjectType {
    Elementname : React.ReactElement,
    para: string,
}

export default function GridFeatureComponent() {
  return (
    <main className='py-28 xs:px-12 md:px-32'>
        <div className=' xs:flex xs:flex-col xs:gap-12 md:grid md:grid-cols-2 md:gap-14'>
            {/* Image part her  */}


            <div className="col-start-1 col-end-2 py-4 overflow-hidden">
                <div className='grid grid-cols-2 grid-rows-2 gap-4 py-10'>
                    {/* first quadrant  */}
                    <div className='col-start-1 col-end-2 row-start-1 row-end-2'>
                        <Image 
                        src={CurvedArrow} 
                        alt='curved arrow' 
                        width={400}
                        height={300}
                        priority
                        className='rounded object-contain' />
                    </div>
                    {/* 2nd quadrant  */}
                    <div className='col-start-2 col-end-3 row-start-1 row-end-2'>
                        <Image 
                        src={WinnerTeam} 
                        alt='WinnerTeam' 
                        width={400}
                        height={300}
                        priority
                        className='min-w-80 rounded-md object-cover' />
                    </div>
                    {/* 3rd quadrant  */}
                    <div className='col-start-1 col-end-2 row-start-2 row-end-3'>
                        <Image 
                        src={Confused} alt='confused' 
                        width={400}
                        height={300}
                        priority
                        className='rounded min-w-80 object-cover' />
                    </div>
                    {/* 4rth quadrant  */}
                    <div className='col-start-2 col-end-3 row-start-2 row-end-3'></div>
                </div>
            </div>


            {/* this one is for the text part  */}
            <div className='col-start-2 col-end-3'>
                <section className='flex flex-col gap-8'>
                    <h1 className='text-4xl leading-normal font-bold'>Elevate Your Hackathon journey now.</h1>
                    <p className='leading-relaxed text-base'>Find your team, build amazing projects, and make hackathons effortless!</p>
                    <div className='flex flex-col gap-4 py-2' >
                        {paraObject.map((data : paraObjectType ,idx : number) => (
                            <div className='flex gap-4' key={idx}>
                                {data?.Elementname}
                                <p>{data?.para}</p>
                            </div>
                        ))}
                    </div>
                    <Link className='bg-purple-600 px-6 text-center max-w-xs rounded-sm' href='/dashboard'><button className='bg-purple-600 text-white px-6 py-2 rounded'>Start here !</button></Link>
                </section>
            </div>
        </div>
    </main>
  )
}
