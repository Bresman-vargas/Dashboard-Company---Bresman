import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request, { params }: { params: Promise<{ companyId: string }> }) {
    try {
        const { userId } = await auth();

        // Ensure user is authenticated
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Parse the request body
        const data = await req.json();

        // Await params to properly access companyId
        const { companyId } = await params; // Await params here

        // Retrieve the company using the companyId from params
        const company = await db.company.findUnique({
            where: { id: companyId },
        });

        // Check if company exists
        if (!company) {
            return new NextResponse("Company not found", { status: 404 });
        }

        // Create a new event associated with the company
        const event = await db.event.create({
            data: {
                companyId: companyId, // Using the companyId from params
                ...data,
            },
        });

        // Return the newly created event
        return NextResponse.json(event);
    } catch (error) {
        console.error("[COMPANY] Error:", error); // Detailed log for errors
        if (error instanceof Error) {
            return new NextResponse(error.message, { status: 500 });
        }
        return new NextResponse("Internal Error", { status: 500 });
    }
}
