import React from 'react'

export default function layoutAuth({children} : {children :React.ReactNode}) {
  return (
    <main className='flex justify-center items-center h-full '>
        <article className='text-center'>
            <header className='mb-4'>
                <p className='text-sm'>Take control of your business at a glance</p>
                <h1 className='text-3xl font-semibold'>Welcome to MetricsFlow</h1>   
            </header>
            {children}
        </article>
    </main>
  )
}
