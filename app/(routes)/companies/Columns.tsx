"use client"
import {ArrowUpDown} from 'lucide-react'
import { Company } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import {CompanyActions } from './CompanyActions'
export const columns: ColumnDef<Company>[] = [
    {
      accessorKey: "name",
      header: ({column}) => {
        return (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Company name
                <ArrowUpDown size={16} className="ml-2"/>
            </Button>
        )
      },
    },
    {
      accessorKey: "rut",
      header: "Rut/Run",
    },
    {
      accessorKey: "website",
      header: "Website",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
        accessorKey: "country",
        header: "Country",
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const {id} = row.original;
          return <CompanyActions companyId={id}/>
        }
    },
]