import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className='flex justify-center gap-[40px] my-[20px]'>
        <div><Link href={'/addjob'}><button className='bg-black text-white p-2'>Add Job</button></Link></div>
        <div><Link href={'/viewjob'}><button className='bg-black text-white p-2'>View Job</button></Link></div>
    </div>
  )
}
