import {db} from '@/lib/db';
import {auth} from '@clerk/nextjs/server'
import { NextResponse} from 'next/server';

export async function POST(req: Request, {params} : {params: {companyId: string}}) {
    try {
        const {userId} = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const data = await req.json();

        const company = await db.company.findUnique({
            where: {id: params.companyId },
        });

        if (!company) {
            return new NextResponse("Company not found", {status: 404});
        }

        const event = await db.event.create({
            data:{
                companyId: params.companyId,
                ... data
            }
        })
        return NextResponse.json(event);
    } catch (error) {
        console.error("[COMPANY] Error:", error); // Log más detallado
        if (error instanceof Error) {
            return new NextResponse(error.message, { status: 500 });
        }
        return new NextResponse("Internal Error", { status: 500 });
      }
}