"use client"
import React, { useEffect, useState } from 'react'
import ProfileCard from '@/components/ProfileCard'
import { Search,User,IdCardIcon } from 'lucide-react'

export default function Page() {
  const [fetchdevdata,setfetchdevdata] = useState([])
  const [showInUserTableType,setShowInUserTableType] = useState(true)

  useEffect(() => {
    const FetchdeveloperData = async() => {
      try {

        const res = await fetch('/api')

        if(!res.ok){
          const errtext = await res.text()
          console.log(errtext)
          return;
        }

        const data = await res.json()
        console.log(data?.message)

        setfetchdevdata(data)
        
      } catch (error) {
         console.log(`failed: ${error}`)
      }
    }
  })

  return (
    <div>
      <div className='flex justify-between items-center px-3 py-1 border'>
        <div className='text-base flex items-center gap-3'>
          <section>
            <p className='text-xs font-semibold opacity-55'>Connect with other devs.</p>
            <p className='text-xs opacity-40'>invite them to your hackathon team.</p>
          </section>
          <section className='flex items-center gap-1 border rounded px-3 py-1 '>
            <User className='size-5 border-r px-1 hover:bg-neutral-200 rounded' onClick={() => setShowInUserTableType(true)} />
            <IdCardIcon className='size-5 px-1 hover:bg-neutral-200 rounded' onClick={() => setShowInUserTableType(false)}/>
          </section>
        </div>
        <div className='flex items-center'>
          <input type='text' placeholder='Search by role/name' className='text-xs w-56 px-3 border-b py-1 focus:outline-none' />
          <Search className='size-6 rounded hover:bg-neutral-200 p-1 cursor-pointer' />
        </div>
      </div>

      {showInUserTableType ? 
        <div>
          <div className='grid grid-cols-5 py-2 text-sm overflow-y-auto scrollbar-hide max-h[calc(96vh-2rem)]'>
            <p className='col-start-1 col-end-2 text-center'>Serial</p>
            <p className='col-start-2 col-end-3 text-center'>Username</p>
            <p className='col-start-3 col-end-4 text-center'>Email</p>
            <p className='col-start-4 col-end-5 text-center'>Role</p>
            <p className='col-start-5 col-end-6 text-center'>Message</p>
          </div>

          {fetchdevdata.length > 0 ? 
            <div className='grid grid-cols-5 py-1'>
              <p className='col-start-1 col-end-2 text-center opacity-70 text-xs'>1</p>
              <p className='col-start-2 col-end-3 text-center opacity-70 text-xs'>Manish</p>
              <p className='col-start-3 col-end-4 text-center opacity-70 text-xs'>msh17679@gmail.com</p>
              <p className='col-start-4 col-end-5 text-center opacity-70 text-xs'>backend</p>
              <div className='col-start-5 col-end-6 flex justify-center cursor-pointer'>
                <p className='bg-black text-white px-8 py-1 rounded text-xs'>invite</p>
              </div>
          </div> : 
          <div className='flex justify-center items-center h-[calc(95vh-8rem)]'>
            <section>
              <p className='opacity-80'>No Data found.</p>
              <p className='opacity-80 text-center text-sm '>Try again !</p>
            </section>
          </div>
          } 
        </div> 
        : //on flase show in profile card
        <div className='flex flex-wrap items-center justify-center gap-5 py-3'>
          {fetchdevdata.length > 0 ? 
            <div>
              <ProfileCard />
            </div> : 
            <div className='flex justify-center items-center h-[calc(95vh-8rem)]'>
            <section>
              <p className='opacity-80'>No Data found.</p>
              <p className='opacity-80 text-center text-sm '>Try again !</p>
            </section>
          </div>
          }
        </div>
      }

    </div>
  )
}



