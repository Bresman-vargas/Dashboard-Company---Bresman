import { Input} from "@/components/ui/input"
import {PanelLeftOpen, Search} from "lucide-react"
import {UserButton} from "@clerk/nextjs"
import { SidebarRoutes } from "@/components/SidebarRoutes"
import {Logo} from '@/components/Logo'
import {ToggleTheme} from '@/components/ui/toggleTheme'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle
  } from "@/components/ui/sheet"
import React from 'react'

export function Navbar() {
  return (
    <div className="bg-card border-b border-border flex justify-between items-center gap-4 h-16 px-4 drop-shadow-sm">
        <div className="block lg:hidden">
            <Sheet>
                <SheetTrigger>
                    <PanelLeftOpen/>
                </SheetTrigger>
                <SheetContent side="left" className="p-0">
                    <SheetTitle className="hidden"><Logo/></SheetTitle>
                    <SidebarRoutes/>
                </SheetContent>
            </Sheet>
        </div>
        <div className="flex items-center relative w-[300px]">
            <Input placeholder="Search" className="bg-background transition-none"/>
            <Search className="absolute right-2 size-5" />
        </div>
        <div className="flex items-center gap-4">
            <ToggleTheme/>
            <UserButton/>
        </div>
    </div>
  )
}
