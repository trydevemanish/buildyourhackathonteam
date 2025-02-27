import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import React from 'react'

export default function Page() {
  return (
    <main className='grid grid-cols-2'>
      <div className='col-start-1 col-end-2'>
        <div className='flex flex-col justify-center items-center min-h-[calc(97vh-5rem)]'>
          <p>
            <span>Welcome,</span>
            <span className='opacity-80 text-sm'> Manish</span>
          </p>
          <p className='opacity-60 text-sm'>you are only left with 3 credit!</p>
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
              <p className='cursor-pointer'>+ Add more credit</p>
            </div>
          </div>
      </div>
    </main>
  )
}
