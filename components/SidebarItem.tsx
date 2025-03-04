'use client'
import React from 'react'
import Link from "next/link"
import {LucideIcon} from "lucide-react"
import { usePathname } from 'next/navigation'
import clsx from "clsx"

interface SidebarItemsProps  {
    item :{
        label: string,
        icon: LucideIcon,
        href: string
    }
}

export function SidebarItem(props: SidebarItemsProps) {
    const {item} = props
    const {label, icon: Icon , href} = item
    const pathname = usePathname()
    const linkActive = pathname === href
  return (
    <Link href={href} className={clsx(
      'flex items-center gap-2 p-4 mb-2 rounded-lg drop-shadow-sm text-md font-semibold border border-card',
       linkActive ? 'text-primary bg-background border-secondary' : 'hover:text-card-foreground text-secondary-foreground'
       )}>
        <Icon/>
        {label}
    </Link>
  )
}
