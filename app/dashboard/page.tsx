"use client"
import React,{ useEffect, useState } from 'react'
import Teamcard from '@/components/TeamcardForteamleader'
import { TeamCardInfoType } from '@/types/types'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'

export default function Page() {

  const [teamDataFromBackend,setTeamDataFromBackend] = useState([])
  const [loading,setLoading] = useState(false)
  const router = useRouter()
  const { user } = useUser()

  // fetch all teams created by the user (user is a leader)
  useEffect(() => {
    const handlefindUserCreatedTeamData = async() => {
      try {

        setLoading(true)
        
        const res = await fetch('/api/fetchallteamCreatedbyuser',{
          method: 'POST',
          credentials: 'include',
          headers : {
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify({ userId:user?.id })
        })
  
        if(!res.ok){
          const errText = await res.text()
          console.log(errText)
          return;
        }
  
        const data = await res.json()
  
        console.log(data?.message)

        setTeamDataFromBackend(data?.data)
        
      } catch (error) {
        console.error("Issue Occured :",error)
      } finally {
        setLoading(false)
      }
    }
    handlefindUserCreatedTeamData()
  },[user?.id])
  

  return (
    <main>
      {
        loading ? 
        <div className='flex flex-col gap-3 justify-center items-center min-h-[calc(97vh-3rem)]'>
          <p className='opacity-70 text-xs animate-pulse'>Searching Your Previous Team....</p>
        </ div>
        :
        (
          Array.isArray(teamDataFromBackend) && teamDataFromBackend.length > 0 ?
          (
            <section>
              <div className='flex justify-end items-center gap-3 px-3 border py-1'>
                <button className='bg-purple-500 inline text-white px-8 py-[6px] text-xs rounded' onClick={() => router.push("/dashboard/createteam")}>
                  {/* <Link href="/dashboard/createteam"> */}
                    <span>+ create one </span>
                  {/* </Link> */}
                </button>
              </div> 
              <div className='flex gap-5 px-8 py-2 overflow-y-auto scrollbar-hide'>
                {
                  teamDataFromBackend.map((teamdata : TeamCardInfoType, idx : number) => (
                    <Teamcard props={teamdata} key={idx} />
                  ))
                }
              </div>
            </section>
          ) :
          (
            <div className='flex flex-col gap-3 justify-center items-center min-h-[calc(97vh-3rem)]'>
              {/* <Image src={Noteam} alt='noteam' className='w-60 h-40 animate-pulse'/> */}
              <p className=''>No prev team 
                <span className='text-purple-500'> found.</span>
              </p>
              <p className='opacity-70 text-xs'>Create new team to get started !</p>
              <button className="bg-black text-white px-8 py-1 text-xs rounded" onClick={() => router.push("/createteam")}>
                  <p className="flex gap-2">
                    <span>+</span>
                    <span className="text-xs">Create Team</span>
                  </p> 
              </button>
            </ div>
          )
        )
      }
    </main>
  )
}

// {teamDataFromBackend?.length > 0 ? 
//         <section>
//           <div className='flex justify-end items-center gap-3 px-3 border py-1'>
//             <button className='bg-purple-500 inline text-white px-8 py-[6px] text-xs rounded' onClick={() => router.push("/dashboard/createteam")}>
//               {/* <Link href="/dashboard/createteam"> */}
//                 <span>+ create one </span>
//               {/* </Link> */}
//             </button>
//           </div> 
//           <div className='flex gap-5 px-8 py-2 overflow-y-auto scrollbar-hide'>
//             {
//               teamDataFromBackend.map((teamdata : TeamCardInfoType, idx : number) => (
//                 <Teamcard props={teamdata} key={idx} />
//               ))
//             }
//           </div>
//         </section>
//         : 
        // <div className='flex flex-col gap-3 justify-center items-center min-h-[calc(97vh-3rem)]'>
        //   <Image src={Noteam} alt='noteam' className='w-60 h-40 animate-pulse'/>
        //   <p className=''>No prev team 
        //     <span className='text-purple-500'> found.</span>
        //   </p>
        //   <p className='opacity-70 text-xs'>Create new team to get started !</p>
        //   {loading ? (
        //     <div className="bg-black p-2 flex justify-center px-10 rounded ">
        //       <LoaderIcon className="size-4 animate-spin stroke-white fill-white" />
        //     </div>
        //   ) : (
        //     <button className="bg-black text-white px-8 py-1 text-xs rounded" onClick={() => router.push("/dashboard/createteam")}>
        //       {/* <Link href="/dashboard/createteam"> */}
        //         <p className="flex gap-2">
        //           <span>+</span>
        //           <span className="text-xs">Create Team</span>
        //         </p> 
        //       {/* </Link>  */}
        //     </button>
        //    )} 
        // </ div>
//        }


// dayegen507@mobilesm.com