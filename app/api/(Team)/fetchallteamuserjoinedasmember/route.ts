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

        const userjoinedteamsasmembers = await prisma.teamMembers.findMany({
            where : {
                userId : clerkUser?.id
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