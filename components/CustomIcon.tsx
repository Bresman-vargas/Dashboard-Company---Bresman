import { LucideIcon } from 'lucide-react'
import React from 'react'

interface CustomicoProps {
    icon : LucideIcon;
}

export default function CustomIcon( props : CustomicoProps) {
    const {icon: Icon} = props;
  return (
    <div className='p-2 bg-secondary text-secondary-foreground rounded-lg '>
        <Icon strokeWidth={2} className='size-5' />
    </div>
  )
}
