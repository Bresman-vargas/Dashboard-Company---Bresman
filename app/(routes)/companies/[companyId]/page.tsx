import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Header } from "./component/Header";
import { FooterCompany } from "./component/FooterCompany";
import { CompanyInformation } from "./component/CompanyInformation";

// Define the props type as a Promise
interface CompanyPageProps {
  params: Promise<{
    companyId: string;
  }>;  // Ensure params is a Promise
}

// Export the function as default directly
export default async function CompanyIdPage({ params }: CompanyPageProps) {
  const { userId } = await auth();

  // Redirect if the user is not authenticated
  if (!userId) {
    console.log("Unauthorized access attempt. Redirecting...");
    return redirect("/");  // Redirect should be handled properly in the server-side logic
  }

  // Await the params
  const { companyId } = await params;

  // Fetch company details from the database
  const company = await db.company.findUnique({
    where: {
      id: companyId,
      userId
    }
  });

  // If no company is found or the user does not own the company
  if (!company) {
    return redirect("/");  // Redirect if the company does not exist or user does not own it
  }

  return (
    <div>
      <Header />
      <CompanyInformation company={company} />
      <FooterCompany companyId={company.id} />
    </div>
  );
}