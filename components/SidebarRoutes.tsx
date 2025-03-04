'use client'
import React from 'react'
import {
  BarChart4,
  Building2,
  PanelsTopLeft,
  Settings,
  ShieldCheck,
  CircleHelpIcon,
  Calendar
} from 'lucide-react'
import { SidebarItem } from '@/components/SidebarItem'
import { Separator } from '@/components/ui/separator'
import {Button} from '@/components/ui/button'
import { Logo } from '@/components/Logo'

export const dataGeneralSidebar = [
  {
    icon: PanelsTopLeft,
    label: "Dashboard",
    href: "/"
  },
  {
    icon: Building2,
    label: "Companies",
    href: "/companies"
  },
  {
    icon: Calendar,
    label: "Calendar",
    href: "/task"
  }
]
export const dataToolsSidebar = [
  {
    icon: CircleHelpIcon,
    label: "Faqs",
    href: "/faqs"
  },
  {
    icon: BarChart4,
    label: "Analytics",
    href: "/analytics"
  }
]
export const dataSuportSidebar = [
  {
    icon: Settings,
    label: "Setting",
    href: "/setting"
  },
  {
    icon: ShieldCheck,
    label: "Security",
    href: "/security"
  }
]

export function SidebarRoutes() {
  const sidebarSections = [
    {title: "General", data: dataGeneralSidebar},
    {title: "Tools", data: dataToolsSidebar},
    {title: "Suport", data: dataSuportSidebar}
  ]
  return (
    <div className="border-r border-border flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-center gap-2 border-b h-16">
          <Logo/>
          <p className='text-xl font-semibold'>MetricsFlow</p>
        </div>
        {sidebarSections.map((section, index)=> (
          <div key={section.title}>
            {/* <Separator/> */}
            <div className="px-4">
              <p className="font-semibold text-md p-2 text-secondary-foreground uppercase">{section.title}</p>
              {section.data.map((item) => (
                <SidebarItem key={item.label} item={item} />
              ))}
            </div>
            {index < sidebarSections.length - 1 && <Separator />}
          </div>
        ))}
      </div>  
      <div className="m-4">
        <Button className='w-full' variant="outline">
          Upgrade Plan
        </Button>
      </div>
    </div>
  )
}
