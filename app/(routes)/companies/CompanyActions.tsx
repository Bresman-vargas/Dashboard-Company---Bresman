'use client';

import Link from "next/link";
import { PencilLine, Trash2, Ellipsis } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { DeleteCompanyDialog } from "../../../components/DeleteCompaniesDialog"

export function CompanyActions({ companyId }: { companyId: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-8 p-0">
          <span className="sr-only">Open menu</span>
          <Ellipsis className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Link href={`/companies/${companyId}`} passHref>
          <DropdownMenuItem className="cursor-pointer">
            <PencilLine className="mr-2 size-4" />
            Edit company
          </DropdownMenuItem>
        </Link>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem 
              className="cursor-pointer text-red-500"
              onSelect={(e) => {
                e.preventDefault();
              }}
            >
              <Trash2 className="mr-2 size-4" />
              Delete company
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <DeleteCompanyDialog companyId={companyId}/>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}