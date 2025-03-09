"use client"
import React, { useEffect, useState } from "react"
import Teamcard from "@/components/Teamcard"
import { TeamCardInfoType } from "@/types/types"


export default function Page() {
  const [eveyteamdata,setEveryTeamData] = useState([])

  useEffect(() => {
    const fetchEveyTeam = async() => {
      const res = await fetch('/api/fetcheveryteam')

      if(!res.ok){
        const errtext = await res.text()
        console.log(errtext)
        return ;
      }

      const data = await res.json()

      console.log(data?.message)

      setEveryTeamData(data?.data)
    }
    fetchEveyTeam()
  },[])


  return (
    <main className="overflow-y-auto scrollbar-hide h-auto max-h-[calc(97vh-1rem)]">
        <div className="flex justify-center flex-col items-center py-6">
            <p className="text-sm">Other Hackathon teams people are bulding.</p>
            <p className="text-[11px] opacity-65">Send a request to leader to join a team.</p>
        </div>

        <section className="overflow-y-auto scrollbar-hide">
            {
              eveyteamdata.length > 0 ? 
              <div className="flex flex-wrap gap-5 px-8 py-2">
                {eveyteamdata.map((teamdata : TeamCardInfoType, idx : number) => (
                  <Teamcard props={teamdata} key={idx}/>
                ))}
              </div>
              : 
              <div className='flex flex-col gap-1 justify-center items-center mt-40'>
                <p className='font-semibold'>No team found</p>
                <p className='opacity-70 text-sm'>Comeback later!</p>
              </ div>
            }
        </section>

    </main>
  )
}
