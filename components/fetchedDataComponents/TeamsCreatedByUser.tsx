'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { TeamCardInfoType } from '@/types/types'
import { useFetchData } from '@/hook/useFetchData'
import Teamcard from '@/components/TeamcardForteamleader'

export default function TeamsCreatedByUser() {
    const router = useRouter()
    const { data : teamDataFromBackend,errors : TeamCreatedByUserErrors,loading } = useFetchData<TeamCardInfoType[]>({ url:'/api/fetchallteamCreatedbyuser' })
    const { errors: userExitsError } = useFetchData({ url:'/api/findandcreateUser'})

    if(userExitsError){
        console.log(`Error checking user exits: ${userExitsError}`)
    }

    if(TeamCreatedByUserErrors){
        console.log('TeamCreatedByUserErrors: ',TeamCreatedByUserErrors)
    }

    if(loading){
        return (
            <div className='flex flex-col gap-3 justify-center items-center min-h-[calc(97vh-3rem)]'>
                <p className='opacity-70 text-xs animate-pulse'>Searching Your Previous Team....</p>
            </div>
        )
    }


    if(!teamDataFromBackend || teamDataFromBackend.length <= 0){
        return (
            <div className='flex flex-col gap-3 justify-center items-center min-h-[calc(97vh-3rem)]'>
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
    }

  return (
    <section>
        {
            teamDataFromBackend && teamDataFromBackend.length > 0 && 
            <div className='flex justify-end items-center gap-3 px-3 border py-1'>
                <button className='bg-purple-500 inline text-white px-8 py-[6px] text-xs rounded' onClick={() => router.push("/createteam")}>
                    <span>+ create one </span>
                </button>
            </div> 
        }
        <div className='flex gap-5 px-8 py-2 overflow-y-auto scrollbar-hide'>
            {
                teamDataFromBackend.map((teamdata : TeamCardInfoType, idx : number) => (
                    <Teamcard props={teamdata} key={idx} />
                ))
            }
        </div>
    </section>
  )
}

    // <div>
    //   {
    //     loading ? 
    //     <div className='flex flex-col gap-3 justify-center items-center min-h-[calc(97vh-3rem)]'>
    //         <p className='opacity-70 text-xs animate-pulse'>Searching Your Previous Team....</p>
    //     </div>
    //         :
    //         (
    //         Array.isArray(teamDataFromBackend) && teamDataFromBackend.length > 0 ?
    //             (
    //                 <section>
    //                 <div className='flex justify-end items-center gap-3 px-3 border py-1'>
    //                     <button className='bg-purple-500 inline text-white px-8 py-[6px] text-xs rounded' onClick={() => router.push("/dashboard/createteam")}>
    //                     {/* <Link href="/dashboard/createteam"> */}
    //                         <span>+ create one </span>
    //                     {/* </Link> */}
    //                     </button>
    //                 </div> 
    //                 <div className='flex gap-5 px-8 py-2 overflow-y-auto scrollbar-hide'>
    //                     {
    //                     teamDataFromBackend.map((teamdata : TeamCardInfoType, idx : number) => (
    //                         <Teamcard props={teamdata} key={idx} />
    //                     ))
    //                     }
    //                 </div>
    //                 </section>
    //             ) :
    //             (
    //                 <div className='flex flex-col gap-3 justify-center items-center min-h-[calc(97vh-3rem)]'>
    //                 <p className=''>No prev team 
    //                     <span className='text-purple-500'> found.</span>
    //                 </p>
    //                 <p className='opacity-70 text-xs'>Create new team to get started !</p>
    //                 <button className="bg-black text-white px-8 py-1 text-xs rounded" onClick={() => router.push("/createteam")}>
    //                     <p className="flex gap-2">
    //                         <span>+</span>
    //                         <span className="text-xs">Create Team</span>
    //                     </p> 
    //                 </button>
    //                 </ div>
    //             )
    //         )
    //     }
    // </div>