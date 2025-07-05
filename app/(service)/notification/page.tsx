"use client"
import React,{ useState,useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import LoadingComponent from '@/components/LoadingComponent'

type  userReqLeaderToJoinTeamNotification = {
  id : string,
  createdAt:string,
  leaderid:string,
  userid:string,
  teamid:string,
  status : string,
  requesttype : string,
  rejectionmsg : string,
  user : {
      name:string
  }
}

export default function Page() {
  // this resemble to store fetch data of notification where user req to team leader
  const [userReqTeamToJoinData,SetUserReqTeamToJoinData] = useState([])
  // this resemble to store fetch data of notification where leader invivtes user to join team
  const [leaderInviteUser,setLeaderInviteUser] = useState([])

  //checking loading state...
  const [loadingForReqType_U_t_L,setLoadingForReqType_U_t_L] = useState(false)
  const [loadingForReqType_L_T_U,setLoadingForReqType_L_T_U] = useState(false)

  const [userAcceptedLeaderinvitation,setUserAcceptedLeaderinvitation] = useState(false)
  const [userRejectedLeaderinvitation,setUserRejectedLeaderinvitation] = useState(false)
  
  const [leaderAcceptedUserinvitation,setLeaderAcceptedUserinvitation] = useState(false)
  const [leaderRejectedUserinvitation,setLeaderRejectedUserinvitation] = useState(false)

  const router = useRouter()
  const { user } = useUser()

  // this function will fetch all the notification where user is making req to team leader to join their team
  useEffect(() => {
    const findAllNotificationReqTypq_U_t_L = async() => {
      try {

        setLoadingForReqType_U_t_L(true)

        const res = await fetch(`/api/fetchnotification/user_to_Leader`)

        if(!res.ok){
          console.log(await res.text())
          toast.error(await res.text())
          return;
        }

        const data = await res.json()
        console.log(data?.message)

        SetUserReqTeamToJoinData(data?.data)
        
      } catch (error) {
        console.log(`Issue occured while fetching notification: ${error}`)
        throw new Error(`Issue occured while fetching notification: ${error}`)
      } finally {
        setLoadingForReqType_U_t_L(false)
      }
    }
    findAllNotificationReqTypq_U_t_L()
  },[leaderAcceptedUserinvitation,leaderRejectedUserinvitation])

  // this useeffect will fetch the notification data where user is invited by leader to join team
  useEffect(() => {
    const fetchallNotificationReqType_L_T_U = async() => {
        try {

          setLoadingForReqType_L_T_U(true)

          const res = await fetch(`/api/fetchnotification/leader_to_User`)

          if(!res.ok){
            console.log(await res.text())
            return;
          }

          const data = await res.json()
          console.log(data?.message)

          setLeaderInviteUser(data?.data)
          
        } catch (error) {
          console.log(`Issue occured while fetching notification: ${error}`)
          throw new Error(`Issue occured while fetching notification: ${error}`)
        } finally {
          setLoadingForReqType_L_T_U(false)
        }
    }
    fetchallNotificationReqType_L_T_U()
  },[userAcceptedLeaderinvitation,userRejectedLeaderinvitation])

  // hanlde accept req
  async function handleAcceptReq(reqid:string,userid:string,teamid:string,leaderid : string,status:string,reqType:string) {
      try {
          console.log(status)
          // make a req to add user to the teammember table.
          if(status !== 'PENDING'){
              console.log('This req is already handled: ${status}')
              return;
          } 

          if(reqType == 'user_to_Leader'){

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
            toast.success('Req accept by leader.')
            setLeaderAcceptedUserinvitation((prev) => !prev)

            return;
          }

          // this req will be made when the user accept the leaders invitation to teamid.  
          if(reqType == 'leader_to_User'){

            const res = await fetch(`/api/acceptedleaderinvitationReq`,{
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
            
            
            toast.success(data?.message)
            setUserAcceptedLeaderinvitation((prev) => !prev)

            return;
          }

      } catch (error) {
          console.log(`Issue Occured while accepting: ${error}`)
      }
  }

  //handle reject req.
  async function handleRejectReq(reqid:string,userid:string,teamid:string,leaderid : string,status:string,reqType:string){
      try {
          console.log(status)

          if(status !== 'PENDING'){
              console.log('Already handled this req.')
              return;
          }

          if(reqType == 'user_to_Leader'){
            
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

            toast.error('req decliend by leader.')
            setLeaderRejectedUserinvitation((prev) => !prev)

            return;
          }

          // it will run when user reject the leader Invitation.
          if(reqType == 'leader_to_User'){

            const res = await fetch(`/api/rejectedleaderInvitationReq`,{
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

            toast.error('req declined by user.')

            setUserRejectedLeaderinvitation((prev) => !prev)

            return;
          }
          
      } catch (error) {
          console.log(`Issue Occured while Rejecting: ${error}`)
      }
  }

  return (
    <div>
      <div className='text-sm text-center py-2 border'>
            <p>Notification page.</p>
      </div>

      {/* this section will show the req that user made to leader to join team . */}
      <section className='text-xs flex flex-col overflow-y-auto scrollbar-hide max-h-[calc(96vh-2rem)]'>
        {
          loadingForReqType_U_t_L ? 
          <LoadingComponent label='Fetching Notification' />
          :
          (
            Array.isArray(userReqTeamToJoinData) && userReqTeamToJoinData.length > 0 ?
            userReqTeamToJoinData?.map((data : userReqLeaderToJoinTeamNotification,idx:number) => (
              <div key={idx}>
                {user?.id == data?.leaderid && 
                  <div className="overflow-x-auto scrollbar-hide w-full">
                    <div className='grid grid-cols-5 min-w-[600px] px-8 items-center py-1 gap-3 border-b' onClick={() => router.push(`/dashboard/user/u/${data?.userid}`)}>
                      <p className='opacity-70 text-[9px] col-start-1 col-end-2 '>{data?.createdAt}</p>
                      <p className='col-start-2 col-end-3'>{data?.user?.name} req to join team.</p>
                      <p className='opacity-70 text-xs col-start-3 col-end-4'>Status: {data?.status}</p>
                      <p className='col-start-4 col-end-5'>reqType: {data?.requesttype}</p>
  
                      <div className='col-start-5 col-end-6'>
                        <div className='flex justify-center gap-2 '>
                            <button className='bg-black text-white py-[2px] px-6 rounded text-[9px]' onClick={() => handleAcceptReq(data?.id,data?.userid,data?.teamid,data?.leaderid,data?.status,data?.requesttype)}>✔</button>
                            <button className='bg-black text-red py-1 px-6 rounded text-[9px]' onClick={() => handleRejectReq(data?.id,data?.userid,data?.teamid,data?.leaderid,data?.status,data?.requesttype)}>✖</button>
                        </div>
                      </div>
                    </div>
                  </div>
                }
                {user?.id == data?.userid && 
                  <div className="overflow-x-auto scrollbar-hide w-full" key={idx}>
                    <div className='grid grid-cols-4 items-center min-w-[600px] py-1 gap-3 border-b'>
                        <p className='opacity-70 text-[9px] col-start-1 col-end-2'>{data?.createdAt}</p>
                        <p className='col-start-2 col-end-3'>{data?.rejectionmsg ?? 'no msg now'}</p>
                        <p className='col-start-3 col-end-4'>status: {data?.status}</p>
                        <p className='col-start-4 col-end-5'>reqtype: {data?.requesttype}</p>
                    </div>
                  </div>
                }
              </div>
            ))
            :
            (
              <LoadingComponent label='No Notification yet...' />
            )
          )
        }
      </section>

      <section>
        {
          loadingForReqType_L_T_U ?
          <LoadingComponent label='Fetching Notification' />
          :
          (
            Array.isArray(leaderInviteUser) && leaderInviteUser.length > 0 ?
            leaderInviteUser?.map((data : userReqLeaderToJoinTeamNotification,idx:number) => (
                <div key={idx}>
                  {user?.id == data?.userid && 
                    <div className="overflow-x-auto scrollbar-hide w-full">
                      <div className='grid grid-cols-5 px-8 min-h-[600px] items-center py-1 gap-3 border-b' onClick={() => router.push(`/dashboard/user/u/${data?.leaderid}`)}>
                        <p className='opacity-70 text-[9px] col-start-1 col-end-2 '>{data?.createdAt}</p>
                        <p className='col-start-2 col-end-3'>{data?.user?.name} req to join team.</p>
                        <p className='opacity-70 text-xs col-start-3 col-end-4'>Status: {data?.status}</p>
                        <p className='col-start-4 col-end-5'>reqType: {data?.requesttype}</p>

                        <div className='col-start-5 col-end-6'>
                          <div className='flex justify-center gap-2 '>
                              <button className='bg-black text-white py-[2px] px-6 rounded text-[9px]' onClick={() => handleAcceptReq(data?.id,data?.userid,data?.teamid,data?.leaderid,data?.status,data?.requesttype)}>✔</button>
                              <button className='bg-black text-red py-1 px-6 rounded text-[9px]' onClick={() => handleRejectReq(data?.id,data?.userid,data?.teamid,data?.leaderid,data?.status,data?.requesttype)}>✖</button>
                              <button className='bg-black text-red py-1 px-6 rounded text-[9px]' >✖</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                  {user?.id == data?.leaderid && 
                  <div className="overflow-x-auto scrollbar-hide w-full" key={idx}>
                      <div className='grid grid-cols-4 items-center py-1 min-h-[600px] gap-3 border-b'>
                        <p className='opacity-70 text-[9px] col-start-1 col-end-2'>{data?.createdAt}</p>
                        <p className='col-start-2 col-end-3'>{data?.rejectionmsg ?? 'no msg now'}</p>
                        <p className='col-start-3 col-end-4'>status: {data?.status}</p>
                        <p className='col-start-4 col-end-5'>reqtype: {data?.requesttype}</p>
                      </div>
                    </div>
                  }
                </div>
            ))
            :
            (
              <LoadingComponent label='No Notification yet...' />
            )
          )
        }
      </section>
    </div>
  )
}
