import React from 'react'

export default function HeaderPara() {
  return (
    <div className='py-4 flex flex-col items-center gap-4'>
      <h1 className='text-5xl text-center bg-gradient-to-b to-violet-900 from-fuchsia-800  bg-clip-text text-transparent font-bold '>Form Better, Build Better.</h1>
      <p className='text-center xs:px-4 md:px-36 leading-loose font-opensans text-sm'>
        No more struggling to find teammates! A perfect place to find teams if {"you're"} a beginner, you can <span className='font-bold'>browse teams, choose the right team, and join</span> with just a few clicks—no awkward face-to-face requests needed. <span className='font-bold'>Just connect, collaborate, and start building!</span>
      </p>
      <button className='bg-purple-500 px-8 py-2 text-sm text-white rounded-md'>Get started !</button>
    </div>
  )
}
