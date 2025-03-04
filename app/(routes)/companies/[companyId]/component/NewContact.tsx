"use client"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { FormContact } from './FormContact'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTrigger,
    DialogTitle,
    DialogHeader,
} from "@/components/ui/dialog"
export function NewContact() {
    const [isOpen, setIsOpen] = useState(false)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
            <Button>Add Contact</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add Contact</DialogTitle>
                <DialogDescription>Add a new contact to the company</DialogDescription>
            </DialogHeader>
            <div>
                <FormContact/>
            </div>
        </DialogContent>
    </Dialog>
  )
}
