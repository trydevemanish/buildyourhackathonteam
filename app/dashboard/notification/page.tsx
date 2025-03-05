"use client"
import React, { useEffect, useState } from 'react'

type Notification = {
        id : string,
        createdAt:string,
        leaderid:string,
        userid:string,
        teamid:string,
        user : {
            name:string
        }
}

export default function Page() {
    const [notificationdata,setNotificationData] = useState([])

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
        // fetchnotificationofuserbythereid()
    },[])

    useEffect(() => {
        async function fetchLeaderRejectReqtoJoinTeam() {
            try {
                const res = await fetch(`/api/fetchLeaderRejectReqtoJoinTeam`)
                if(!res.ok){
                    const errtxt = await res.text()
                    console.log(errtxt)
                    return;
                }

                const data = await res.json()
                console.log(data?.message)
                
            } catch (error) {
                console.log(`Failed to Fetch leader: ${error}`)
            }
        }
        // fetchLeaderRejectReqtoJoinTeam()
    },[])

    async function handleAcceptUserReqToJoinTeam(teamid:string,userid:string) {
        try {
            // make a req to add user to the team.
            const res = await fetch(`/api/addtoteam/${teamid}`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({ userid : userid })
            })

            if(!res.ok){
                const errtext = await res.text()
                console.log(errtext)
                return;
            }

            const data = await res.json()

            console.log(data?.message)
            
        } catch (error) {
            console.log(`Issue Occured while accepting: ${error}`)
        }
    }

    async function handleRejectUserReqToJoinTeam(userid:string){
        try {

            const res = await fetch(`/api/rejectUserreqtojointeam`,{
                method : 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({ userid : userid })
            })

            if(!res.ok){
                const errtxt = await res.text()
                console.log(errtxt)
                return;
            }

            const data = await res.json()
            console.log(data?.message)
            
        } catch (error) {
            console.log(`Issue Occured while Rejecting: ${error}`)
        }
    }

  return (
    <div>
        <div className='text-sm text-center py-2 border'>
            <p>Notification page.</p>
        </div>
        <section className='text-xs py-2 flex flex-col items-center justify-center'>
            {notificationdata?.map((data : Notification,idx:any) => (
                 <div className='flex flex-col gap-3 py-2 border-b pb-3' key={idx}>
                    <p>
                        <span className='opacity-70 text-[9px]'>{data?.createdAt}</span><br/>
                        <span className='text-center'>{data?.user?.name} req to join team.</span>
                    </p>
                    <div className='flex justify-center gap-2 '>
                        <button className='bg-black text-white py-1 px-6 rounded' onClick={() => handleAcceptUserReqToJoinTeam(data?.teamid,data?.userid)} >✔</button>
                        <button className='bg-black text-red py-1 px-6 rounded' onClick={() => handleRejectUserReqToJoinTeam(data?.userid)}>✖</button>
                    </div>
                </div>
            ))}
        </section>
    </div>
  )
}
