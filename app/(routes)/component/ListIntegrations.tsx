import React from 'react'
import {ListCheck} from 'lucide-react'
import CustomIco from '@/components/CustomIcon'
import { ListIntegrationsTable } from './ListIntegrationsTable'

export function ListIntegrations() {
  return (
    <article className='bg-card border-border border rounded-lg px-4'>
        <header className='flex items-center gap-4'>
            <CustomIco icon= {ListCheck}/>
            <p className="text-xl font-semibold py-4">List Integrations</p>
        </header>
        
        <section>
          <ListIntegrationsTable/>
        </section>
    </article>
  )
}
