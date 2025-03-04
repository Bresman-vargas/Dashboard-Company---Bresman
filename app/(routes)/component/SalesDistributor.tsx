import React from 'react'
import {ChartSpline} from 'lucide-react'
import CustomIco from '@/components/CustomIcon'
import { DistributorTable } from './DistributorTable'

export function SalesDistributor() {
  return (
    <article className='bg-card border-border border rounded-lg px-4'>
        <header className='flex items-center gap-4'>
            <CustomIco icon= {ChartSpline}/>
            <p className="text-xl font-semibold py-4">Sales Distributor</p>
        </header>
        
        <section className='mb-4'>
            <DistributorTable/>
        </section>
    </article>
  )
}
