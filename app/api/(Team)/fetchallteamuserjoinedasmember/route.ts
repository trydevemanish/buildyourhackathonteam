// need to do pagination 
// fetch only neccessary field using include

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentUser,auth } from "@clerk/nextjs/server";

export async function GET(_req:NextRequest) {
    try {

        // const clerkUser = await currentUser()
        const { userId } = await auth()
         

        console.log('authorised user id in find all team joined by user',userId)

        if(!userId){
            return NextResponse.json(
                {error : `Unauthorized User`},
                {status:401}
            )
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