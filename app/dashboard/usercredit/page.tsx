"use client"
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import React,{useEffect, useState} from 'react'

export default function Page() {
  const [usercredit,setUserCredit] = useState('')
  const [showWaringLimitText,setShowWarningLimittext] = useState(false)

  useEffect(() => {
    // findUserTotalCredit()
  },[])

  async function findUserTotalCredit(){
    try {
      
      const res = await fetch(`/api/findusercredit`)

      if(!res.ok){
        const errtext = await res.text()
        console.log(errtext)
        return;
      }

      const data = await res.json()

      if(!data){
        console.log('Failed to covert res to json')
        return;
      }

      console.log(data?.message)
      console.log('data',data)
      // need to set the user credit data here 
      //   setUserCredit(data)
      
    } catch (error) {
      console.log(`Failed to create User: ${error}`)
    }
  }

  async function handlefunctionAddCredit() {
    if(Number(usercredit) == 0){
      AddCredit()
    } else {
      setShowWarningLimittext(!showWaringLimitText)
    }
  }

  async function AddCredit(){
    try {

       const res = await fetch(`/api/addmorecreditafterbuying`,{
        method: 'POST'
       })

       if(!res.ok){
        const errtext = await res.text()
        console.log(errtext)
        return;
       }

       const data = await res.json()
       console.log(data?.message)
      
    } catch (error) {
      console.log(`Issue Ocuured While Adding More Credit: ${error}`)
    }
  }

  return (
    <main className='grid grid-cols-2'>
      <div className='col-start-1 col-end-2'>
        <div className='flex flex-col justify-center items-center min-h-[calc(97vh-5rem)]'>
          <p>
            <span>Welcome,</span>
            <span className='opacity-80 text-sm'> Manish</span>
          </p>
          <p className='opacity-60 text-sm'>you are only left with {usercredit} credit!</p>
        </div>
      </div>
        {/* this will be the form for the credit options  */}
      <div className='col-start-2 col-end-3 flex flex-col gap-8 justify-center items-center min-h-[calc(97vh-5rem)]'>
          <p className='text-center text-sm opcaity-60 pt-2'>Fill out this form to buy more credit.</p>
          <div className='flex flex-col gap-2 items-center'>
            <div>
              <Label htmlFor='fullname' className='text-sm'>Fullname</Label>
              <Input id='fullname' className='min-w-64 text-xs h-8 mt-2' />
            </div>
            <div>
              <Label htmlFor='cardno' className='text-sm'>Card no.</Label>
              <Input id='cardno' className='min-w-64 text-xs h-8 mt-2' />
            </div>
            <div className='flex gap-3 items-center'>
              <div>
                <Label htmlFor='cvv' className='text-sm'>CVV</Label>
                <Input id='cvv' className='w-28 text-xs h-8 mt-2' />
              </div>
              <div>
                <Label htmlFor='expiry' className='text-sm'>Expiry</Label>
                <Input id='expiry' className='w-32 text-xs h-8 mt-2' />
              </div>
            </div>
            <div className='bg-black flex justify-center text-white px-10 py-[5px] my-6 text-xs rounded cursor-pointer'>
              <p className='cursor-pointer' onClick={handlefunctionAddCredit}>+ Add more credit</p>
            </div>
            {
                showWaringLimitText && 
                <p className='text-center text-xs flex flex-col gap-2 justify-center items-center'>
                  <span>You have 3 credit already, you cannot buy more credit until</span>
                  <span className='bg-purple-400 px-6 py-1 rounded'>Your credit reaches to 0.</span>
                </p> 
            }
          </div>
      </div>
    </main>
  )
}
