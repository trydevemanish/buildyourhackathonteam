import React from 'react'

type props = {
    label : string 
}

export default function LoadingComponent({label}:props) {
  return (
    <div className='flex flex-col gap-3 justify-center items-center min-h-[calc(97vh-3rem)]'>
        <p className='opacity-70 text-xs animate-pulse'>{label}</p>
    </ div>
  )
}
