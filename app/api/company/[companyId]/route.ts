import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// PATCH: Update company details
export async function PATCH(req: Request, { params }: { params: Promise<{ companyId: string }> }) {
    try {
      // Authenticate the user
      const { userId } = await auth();
  
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      // Parse the request body
      const data = await req.json();
  
      // Access the companyId directly (no need to await it)
      const { companyId } = await params;
  
      // Update company details
      const company = await db.company.update({
        where: { id: companyId, userId },
        data: {
          ...data,
        },
      });
  
      // Return the updated company details
      return NextResponse.json(company);
    } catch (error) {
      console.error("[COMPANY] Error:", error); // Detailed log for errors
      if (error instanceof Error) {
        return new NextResponse(error.message, { status: 500 });
      }
      return new NextResponse("Internal Error", { status: 500 });
    }
}

// DELETE: Delete a company and associated contacts and events
export async function DELETE(req: Request, { params }: { params: Promise<{ companyId: string }> }) {
    try {
      const { userId } = await auth();
  
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      // Resolve params as a Promise
      const resolvedParams = await params;
      const { companyId } = resolvedParams; // Now companyId is available
  
      // Delete contacts associated with the companyId
      await db.contact.deleteMany({
        where: { companyId },
      });
  
      // Delete events associated with the companyId
      await db.event.deleteMany({
        where: { companyId },
      });
  
      // Delete the company
      const deletedCompany = await db.company.delete({
        where: { id: companyId },
      });
  
      return NextResponse.json(deletedCompany);
    } catch (error) {
      console.error("[DELETE COMPANY] Error:", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }