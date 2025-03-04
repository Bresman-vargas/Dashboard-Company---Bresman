import { Company } from "@prisma/client"
import {db} from "@/lib/db"
import {auth} from "@clerk/nextjs/server"
import {redirect} from "next/navigation"
import {Phone, Mail} from "lucide-react"
import { Separator } from "@/components/ui/separator"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface ListContactProps {
    company: Company
}
export async function ListContact(props: ListContactProps) {
    const {company} = props
    const {userId} =  await auth()
    if(!userId) {
        return redirect("/")
    }
    const contacts = await db.contact.findMany({
        where: {
            companyId: company.id
        }
    })
    if(contacts.length === 0) {
        return <p>No contact</p>
    }

  return (
    <div>
        <div className="grid grid-cols-3 justify-between gap-2 bg-secondary mb-2 py-1 font-semibold rounded-t-lg px-2" >
            <p>Name</p>
            <p>Role</p>
            <p className="text-center">Contact</p>
        </div>
        {contacts.map(contact => (
            <div key={contact.id}>
                <div className="grid grid-cols-3 justify-between gap-2 px-2">
                    <p className="text-nowrap truncate">{contact.name}</p>
                    <p className="text-nowrap truncate">{contact.role}</p>
                    <div className="flex gap-4 justify-center items-center">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger><Phone strokeWidth={2} className="size-4"/></TooltipTrigger>
                                <TooltipContent>
                                <p>{contact.phone}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger><Mail strokeWidth={2} className="size-4"/></TooltipTrigger>
                                <TooltipContent>
                                <p>{contact.email}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
                <Separator className="my-2"/>
            </div>
        ))}
    </div>
  )
}
