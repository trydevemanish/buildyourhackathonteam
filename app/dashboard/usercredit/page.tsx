"use client"
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import React,{useEffect, useState} from 'react'


export default function Page() {
  const [usercredit,setUserCredit] = useState<number>()
  const [showWaringLimitText,setShowWarningLimittext] = useState(false)
  const [name,setName] = useState('')
  const [cardno,setCardNo] = useState('')
  const [cvv,setCvv] = useState('')
  const [expiry,setExpiry] = useState('')

  useEffect(() => {
    findUserTotalCredit()
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

      // need to set the user credit data here 
      setUserCredit(data?.data?.initialCredit)
      
    } catch (error) {
      console.log(`Failed to create User: ${error}`)
    }
  }

  // check if user credit is 0 or not.
  async function handlefunctionAddCredit() {
    if(usercredit == 0){
      AddCredit()
    } else {
      setShowWarningLimittext((prev) => !prev)
    }
  }

  // add credit to user profile.
  async function AddCredit(){
    try {

       [name,cardno,cvv,expiry].forEach((field : string) => {
        if(!field && field.length < 0){
          console.log('Field is required')
          return;
        }
       })

       const res = await fetch(`/api/addmorecreditafterbuying`,{
        method: 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({ name : name, cardno : cardno, cvv : cvv , expiry : expiry })
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
            <span className='text-2xl'>Welcome,</span>
            <span className='opacity-80 text-sm'> Manish</span>
          </p>
          <p className='opacity-60 text-sm'>you are only left with {usercredit ? usercredit : 'x'} credit!</p>
          <p className='text-[9px] py-3 opacity-60 text-purple-500'>Req for more credit only if you have use your all credit & deleted your prev built team.</p>
        </div>
      </div>
        {/* this will be the form for the credit options  */}
      <div className='col-start-2 col-end-3 flex flex-col gap-8 justify-center items-center min-h-[calc(97vh-5rem)]'>
          <p className='text-center text-sm opcaity-60 pt-2 flex flex-col gap-4'>
            <span className='text-xs font-semibold'>Buildyourhackathonteam.</span>
            <span>Fill out this form to buy more credit.</span>
          </p>
          <div className='flex flex-col gap-2 items-center'>
            <div>
              <Label htmlFor='fullname' className='text-sm'>Fullname</Label>
              <Input id='fullname' className='min-w-64 text-xs h-8 mt-2 placeholder:text-xs' placeholder='Enter your name.' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <Label htmlFor='cardno' className='text-sm'>Card no.</Label>
              <Input id='cardno' className='min-w-64 text-xs h-8 mt-2 placeholder:text-xs' placeholder='use default - 987654321000' value={cardno} onChange={(e) => setCardNo(e.target.value)} />
            </div>
            <div className='flex gap-3 items-center'>
              <div>
                <Label htmlFor='cvv' className='text-sm'>CVV</Label>
                <Input id='cvv' className='w-28 text-xs h-8 mt-2 placeholder:text-xs' placeholder='use - 987' value={cvv} onChange={(e) => setCvv(e.target.value)} />
              </div>
              <div>
                <Label htmlFor='expiry' className='text-sm'>Expiry</Label>
                <Input id='expiry' className='w-32 text-xs h-8 mt-2 placeholder:text-xs' placeholder='use - 10/2000' value={expiry} onChange={(e) => setExpiry(e.target.value)} />
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
