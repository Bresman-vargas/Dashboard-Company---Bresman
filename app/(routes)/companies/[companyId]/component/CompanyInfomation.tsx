import React from 'react'
import { Company } from '@prisma/client'
import {Building2, User} from 'lucide-react'
import CustomIcon from '@/components/CustomIcon'
import { CompanyForm } from './CompanyForm'
import { NewContact } from './NewContact'
import { ListContact } from './ListContact'
interface CompanyInfomationProps {
  company: Company
}

export function CompanyInfomation(props: CompanyInfomationProps) {
    const {company} = props
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4'>
        <div className="border border-border rounded-lg bg-background p-4">
            <div className="flex items-center gap-4 mb-2">
              <CustomIcon icon= {Building2}/>
              <p className='font-semibold'>Contact</p>
            </div>
            <CompanyForm company={company}/>
        </div>
        <div className="border border-border rounded-lg bg-background p-4 h-fit">
            <div className="flex items-center justify-between gap-4 mb-2">
                <div className="flex items-center gap-4">
                    <CustomIcon icon= {User}/>
                    <p className='font-semibold'>Contact</p>
                </div>
                <NewContact/>
            </div>
            <ListContact company={company}/>
        </div>

    </div>
  )
}
