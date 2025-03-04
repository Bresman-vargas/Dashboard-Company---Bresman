import React from 'react'
import {ChartPie} from 'lucide-react'
import CustomIco from '@/components/CustomIcon'
import {TotalSuscribersPie} from './TotalSuscribersPie'

export function TotalSuscribers() {
  return (
    <article className='bg-card border-border border rounded-lg px-4 flex flex-col'>
        <header className='flex items-center gap-4 pt-4'>
            <CustomIco icon={ChartPie} />
            <p className="text-xl font-semibold">Last Suscribers</p>
        </header>
        
        <section className='flex items-center justify-center flex-grow'>
            <TotalSuscribersPie />
        </section>
    </article>
  )
}
