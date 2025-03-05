import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request, 
    context: { params: Promise<{ companyId: string; eventId: string }> } // `params` is a Promise
) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { eventId } = await context.params;  // Await the params to extract eventId

        const deletedEvent = await db.event.delete({
            where: { id: eventId }
        });

        return NextResponse.json(deletedEvent);
    } catch (error) {
        console.error("[DELETE EVENT] Error:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

