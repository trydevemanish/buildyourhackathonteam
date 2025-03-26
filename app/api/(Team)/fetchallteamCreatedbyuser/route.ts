// need to do pagination 
// fetch only neccessary field using include

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(_req:Request) {
    try {

        const clerkUser = await currentUser()

        if(!clerkUser){
            return NextResponse.json(
                {error : `Unauthorized User`},
                {status:401}
            )
        }

        const UserTeams = await prisma.team.findMany({
            where : {
                leaderid : clerkUser?.id
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