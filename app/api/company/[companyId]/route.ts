import {db} from '@/lib/db';
import {auth} from '@clerk/nextjs/server'
import { NextResponse} from 'next/server';

export async function PATCH(req: Request, {params} : {params: {companyId: string}}) {
    try {
        const {userId} = await auth();
        const {companyId} = params;
        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const data = await req.json();

        const company = await db.company.update({
            where: {id: companyId, userId},
            data: {
                ...data,
            },
        });

        return NextResponse.json(company);
    } catch (error) {
        console.error("[COMPANY] Error:", error); // Log más detallado
        if (error instanceof Error) {
            return new NextResponse(error.message, { status: 500 });
        }
        return new NextResponse("Internal Error", { status: 500 });
      }
}

    
export async function DELETE(req: Request, {params}: {params: {companyId: string}}) {
    try {
      const { userId } = await auth();
  
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
      const {companyId} = params

      await db.contact.deleteMany({
        where: { companyId }
      });

      await db.event.deleteMany({
        where: { companyId }
      });

      const delateCompany = await db.company.delete({
        where:{
          id : companyId
        }
      })
      
      return NextResponse.json(delateCompany);
    } catch (error) {
      console.error("[DELETE COMPANY] Error:", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
}