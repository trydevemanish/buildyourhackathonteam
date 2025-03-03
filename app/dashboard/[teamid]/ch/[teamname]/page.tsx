"use client"
import { useParams } from 'next/navigation'
import React, { useEffect,useState } from 'react'
import { Send } from 'lucide-react'
import { Loader2 } from 'lucide-react'

export default function Page() {
  const { teamid } = useParams()
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

        console.log(data?.message)
        console.log('data: ',data)

        setFetchData(data?.data)
        
      } catch (error) {
        console.log(`Isuue: ${error}`)
      }
    }

    handlefetchmsg()
  },[msgadded])


  async function handleAddmsg(){
    try {
      setbtnloading(true)
      console.log('message: ',msg)
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
        return;
      }

      const data = await res.json()

      console.log(data?.message)
      console.log('data: ',data)

      setmsgAdded(!msgadded)
      
    } catch (error) {
      console.log(`Issue occured while Adding: ${error}`)
    } finally {
      setbtnloading(false)
    }
  }

  return (
    <div>
      <section>
        <p className='text-center py-2'>
          <span className='text-xl'>Welcome, </span>
          <span className='text-sm opacity-80'>Hackerspu.</span>
        </p>
        <div className='text-center text-xs opacity-70'>
          <p>You can use this, but we suggest you to create a whatapp group,</p>
          <p>cuz your team is only limited with 200 message.</p>
        </div>
      </section>

      <section className='flex flex-col place-content-between min-h-[calc(100vh-8rem)]'>
        <div className='flex flex-col gap-3'>
          {fetchdata.map((data:any,idx:number) => (
            <div className='flex gap-2 px-3' key={idx}>
              <p className='bg-black rounded w-[2px]'>.</p>
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
