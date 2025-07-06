"use client"
import React, { useEffect, useState } from 'react'

export default function Page() {
  // const [data,setData] = useState(false)
  const [click,setClick] = useState(false)

  useEffect(() => { 
    // async function fetchHacakathonData(){
    //   try { 
    //     const res = await fetch('/api/scrapewebsite')
    
    //     if(!res.ok){
    //       throw new Error('Failed to scrape Website')
    //     }
    
    //     const data = await res.json();
    
    //     console.log('data response message',data.message)
    //     console.log('data response data',data.data)

    //   } catch (error) {
    //     console.error(`Isuue: ${error}`)
    //   } 
    // } 

    // fetchHacakathonData()

    console.log('ok')
  },[click])

  return (
    <div className='px-6 py-4'>
      <p className='text-center font-opensans text-lg' onClick={() => setClick(prev => !prev)}>This page will show the upcoming hakathon.</p>
    </div>
  )
}
