import {db} from '@/lib/db';
import {auth} from '@clerk/nextjs/server'
import { NextResponse} from 'next/server';

export async function DELETE(req: Request, { params }: { params: { companyId: string, eventId: string } }) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const deletedEvent = await db.event.delete({
            where: {
                id: params.eventId
            }
        });

        return NextResponse.json(deletedEvent);
    } catch (error) {
        console.error("[DELETE EVENT] Error:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}