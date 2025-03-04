import React from 'react'
import { Navbar } from '@/components/Navbar'
import { SidebarRoutes } from '@/components/SidebarRoutes'
import { Toaster } from "@/components/ui/sonner" // Importa el Toaster

export default function layoutDashboard({children}:{children: React.ReactNode}) {
  return (
    <div className='flex w-full h-full'>
        <div className="w-80 hidden lg:block h-full bg-card">
            <SidebarRoutes/>
        </div>
        <div className="w-full h-full bg-background">
          <Navbar/>
          <div className="p-4">
              {children}
          </div>
        </div>
        <Toaster richColors expand={true}/>
    </div>
  )
}