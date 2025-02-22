"use client"
import React from 'react'
import Link from 'next/link'

export default function page() {

  async function handlefindUserData() {
    try {

      const res = await fetch(`/api/fetchuserdetail`)

      if(!res.ok){
        const errText = await res.text()
        console.error(errText);
        return ;
      }
      
      const data = await res.json()

      if(!data){
        console.error(`Failed converting in json`)
      }

      console.log(data)
      
    } catch (error) {
      console.error("Issue Occured :",error)
    }
  }

  return (
      <div>
        <div className='flex flex-col gap-4 justify-center items-center mt-40'>
          <p>No prev team built, Create new team !</p>
          <button className='bg-black text-white px-8 py-1 text-xs rounded'>
            <Link href="/dashboard/createteam">
              create one 
            </Link>
          </button>
          <button onClick={handlefindUserData}>User data</button>
        </div>
      </div>
  )
}
