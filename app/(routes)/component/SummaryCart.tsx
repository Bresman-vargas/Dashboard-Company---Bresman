import Customico from '@/components/CustomIcon'
import CustomTooltip from '@/components/CustomTooltip';
import { LucideIcon, MoveUpRight, MoveDownRight, TrendingUp} from 'lucide-react'
import React from 'react'

interface SummaryCartProps {
    icon: LucideIcon;
    total: string;
    average: number;
    title: string;
    tooltipText: string;
    className?: string;
}

export default function SummaryCart(props: SummaryCartProps) {
    const {icon: Icon, total, average, title, tooltipText, className = '',} = props;
  return (
    <article className={`bg-card border border-border p-4 rounded-lg drop-shadow-sm ${className}`}>
        <header className="flex items-center justify-between gap-2 text-nowrap">
            <div className="flex items-center text-secondary-foreground">
                <CustomTooltip content={tooltipText}/>
                <p className='text-sm font-semibold ml-2'>{title}</p>
            </div>
            <Customico icon= {Icon}/>
        </header>
        <section className='gap-2 py-2'>
            <div className="flex items-center justify-center gap-4 ">
                <p className='text-3xl font-semibold'>${total}</p>
                <div className=" flex items-center gap-2 text-primary-foreground bg-primary px-2 w-fit h-fit rounded-lg ">
                    {average}%
                    {average < 20 && (
                        <MoveDownRight strokeWidth={3} className='size-4'/>
                    )}
                    {average > 20 && average < 70 &&(
                        <MoveUpRight strokeWidth={3} className='size-4'/>
                    )}
                    {average > 70 && (
                        <TrendingUp strokeWidth={3} className='size-4'/>
                    )}
                </div>
            </div>
        </section>
    </article>
  )
}
