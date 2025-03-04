'use client'
import { Dispatch, SetStateAction } from "react"
import { Company } from '@prisma/client'

import {
    Dialog,
    DialogContent,
    // DialogDescription,
    // DialogFooter,
    DialogHeader,
    DialogTitle,
    // DialogTrigger,
} from "@/components/ui/dialog"
import { FormEvent } from "./FormEvent"

interface ModalAddEventProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    setOnSaveNewEvent: Dispatch<SetStateAction<boolean>>;
    companies: Company[];
    setNewEvent: Dispatch<
        SetStateAction<{
            eventName: string;
            companySelected: { name: string; id: string };
        }>
    >;
}

export function ModalAddEvent(props: ModalAddEventProps) {
    const {open, setOpen, setOnSaveNewEvent, setNewEvent, companies} = props
  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add a new event</DialogTitle>
            </DialogHeader>
            <FormEvent setOnSaveNewEvent={setOnSaveNewEvent}  companies={companies} setOpen={setOpen} setNewEvent={setNewEvent} />
        </DialogContent>
    </Dialog>
  )
}
