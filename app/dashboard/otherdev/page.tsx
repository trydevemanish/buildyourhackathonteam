"use client"
import React, { useEffect, useState } from 'react'
import ProfileCard from '@/components/ProfileCard'
import { Search,User,IdCardIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { UserData } from '@/types/types'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Page() {
  const [fetchdevdata,setfetchdevdata] = useState([])
  const [showInUserTableType,setShowInUserTableType] = useState(true)
  const [value,setvalue] = useState('')

  const router = useRouter()

  // fetch All User data ( will be adding the paging options after learning it )
  useEffect(() => {
    const FetchdeveloperData = async() => {
      try {

        const res = await fetch('/api/findallusers')
 
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
      }
    }
    FetchdeveloperData()
  },[])

  const handleSearchRoute = async(e: React.ChangeEvent<HTMLInputElement>) => {
      setvalue(e.target.value)

      const interval = setInterval(async() => {
        try {

          const res = await fetch(`/api/finduserbyname`,{
            method : 'GET',
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
          
        } catch (error) {
          console.log(`Issue Ocuured while searching Users: ${error}`)
        }
      }, 3000);

      clearInterval(interval)
  }


  const findUserWithTheirRole = async(value:'Helper' | 'ML_eng' | 'Frontend_dev' | 'Backend_dev' | 'Design') => {
    try {

      const res = await fetch(`/api/findUserbyrole`,{
        method : 'GET',
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
      
    } catch (error) {
      console.log(`Issue Occured while finding Users with their role: ${error}`)
    }
  }



  return (
    <div>
      <div className='flex justify-between items-center px-3 py-1 border'>
        <div className='text-base flex items-center gap-3'>
          <section>
            <p className='text-xs font-semibold opacity-55'>Connect with other devs.</p>
            <p className='text-xs opacity-40'>invite them to your hackathon team.</p>
          </section>
          <section className='flex items-center gap-1 border rounded px-3 py-1 '>
            <User className='size-5  border-r px-1 hover:bg-neutral-200 rounded' onClick={() => setShowInUserTableType(true)} />
            <IdCardIcon className='size-5 px-1 hover:bg-neutral-200 rounded' onClick={() => setShowInUserTableType(false)}/>
            </section>
              </div>
              <div className='flex items-center border-b'>
                <Select onValueChange={findUserWithTheirRole}>
                  <SelectTrigger className="w-[100px] h-7 text-xs shadow-none border-none focus:outline-white outline-white">
                    <SelectValue placeholder="Select role" />
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
                <input type='text' placeholder='Search by role/name' className='text-xs w-56 px-3 py-1 focus:outline-none' value={value} onChange={handleSearchRoute} />
                {/* <Search className='size-6 rounded hover:bg-neutral-200 p-1 cursor-pointer'  /> */}
              </div>
      </div>

      {showInUserTableType ? 
        <div>
          <div className='grid grid-cols-5 py-2 text-sm overflow-y-auto scrollbar-hide max-h[calc(96vh-2rem)] border-b'>
            <p className='col-start-1 col-end-2 text-center'>Serial</p>
            <p className='col-start-2 col-end-3 text-center'>Name</p>
            <p className='col-start-3 col-end-4 text-center'>Email</p>
            <p className='col-start-4 col-end-5 text-center'>Role</p>
            <p className='col-start-5 col-end-6 text-center'>Message</p>
          </div>

          {fetchdevdata.length > 0 ? 
            <div>
              {
                fetchdevdata.map((data : UserData,idx : number) => (
                  <div className='grid grid-cols-5 items-center py-2 border-b cursor-pointer' key={data?.id || idx} onClick={() => router.push(`/dashboard/user/u/${data?.id}`)}>
                    <p className='col-start-1 col-end-2 text-center opacity-70 text-xs'>{idx + 1}</p>
                    <p className='col-start-2 col-end-3 text-center opacity-70 text-xs'>{data?.name}</p>
                    <p className='col-start-3 col-end-4 text-center opacity-70 text-xs'>{data?.email}</p>
                    <p className='col-start-4 col-end-5 text-center opacity-70 text-xs'>{data?.role}</p>
                    <div className='col-start-5 col-end-6 flex justify-center cursor-pointer'>
                      <p className='bg-black text-white px-8 py-1 rounded text-[9px]'>invite</p>
                    </div>
                  </div>
                ))
              }
            </div>
            : 
            <div className='flex justify-center items-center h-[calc(95vh-8rem)]'>
              <section>
                <p className='opacity-80'>No Data found.</p>
                <p className='opacity-80 text-center text-sm '>Try again !</p>
              </section>
            </div>
          } 
        </div> 
        : //on flase show in profile card
        <div>
          {fetchdevdata.length > 0 ? 
            <div className='flex flex-wrap items-center justify-center gap-5 py-3'>
              {fetchdevdata.map((data:UserData,idx:number) => (
                <ProfileCard props={data} key={idx} />
              ))}
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



