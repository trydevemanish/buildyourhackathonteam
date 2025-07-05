"use client"
import React, { useEffect, useState } from 'react'

export default function Page() {
  const [data,setData] = useState(false)

  useEffect(() => { 
    async function fetchHacakathonData(){
      try {
        const res = await fetch('/api/scrapewebsite')
    
        if(!res.ok){
          throw new Error('Failed to scrape Website')
        }
    
        const data = await res.json();
    
        console.log('data response message',data.message)
        console.log('data response data',data.data)

      } catch (error) {
        console.error(`Isuue: ${error}`)
      }
    }

    // fetchHacakathonData()
  },[data])

  return (
    <div>
      This page is where new hackathon will be showed after taking data from the devpost..
      <button onClick={() => setData(prev => !prev)}>click</button>
    </div>
  )
}
