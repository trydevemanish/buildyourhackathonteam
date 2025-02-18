import React from 'react'
import Image from 'next/image'
import sample from "@/public/sample.jpeg"

export default function page() {
  return (
    <div className='px-8 py-4'>
      <p className='text-lg text-center'>Welcome to team: cortex.</p>
      <p className='text-[12px] opacity-65 text-center'>by: Dev kumar ( leader ).</p>

      <div className='flex flex-col gap-7 px-16 py-9'>
        <div className='flex flex-col gap-1'>
          <p className='text-sm'>Project name : </p>
          <p className='opacity-80 text-[12px]'> Building Ai agents for hotel room allotment.</p>
        </div>

        <div className='flex flex-col gap-1'>
          <p className='text-sm'>Project desc : </p>
          <p className='opacity-80 text-[12px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, quam mollitia. Illo vero id tempore laboriosam qui cupiditate laborum hic soluta quos debitis, eveniet veniam voluptatibus reprehenderit quae. Ea, consectetur!.</p>
        </div>

        <div className='flex flex-col gap-1'>
          <p className='text-sm'>Hackathon Name : </p>
          <p className='opacity-80 text-[12px]'>krishtix hackfest 2025</p>
        </div>

        <div className='flex flex-col gap-1'>
          <p className='text-sm'>Hackathon desc : </p>
          <p className='opacity-80 text-[12px]'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora consequatur aut aperiam, odit nobis similique veritatis quod assumenda aspernatur! Officiis quidem commodi distinctio repellendus. Atque enim distinctio recusandae maiores adipisci.</p>
        </div>

        <div className='flex flex-col gap-1'>
          <p className='text-sm'>Hackathon link : </p>
          <p className='opacity-80 text-[12px] cursor-pointer'>https://devpost/hackathon?id=322</p>
        </div>

        <div className='flex flex-col gap-1'>
          <p className='text-sm pb-1'>Team Members : </p>
            <Image src={sample} alt='profile' className='rounded-[50%] size-6'/>
        </div>

        <div>
          <button className='bg-black text-white text-xs px-9 py-1 rounded'>send a request !</button>
        </div>

      </div>
    </div>
  )
}