import React from 'react'
import {Grid2X2Check} from 'lucide-react'
import CustomIco from '@/components/CustomIcon'
import { CustomersTable } from './CustomersTable'

export function LastCustomers() {
  return (
    <article className='bg-card border-border border rounded-lg px-4'>
        <header className='flex items-center gap-4'>
            <CustomIco icon= {Grid2X2Check}/>
            <p className="text-xl font-semibold py-4">Last Customers</p>
        </header>
        
        <section className='mb-4'>
            <CustomersTable/>
        </section>
    </article>
  )
}
