import { redirect } from "next/navigation";
import {auth} from "@clerk/nextjs/server"
import {db} from "@/lib/db"
import { DataTable } from "./DataTable";
import { columns } from "./Columns";
export async function TableCompanies() {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/");
  }

  const companies = await db.company.findMany({
    where: {
      userId: String(userId),
    },
    orderBy:{
      updatedAt: "desc"
    }
  })
  return (
    <DataTable columns={columns} data={companies}/>
  )
}
