import React from 'react'
import { Textarea } from '@/components/ui/textarea'

export default function Page() {
  return (
    <div>
        <div className='px-16 py-10'>
            <p className='text-base'>Build your hackathon team.</p>
            <p className='text-[10px] opacity-55'>Note: * options are mandatory.</p>
            <div className='pt-7 flex flex-col gap-4'>

                <div className='flex flex-col'>
                    <label htmlFor="teamName" className='text-[13px]'>* Team Name : </label>
                    <input className='border-b border-black focus:outline-none text-xs px-2 w-96 py-1 ml-3' id='teamName'/>
                </div>
                
                <div className='flex flex-col'>
                    <label htmlFor="projectname" className='text-[13px]'>* Project Name : </label>
                    <input className='border-b border-black focus:outline-none text-xs px-2 w-96 py-1 ml-3' id='projectname'/>
                </div>

                <div className='flex flex-col gap-2'>
                    <label htmlFor="projectdescription" className='text-[13px]'>* Project Description : </label>
                    <Textarea className='border-b border-black focus:outline-none text-xs px-2 w-96 py-1 ml-3' id='projectdescription'/>
                </div>

                <div className=' flex flex-col'>
                    <label htmlFor="hackathonname" className='text-[13px]'>* Hackathon Name : </label>
                    <input className='border-b border-black focus:outline-none text-xs px-2 w-96 py-1 ml-3' id='hackathonname'/>
                </div>

                <div className=' flex flex-col'>
                    <label htmlFor="hackthondescription" className='text-[13px]'>* Hackathon Description : </label>
                    <Textarea className='border-b border-black focus:outline-none text-xs px-2 w-96 py-1 ml-3' id='hackthondescription'/>
                </div>

            </div>
                <button className='bg-black text-white px-8 text-xs rounded py-1 mt-6'>Create team</button>
        </div>
    </div>
  )
}


{/* <div className='flex items-center'>
                    <label htmlFor="teamName" className='text-[13px]'>* Team Name : </label>
                    <input className='border border-black rounded focus:outline-none px-3 text-xs py-1' id='teamName'/>
                </div>

                <div className=' flex items-center'>
                    <input className='border border-black rounded focus:outline-none px-3 text-xs py-1' id='projectname'/>
                </div>

                <div className=' flex items-center'>
                    <label htmlFor="projectdescription" className='text-[13px]'>* Project Description : </label>
                    <input className='border border-black rounded focus:outline-none px-3 text-xs py-1' id='projectdescription'/>
                </div>

                <div className=' flex items-center'>
                    <label htmlFor="hackathonname" className='text-[13px]'>* Hackathon Name : </label>
                    <input className='border border-black rounded focus:outline-none px-3 text-xs py-1' id='hackathonname'/>
                </div>

                <div className=' flex items-center'>
                    <label htmlFor="hackthondescription" className='text-[13px]'>* Hackathon Description : </label>
                    <input className='border border-black rounded focus:outline-none px-3 text-xs py-1' id='hackthondescription'/>
                </div> */}
