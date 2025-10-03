'use client'
import { UserData } from '@/types/types'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useFetchData } from '@/hook/useFetchData'

type props = {
  inputvalue?:string
  selectedRoleValue? : selectedRoleValueType
}

type selectedRoleValueType = 'Helper' | 'ML_eng' | 'Frontend_dev' | 'Backend_dev' | 'Design'

export default function OtherDevComponent({inputvalue,selectedRoleValue}:props){
      const [fetchdevdata,setfetchdevdata] = useState<UserData[]>()
      const router = useRouter()
      const { user} = useUser()
    
      // fetch allusers 
      const { loading ,errors : fetchingOtherDevsDataErrors,data } = useFetchData<UserData[]>({ url:'/api/findallusers' })
    
      // fetch when input val 
      const shouldSearchforname = inputvalue && inputvalue.trim() != "";
      const { errors : fetchingOtherDevsDataWithNameErrors,data:databyname } = useFetchData<UserData[]>({ url:shouldSearchforname ? `/api/findUserbyname/${inputvalue}` : "" , state : shouldSearchforname && [inputvalue ]})
    
      // fetch when role 
      const shouldSearchforRole = selectedRoleValue && selectedRoleValue.trim() != "";
      const { errors : fetchingOtherDevsDataWithRoleErrors,data:databyrole } = useFetchData<UserData[]>({ url:shouldSearchforRole ? `/api/findUserbyrole/?role=${selectedRoleValue}` : "", state: shouldSearchforRole && [selectedRoleValue]})
    
      useEffect(() => {
        
          if(shouldSearchforname){
            setfetchdevdata(databyname)
            if (fetchingOtherDevsDataWithNameErrors) {
              console.log('fetchingOtherDevsDataWithNameErrors: ', fetchingOtherDevsDataWithNameErrors)
            }
          } else if (shouldSearchforRole) {
            console.log('databyrole',databyrole)
            setfetchdevdata(databyrole)
            if (fetchingOtherDevsDataWithRoleErrors) {
              console.log('fetchingOtherDevsDataWithRoleErrors: ', fetchingOtherDevsDataWithRoleErrors)
            }
          } else if (data != undefined && data.length > 0){
            console.log('normal other dev data',data)
            setfetchdevdata(data)
          }
    
      },[data,inputvalue,shouldSearchforname,shouldSearchforRole,selectedRoleValue,fetchingOtherDevsDataWithRoleErrors,fetchingOtherDevsDataWithNameErrors,databyname,databyrole])
    
    
    
      // for errors 
      if(fetchingOtherDevsDataErrors){
        console.log('fetchingOtherDevsDataErrors: ',fetchingOtherDevsDataErrors)
      }

    return (
        <div>
            {
            loading ? 
            <div className='flex flex-col gap-3 justify-center items-center min-h-[calc(96vh-3rem)]'>
                <p className='opacity-70 text-xs text-black animate-pulse'>Fetching developers....</p>
            </ div>
            : 
            (
                Array.isArray(fetchdevdata) && fetchdevdata.length > 0 ? 
                (
                fetchdevdata.map((data : UserData,idx : number) => (
                <div className="overflow-x-auto scrollbar-hide w-full" key={data?.id || idx}>
                    {user?.id != data?.id && 
                    <div className='grid grid-cols-5 items-center py-2  min-w-[600px]  border-b'>
                        <p className='col-start-1 col-end-2 text-center opacity-70 text-xs whitespace-nowrap'>{idx + 1}</p>
                        <p className='col-start-2 col-end-3 text-center opacity-70 text-xs whitespace-nowrap'>{data?.name}</p>
                        <p className='col-start-3 col-end-4 text-center opacity-70 text-xs whitespace-nowrap'>{data?.email}</p>
                        <p className='col-start-4 col-end-5 text-center opacity-70 text-xs whitespace-nowrap'>{data?.role}</p>
                        <div className='col-start-5 col-end-6 flex justify-center cursor-pointer' onClick={() => router.push(`/dashboard/user/u/${data?.id}`)}>
                        <p className='bg-purple-600 text-white px-8 py-1 rounded text-xs whitespace-nowrap'>view detail</p>
                        </div>
                    </div>
                    }
                </div> 
                ))
                ) : 
                (
                <div className='flex justify-center items-center h-[calc(95vh-8rem)]'>
                    <section className='flex flex-col gap-3 justify-center items-center min-h-[calc(96vh-14rem)]'>
                    <p className='opacity-80'>No Data found.</p>
                    <p className='opacity-80 text-center text-sm '>Try again later !</p>
                    </section>
                </div>
                )
            )
        }
    </div>
    )
}