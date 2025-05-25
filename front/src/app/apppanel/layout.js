'use client'
import React from 'react'
import Sidebarpanel from './Sidebarpanel'

export default function Layout({ children }) {
    return (
        <div className='flex'>
            <div className='w-1/4'>
                <Sidebarpanel />
            </div>
            <div className='w-3/4 relative'>
                <div className='absolute top-24 w-2/5'>
                    {children}
                </div>
            </div>
        </div>
    )
}
