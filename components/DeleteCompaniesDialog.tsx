'use client';

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function DeleteCompanyDialog({ companyId }: { companyId: string }) {
  const router = useRouter();

  const onDeleteCompany = async() => {
    try {
        await axios.delete(`/api/company/${companyId}`);
        toast.success('Company has been deleted');
        router.push("/companies");
    } catch (error) {
        console.log("[COMPANY]", error);
        toast.error('Company deletion failed');
    }
  }

  return (
    <AlertDialogContent>
        <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                company.
            </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDeleteCompany} className="bg-red-600 hover:bg-red-700">
                Confirm
            </AlertDialogAction>
        </AlertDialogFooter>
    </AlertDialogContent>
  );
}