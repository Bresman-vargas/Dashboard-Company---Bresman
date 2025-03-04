'use client'
import React from 'react'
import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { FormCreateCustomer } from './FormCreateCustomer/FormCreateCompany'
export function HeaderCompanies() {
    const [openModalCreate, setOpenModalCreate] = useState(false)
  return (
    <div className='flex items-center justify-between'>
        <div className="">
            <h1 className='text-xl font-semibold mb-2'>List of Companies</h1>
            <p className='text-secondary-foreground max-w-96 text-balance'>Here you will find a list of companies with relevant information about each one.</p>
        </div>
        <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
            <DialogTrigger asChild>
                <Button>Create Company</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Create Customer</DialogTitle>
                    <DialogDescription>
                        Create and configurate your customer
                    </DialogDescription>
                </DialogHeader>
                <FormCreateCustomer setOpenModalCreate={setOpenModalCreate}/>
            </DialogContent>
        </Dialog>
    </div>
  )
}
