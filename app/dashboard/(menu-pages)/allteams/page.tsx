"use client"
import React, { useEffect, useState } from "react"
import Teamcard from "@/components/Teamcard"
import { TeamCardInfoType } from "@/types/types"
import { useRouter } from "next/navigation"

export default function Page() {
  const [eveyteamdata,setEveryTeamData] = useState([])
  const [loading,setloading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchEveyTeam = async() => {
     try {
        setloading(true)
        const res = await fetch('/api/fetcheveryteam',{
          method: 'GET',
          credentials: 'include',
        })
  
        if(!res.ok){
          const errtext = await res.text()
          console.log(errtext)
          return ;
        }
  
        const data = await res.json()
  
        console.log(data?.message)
  
        setEveryTeamData(data?.data)
      } catch (error) {
        console.error(`failed to fetch everyteam : ${error}`)
      } finally {
        setloading(false)
      }
    }
    fetchEveyTeam()
  },[])

  return (
    <main className="overflow-y-auto scrollbar-hide h-auto max-h-[calc(97vh-1rem)]">
        <div className="flex justify-center gap-2 flex-col items-center py-4 border">
            <p className="text-base">Other Hackathon teams people are bulding.</p>
            <p className="text-[11px] opacity-65">Send a request to 
              <span className="text-purple-500"> leader to join a team.</span>
            </p>
        </div>

        <section className="overflow-y-auto scrollbar-hide py-2">
            {
              loading ? 
              <div className='flex flex-col gap-3 justify-center items-center min-h-[calc(95vh-3rem)]'>
                <p className='opacity-70 text-xs animate-pulse'>Wait fetching others teams...</p>
              </div> : 
              (
                Array.isArray(eveyteamdata) && eveyteamdata.length > 0 ?
                <div className="flex flex-wrap gap-5 px-8 py-2">
                  {eveyteamdata.map((teamdata : TeamCardInfoType, idx : number) => (
                    <Teamcard props={teamdata} key={idx}/>
                  ))}
                </div> 
                :
                (
                  <div className='flex flex-col gap-3 justify-center items-center min-h-[calc(96vh-14rem)]'>
                    {/* <Image src={NoteamcreatedYet} alt='noteam' className='w-60 h-40 animate-pulse'/> */}
                    <p className='text-base'>No team has been Created Yet, Why {"don't"} you start this revolution.</p>
                    <p className=' text-xs bg-purple-300 text-black font-opensans cursor-pointer px-4 py-1 rounded-md' onClick={() => router.push('/createteam')}>Create your first team</p>
                  </ div>
                )
              )
            }
        </section>

    </main>
  )
}

// {
//               eveyteamdata.length > 0 ? 
              // <div className="flex flex-wrap gap-5 px-8 py-2">
              //   {eveyteamdata.map((teamdata : TeamCardInfoType, idx : number) => (
              //     <Teamcard props={teamdata} key={idx}/>
              //   ))}
              // </div>
//               : 
              // <div className='flex flex-col gap-3 justify-center items-center min-h-[calc(96vh-14rem)]'>
              //   <Image src={NoteamcreatedYet} alt='noteam' className='w-60 h-40 animate-pulse'/>
              //   <p className='text-base'>No team found yet.</p>
              //   <p className='opacity-70 text-xs'>Comeback later!</p>
              // </ div>
//             }
