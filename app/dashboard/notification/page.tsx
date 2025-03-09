"use client"
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
type  Notification = {
        id : string,
        createdAt:string,
        leaderid:string,
        userid:string,
        teamid:string,
        status : string;
        user : {
            name:string
        }
}

export default function Page() {
    const [notificationdata,setNotificationData] = useState([])
    const [rejectedNotificationData,setRejectedNotificationData] = useState([])

    const { user } = useUser()
    
    const [checkifleaderRejectedUserReq,setCheckifleaderRejectedUserReq] = useState(false)
    const [checkifleaderAcceptedtedUserReq,setCheckifleaderAcceptedtedUserReq] = useState(false)
    
    // this useeffect will fetch all the req of the leader.
    useEffect(() => {
        async function fetchnotificationofuserbythereid() {
            try {

                const res = await fetch(`/api/fetchnotificationofuserbythereid`)

                if(!res.ok){    
                    const errtext = await res.text()
                    console.log(errtext)
                    return ;
                }   

                const data = await res.json()

                console.log(data?.message)
                setNotificationData(data?.data)
                
            } catch (error) {
                console.log(`Issue occured while Fetching notification: ${error}`)
            }
        }
        fetchnotificationofuserbythereid()
    },[checkifleaderRejectedUserReq,checkifleaderAcceptedtedUserReq])

    // when the team leader will reject the user req then user will also get a rejected req msg.
    useEffect(() => {
        async function fetchLeaderRejectedUserReqtoJoinTeam() {
            try {
                const res = await fetch(`/api/fetchLeaderRejectReqtoJoinTeam`)
                if(!res.ok){
                    const errtxt = await res.text()
                    console.log(errtxt)
                    return;
                }

                const data = await res.json()
                console.log(data?.message)

                setRejectedNotificationData(data?.data)
                
            } catch (error) {
                console.log(`Failed to Fetch leader: ${error}`)
            }
        }
        fetchLeaderRejectedUserReqtoJoinTeam()
    },[checkifleaderRejectedUserReq])

    // when leader accept the req join the member to the teammember data and update the req status to accepted
    async function handleAcceptUserReqToJoinTeam(reqid:string,userid:string,teamid:string,leaderid : string,status:string) {
        try {
            console.log(status)
            // make a req to add user to the teammember table.
            if(status !== 'PENDING'){
                console.log('This req is already handled: ${status}')
                return;
            } 

            const res = await fetch(`/api/acceptuserreqtoJointeam`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({ reqid:reqid,userid:userid,teamid:teamid,leaderid : leaderid })
            })

            if(!res.ok){
                const errtext = await res.text()
                console.log(errtext)
                return;
            }

            const data = await res.json()

            console.log(data?.message)

            setCheckifleaderAcceptedtedUserReq((prev) => !prev)
        } catch (error) {
            console.log(`Issue Occured while accepting: ${error}`)
        }
    }

    // when leader reject the user req to join team then it will set the status tp reject ed and send a reject message .
    async function handleRejectUserReqToJoinTeam(reqid:string,userid:string,teamid:string,leaderid : string,status:string){
        try {
            console.log(status)

            if(status !== 'PENDING'){
                console.log('Already handled this req.')
                return;
            }

            const res = await fetch(`/api/rejectUserreqtojointeam`,{
                method : 'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({ reqid:reqid,userid : userid,teamid:teamid,leaderid:leaderid })
            })

            if(!res.ok){
                const errtxt = await res.text()
                console.log(errtxt)
                return;
            }

            const data = await res.json()
            console.log(data?.message)

            setCheckifleaderRejectedUserReq((prev) => !prev)
            
        } catch (error) {
            console.log(`Issue Occured while Rejecting: ${error}`)
        }
    }

  return (
    <div>
        <div className='text-sm text-center py-2 border'>
            <p>Notification page.</p>
        </div>
        <section className='text-xs flex flex-col'>
        {notificationdata?.map((data : Notification,idx:number) => (
            <div className='flex justify-between px-8 items-center py-1 gap-3 border-b' key={idx}>
                <p className='opacity-70 text-[9px]'>{data?.createdAt}</p>
                <p >{data?.user?.name} req to join team.</p>
                <p className='opacity-70 text-xs'>Status: {data?.status}</p>

                <div className='flex justify-center gap-2 '>
                    <button className='bg-black text-white py-[2px] px-6 rounded text-[9px]' onClick={() => handleAcceptUserReqToJoinTeam(data?.id,data?.userid,data?.teamid,data?.leaderid,data?.status)} >✔</button>
                    <button className='bg-black text-red py-1 px-6 rounded text-[9px]' onClick={() => handleRejectUserReqToJoinTeam(data?.id,data?.userid,data?.teamid,data?.leaderid,data?.status)}>✖</button>
                </div>
            </div>
        ))}
        {rejectedNotificationData.map((data:any,idx:number) => (
            <div className='flex justify-evenly items-center py-1 gap-3 border-b' key={idx}>
                <p className='opacity-70 text-[9px]'>{data?.createdAt}</p>
                <p >{data?.rejectionmsg}</p>
                <p>Status: {data?.status}</p>
            </div>
        ))}
        </section>
    </div>
  )
}
