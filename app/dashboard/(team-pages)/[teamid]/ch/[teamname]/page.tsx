"use client"
import { useParams } from 'next/navigation'
import React, { useEffect,useState } from 'react'
import { Send } from 'lucide-react'
import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

type fetchdatatype = {
  senderid:string,
  createdAt:string,
  message:string,
}

// this page is for sending or receiving message from of a team.
export default function Page() {
  const { teamid,teamname } = useParams()
  const [msg,setmsg] = useState('')
  const [fetchdata,setFetchData] = useState([])
  const [msgadded,setmsgAdded] = useState(false)
  const [btnload,setbtnloading] = useState(false)

  useEffect(() => {
    async function handlefetchmsg(){
      try {

        const res = await fetch(`/api/fetchchat/${teamid}`)

        if(!res.ok){
          const errtxt = await res.text()
          console.log(errtxt)
          return ;
        }

        const data = await res.json()

        setFetchData(data?.data)

      } catch (error) {
        console.log(`Isuue: ${error}`)
      }
    }

    handlefetchmsg()
  },[teamid,msgadded])




  async function handleAddmsg(event:React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    try {
      setbtnloading(true)
      const res = await fetch(`/api/chathandler/${teamid}`,{
        method:'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({ message : msg })
      })

      if(!res.ok){
        const errtext = await res.text()
        console.log(errtext)
        toast.error(errtext)
        return;
      }

      const data = await res.json()
      console.log(data?.message)
      setmsgAdded((prev) => !prev)
      toast.success(data?.message)
      setmsg('')
      
    } catch (error) {
      console.log(`Issue occured while Adding: ${error}`)
    } finally {
      setbtnloading(false)
    }
  }

  return (
    <div>
      <section className='border-b py-2'>
        <p className='text-center py-2'>
          <span className='text-xl'>Welcome, </span>
          <span className='text-sm opacity-80'>{teamname ? teamname : 'team x'}</span>
        </p>
        <div className='text-center text-xs opacity-70'>
          <p>You can use this, but we suggest you to create a whatapp group,</p>
          <p>cuz your team is only limited with 200 message.</p>
        </div>
      </section>

      <section className='flex flex-col place-content-between min-h-[calc(100vh-10rem)]'>
        <div className='flex flex-col gap-3'>
          {fetchdata.map((data:fetchdatatype,idx:number) => (
            <div className='flex gap-2 px-3' key={idx}>
              <p className='bg-purple-500 rounded w-[2px]'>.</p>
              <div>
                <p className='opacity-40 text-[10px] flex gap-2 '>
                  <span>{data?.senderid}</span>
                  <span>{data?.createdAt}</span>
                </p>
                <p className='text-[12px]'>{data?.message}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div>
          <form onSubmit={handleAddmsg} className='flex items-center justify-center pt-6 gap-2'>
            <input type='text' value={msg} onChange={(e) => setmsg(e.target.value)} className='border rounded w-72 text-sm focus:outline-none p-1'/>
            <button type='submit'>
              {btnload ? <Loader2 className='size-4 animate-spin' /> : <Send className='size-4' />}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
