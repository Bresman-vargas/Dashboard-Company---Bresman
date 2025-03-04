import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    const data = await req.json();

    await db.company.create({
      data: {
        userId,
        ...data,
      },
    });
    
    const companies = await db.company.findMany({
      where: { userId },
    });

    return NextResponse.json(companies);
  } catch (error) {
    console.error("[COMPANY] Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}