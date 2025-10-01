// need to do pagination 
// fetch only neccessary field using include

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req:Request) {
    try {

        await auth.protect()
        const { userId } = await auth()

        if (!userId) {
          return NextResponse.json({ message: 'Error: No signed in userid' }, { status: 401 })
        }

        const userjoinedteamsasmembers = await prisma.teamMembers.findMany({
            where : {
                userId : userId
            },
            include : {
                team : true
            }
        })

        if(!userjoinedteamsasmembers){
            return NextResponse.json(
                {error : `No Joined team.`},
                {status:400}
            )
        }

        return NextResponse.json(
            {message : `User Teams detail.`,data : userjoinedteamsasmembers},
            {status:200}
        )
        
    } catch (error) {
        console.log(`Failed To Get User Team: ${error}`)
        return NextResponse.json(
            {error :`Failed To Get User Team: ${error}`},
            {status:500}
        )
    }
}