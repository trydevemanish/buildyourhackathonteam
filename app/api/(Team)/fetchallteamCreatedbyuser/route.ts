// need to do pagination 
// fetch only neccessary field using include

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(_req:Request) {
    try {

        const { userId } = await auth()

        console.log('authorised user id in find all team created by user',userId)
        
        if(!userId){
            return NextResponse.json(
                {error : `Unauthorized User`},
                {status:401}
            )
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