'use client'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export function Logo() {
    const router = useRouter()
  return (
    <div className='flex items-center justify-center' onClick={() => router.push("/")}>
        <Image src="/logo.svg" alt='Logo' width="30" height="15" priority className='cursor-pointer'/>
    </div>
  )
}
