"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { UserData } from '@/types/types'
import { useUser } from '@clerk/nextjs'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import toast from 'react-hot-toast'

export default function Page() {
  const [value,setvalue] = useState('')
  const [loading,setloading] = useState(false)
  const [fetchdevdata,setfetchdevdata] = useState([])
  // const [showInUserTableType,setShowInUserTableType] = useState(true)

  const router = useRouter()
  const { user} = useUser()

  // fetch All User data ( will be adding the paging options after learning it )
  useEffect(() => {
    const FetchdeveloperData = async() => {
      try {

        setloading(true)

        console.log('loading is tru')

        const res = await fetch('/api/findallusers',{
          method: 'GET',
          credentials: 'include',
        })
 
        if(!res.ok){
          const errtext = await res.text()
          console.log(errtext)
          return;
        }

        const data = await res.json()
        console.log(data?.message)

        setfetchdevdata(data?.data)
        
      } catch (error) {
         console.log(`failed: ${error}`)
      } finally {
        setloading(false)
      }
    }

    FetchdeveloperData()
  },[])

  const handleSearchRoute = async(e: React.ChangeEvent<HTMLInputElement>) => {
      setvalue(e.target.value)

      const interval = setInterval(async() => {
        try {

          toast.loading('fetching user')

          const res = await fetch(`/api/finduserbyname`,{
            method : 'GET',
            credentials : 'include',
            headers : {
              'Content-Type':'application/json'
            },
            body:JSON.stringify({ text : e.target.value })
          })
    
          if(!res.ok){
            console.log(await res.text())
            return;
          }
    
          const data = await res.json()
          
          console.log(data?.message)
    
          setfetchdevdata(data?.data)
          
          toast.success('fetched user.')

        } catch (error) {
          console.log(`Issue Ocuured while searching Users: ${error}`)
        }
      }, 3000);

      clearInterval(interval)
  }

  const findUserWithTheirRole = async(value:'Helper' | 'ML_eng' | 'Frontend_dev' | 'Backend_dev' | 'Design') => {
    try {

      toast.loading('fetching user with role.')

      const res = await fetch(`/api/findUserbyrole`,{
        method : 'GET',
        credentials:'include',
        headers : {
          'Content-Type':'application/json'
        },
        body:JSON.stringify({ role:value })
      })

      if(!res.ok){
        console.log(await res.text())
        return;
      }

      const data = await res.json()

      console.log(data?.message)

      setfetchdevdata(data?.data)

      toast.success('Fetched.')
      
    } catch (error) {
      console.log(`Issue Occured while finding Users with their role: ${error}`)
    }
  }

 
  return (
    <div>
      <div className='flex justify-between items-center px-3 py-1 border'>
        <div className='text-base flex items-center gap-3'>
          <section >
            <p className='text-xs font-opensans'>Connect with other devs & Invite them.</p>
          </section>
        </div>
        <div className='flex items-center border-b'>
          <Select onValueChange={findUserWithTheirRole}>
            <SelectTrigger className="w-[100px] h-7 text-xs shadow-none border-none focus:outline-white outline-white">
              <SelectValue className='font-mono font-bold' placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className='text-[9px]'>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="Helper">Helper</SelectItem>
                <SelectItem value="ML_eng">ML_eng</SelectItem>
                <SelectItem value="Frontend_dev">Frontend_dev</SelectItem>
                <SelectItem value="Backend_dev">Backend_dev</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <input type='text' placeholder='Search by role/name' className='text-xs w-56 px-3 py-1 rounded bg-[#e7e7e7] focus:outline-none border-black border' value={value} onChange={handleSearchRoute} />
          {/* <Search className='size-6 rounded hover:bg-neutral-200 p-1 cursor-pointer'  /> */}
        </div>
      </div>

      <div className="overflow-y-auto scrollbar-hide max-h[calc(96vh-2rem)]">
        <div className="overflow-x-auto scrollbar-hide w-full ">
          <div className='grid grid-cols-5 py-2 text-sm  min-w-[600px] overflow-y-auto scrollbar-hide max-h[calc(96vh-2rem)] border-b'>
              <p className='col-start-1 col-end-2 text-center whitespace-nowrap'>Serial</p>
              <p className='col-start-2 col-end-3 text-center whitespace-nowrap'>Name</p>
              <p className='col-start-3 col-end-4 text-center whitespace-nowrap'>Email</p>
              <p className='col-start-4 col-end-5 text-center whitespace-nowrap'>Role</p>
              <p className='col-start-5 col-end-6 text-center whitespace-nowrap'>Message</p>
          </div>
        </div>

        {
          loading ? 
          <div className='flex flex-col gap-3 justify-center items-center min-h-[calc(96vh-3rem)]'>
            <p className='opacity-70 text-xs text-black animate-pulse'>Fetching developers....</p>
          </ div>
          : 
          (
            Array.isArray(fetchdevdata) && fetchdevdata.length > 0 ? 
            (
              fetchdevdata.map((data : UserData,idx : number) => (
              <div className="overflow-x-auto scrollbar-hide w-full" key={data?.id || idx}>
                {user?.id != data?.id && 
                  <div className='grid grid-cols-5 items-center py-2  min-w-[600px]  border-b'>
                    <p className='col-start-1 col-end-2 text-center opacity-70 text-xs whitespace-nowrap'>{idx + 1}</p>
                    <p className='col-start-2 col-end-3 text-center opacity-70 text-xs whitespace-nowrap'>{data?.name}</p>
                    <p className='col-start-3 col-end-4 text-center opacity-70 text-xs whitespace-nowrap'>{data?.email}</p>
                    <p className='col-start-4 col-end-5 text-center opacity-70 text-xs whitespace-nowrap'>{data?.role}</p>
                    <div className='col-start-5 col-end-6 flex justify-center cursor-pointer' onClick={() => router.push(`/dashboard/user/u/${data?.id}`)}>
                      <p className='bg-purple-600 text-white px-8 py-1 rounded text-xs whitespace-nowrap'>view detail</p>
                    </div>
                  </div>
                }
              </div> 
              ))
            ) : 
            (
              <div className='flex justify-center items-center h-[calc(95vh-8rem)]'>
                <section className='flex flex-col gap-3 justify-center items-center min-h-[calc(96vh-14rem)]'>
                {/* <Image src={NoteamcreatedYet} alt='noteam' className='w-60 h-40 animate-pulse'/> */}
                  <p className='opacity-80'>No Data found.</p>
                  <p className='opacity-80 text-center text-sm '>Try again later !</p>
                </section>
              </div>
            )
          )
        }
      </div>
    </div>
  )
}



