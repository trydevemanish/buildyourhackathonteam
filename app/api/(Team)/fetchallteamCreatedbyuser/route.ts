// need to do pagination 
// fetch only neccessary field using include

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";           
import { auth } from "@clerk/nextjs/server";

export async function GET(req:Request) {
    try {

        await auth.protect()
        const { userId } = await auth()

        if (!userId) {
          return NextResponse.json({ error: 'Error: No signed in userid' }, { status: 401 })
        }

        const UserTeams = await prisma.team.findMany({
            where : {
                leaderid : userId
            }
        })

        if(!UserTeams){
            return NextResponse.json(
                {error : `No Valid team.`},
                {status:400}
            )
        }

        return NextResponse.json(
            {message : `User Teams detail.`,data : UserTeams},
            {status:200}
        )
        
    } catch (error) {
        console.log(`Failed To Update Category: ${error}`)
        return NextResponse.json(
            {error :`Failed To Update Category: ${error}`},
            {status:500}
        )
    }
}