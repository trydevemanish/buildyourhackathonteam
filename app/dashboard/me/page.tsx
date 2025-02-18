import React from 'react'
import Image from 'next/image'
import sample from "@/public/sample.jpeg"

export default function page() {
  return (
    <main className='px-16 py-10'>
        <p className='text-center text-lg pb-8 items-center'>User Profile :</p>
        <div className='grid grid-cols-8'>
            <div className='col-start-1 col-end-3'>
                <Image src={sample} alt='user_profile' className='rounded-[50%] size-44 '/>
            </div>
            <div className='col-start-3 col-end-9'>
                <p>Manish</p>
                <p>role: Backend dev</p>
                <p>joined</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum consequuntur, quae nam mollitia natus debitis laboriosam illum, obcaecati dicta molestias quis facilis accusamus ut quod nihil modi enim. Provident, eum.</p>
                <p>github: </p>
            </div>
        </div>
    </main>
  )
}
