'use client'
import {Button} from '@/components/ui/button'
import {Trash2} from 'lucide-react'

import {
    AlertDialog,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {DeleteCompanyDialog} from '@/components/DeleteCompaniesDialog'
interface FooterCompanyPros  {
    companyId: string
}

export function FooterCompany(props: FooterCompanyPros) {
    const {companyId} = props
  return (
    <div className='py-4 flex'>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive"><Trash2/>Delete Company</Button>
          </AlertDialogTrigger>
          <DeleteCompanyDialog companyId={companyId}/>
        </AlertDialog>
    </div>
  )
}
