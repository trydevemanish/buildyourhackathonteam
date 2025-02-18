import React from 'react'
import Link from 'next/link'

export default function page() {
  return (
    <div>
      <div className='flex flex-col gap-4 justify-center items-center mt-40'>
        <p>No prev team built, Create new team !</p>
        <button className='bg-black text-white px-8 py-1 text-xs rounded'>
          <Link href="/dashboard/createteam">
            create one 
          </Link>
        </button>
      </div>

    </div>
  )
}
