import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: Promise<{ companyId: string }> }) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    const data = await req.json();

    // Await params to extract companyId
    const { companyId } = await params;  // Await the params as it's a Promise

    const company = await db.company.findUnique({
      where: {
        id: companyId,  // Use the awaited companyId
      },
    });

    if (!company) {
      return new NextResponse("Company not found", { status: 404 });
    }

    // Create contact
    const contact = await db.contact.create({
      data: {
        companyId: companyId,
        ...data,
      },
    });

    return NextResponse.json(contact);
  } catch (error) {
    console.error("[COMPANY] Error:", error); // Log more detailed
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 });
    }
    return new NextResponse("Internal Error", { status: 500 });
  }
}