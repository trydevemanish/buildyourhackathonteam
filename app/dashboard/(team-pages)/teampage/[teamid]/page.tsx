"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Skeleton } from '@/components/ui/skeleton'
import { useUser } from '@clerk/nextjs'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { useRouter } from 'next/navigation'
import { teamCreatedAttributeNamenType } from '@/types/types'
import LoadingComponent from '@/components/LoadingComponent'

type TeamMemberInfo = {
    id:string,
    userId: string,
    joinedAt :string,
    user : {
        email:string,
        name:string,
        role:string,
    }
    team : {
        leaderid : string
    }
}

const teamCreatedAttributeNamen = [
  {
    attribute : 'Serial',
    className : 'col-start-1 col-end-2 text-center'
  },
  {
    attribute : 'Name',
    className : 'col-start-2 col-end-3 text-center'
  },
  {
    attribute : 'Email',
    className:'col-start-3 col-end-4 text-center'
  },
  {
    attribute : 'Role',
    className:'col-start-4 col-end-5 text-center'
  },
  {
    attribute : 'Joined At',
    className:'col-start-5 col-end-6 text-center'
  },
]

// this page is dedicated to find the members of the team not an actual team page
export default function Page() {
    const [fetchdevdata,setfetchdevdata] = useState([])
    const [loading,setloading] = useState(false)
    const {teamid} = useParams()
    const { user } = useUser()
    const router = useRouter()


    useEffect(() => {
        const findUserInATeam =async() => {
            try {
                
                setloading(true)

                const res  = await fetch(`/api/fetchteammembers/${teamid}`)

                if(!res.ok){
                    console.log(await res.text())
                    toast.error(await res.text())
                    return;
                }

                const data = await res.json()

                console.log(data?.message)

                setfetchdevdata(data?.data)

            } catch (error) {
                console.log(`Issue occured while fetching user : ${error}`)
            } finally { 
                setloading(false)
            }
        }
        findUserInATeam()
    },[teamid])


    async function removeMemberfromTeam(teammemberid:string,useridToberemoved:string){
        try {

            const res = await fetch(`/api/removeMemberfromteam/${teamid}/${teammemberid}`,{
                method  : 'DELETE',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({ useridToberemoved:useridToberemoved })
            })

            if(!res.ok){
                console.log(await res.text())
                toast.error(await res.text())
                return ;
            }

            const data  = await res.json()
            toast.success(data?.message)
            
        } catch (error) {
           console.log(`Issue Occured while removing memeber form team: ${error}`)   
        }
    }

    async function leaveTeam(teammemberid:string) {
        try {

            const res = await fetch(`/api/leaveteam/${teamid}/${teammemberid}`,{
                method : 'DELETE',
            })

            if(!res.ok){
                console.log(await res.text())
                toast.error(await res.text())
                return;
            }


            const data = await res.json()
            console.log(data?.message)

            toast.success(data?.message)
            
        } catch (error) {
            console.log(`Issue Occured while leaving Team: ${error}`)
            toast.error(`Issue Occured while leaving Team: ${error}`)
        }
    }


  return (
    <section>
        <div className="overflow-x-auto scrollbar-hide w-full max-h[calc(95vh-5rem)] ">
            <div className='grid grid-cols-5     gap-[2px] text-xs font-opensans overflow-y-auto min-w-[600px] scrollbar-hide border-b'>
                 {
                    teamCreatedAttributeNamen.map((data:teamCreatedAttributeNamenType,idx:number) => (
                    <p className={`${data?.className} bg-purple-300 py-1`}key={idx}>{data?.attribute}</p>
                    ))
                }
            </div>
        </div>

        {
            loading ?
            <LoadingComponent label='Fetching team members...' />
            :
            (
                Array.isArray(fetchdevdata) && fetchdevdata.length > 0 ?
                fetchdevdata.map((teamMemberInfo : TeamMemberInfo,idx : number) => (
                    <ContextMenu key={teamMemberInfo?.id || idx}>
                        <ContextMenuTrigger>
                            <div className="overflow-x-auto scrollbar-hide w-full" key={teamMemberInfo?.id || idx}>
                                <div className='grid grid-cols-5  cursor-pointer items-center min-w-[600px] py-2 border-b'>
                                    <p className='col-start-1 col-end-2 text-center opacity-70 text-xs'>{idx + 1}</p>
                                    <p className='col-start-2 col-end-3 text-center opacity-70 text-xs'>
                                        <span>{teamMemberInfo?.user?.name} </span>
                                        <span className="text-purple-500">{user?.id == teamMemberInfo?.team?.leaderid ? ' - leader' : ' - member'}</span>
                                    </p>
                                    <p className='col-start-3 col-end-4 text-center opacity-70 text-xs'>{teamMemberInfo?.user?.email}</p>
                                    <p className='col-start-4 col-end-5 text-center opacity-70 text-xs'>{teamMemberInfo?.user?.role}</p>
                                    <p className='col-start-5 col-end-6 text-center opacity-70 text-xs'>{teamMemberInfo?.joinedAt}</p>
                                </div>
                            </div>
                        </ContextMenuTrigger>
                        <ContextMenuContent>
                        { 
                            user?.id  == teamMemberInfo?.team?.leaderid && 
                            <div>
                                <ContextMenuItem onClick={() => removeMemberfromTeam(teamMemberInfo?.id,teamMemberInfo?.userId)}>Remove member</ContextMenuItem>
                                <ContextMenuItem onClick={() => router.push(`/dashboard/user/u/${teamMemberInfo?.userId}`)}>view</ContextMenuItem>
                            </div> 
                        }

                        {
                            user?.id == teamMemberInfo?.userId && 
                            <div>
                                <ContextMenuItem onClick={() => leaveTeam(teamMemberInfo?.id)}>leave team</ContextMenuItem>
                            </div>
                        }

                        {
                            user?.id != teamMemberInfo?.userId &&  user?.id != teamMemberInfo?.team?.leaderid &&
                            <div>
                                <ContextMenuItem onClick={() => router.push(`/user/u/${teamMemberInfo?.userId}`)}>view</ContextMenuItem>
                            </div>
                        }
                    </ContextMenuContent>
                    </ContextMenu>
                ))
                :
                (
                    <div className='flex flex-col gap-3 justify-center items-center min-h-[calc(97vh-3rem)]'>
                        <p className='opacity-70 text-xs animate-pulse'>No member added till now.</p>
                    </ div>
                )
            )
        }
    </section>
  )
}