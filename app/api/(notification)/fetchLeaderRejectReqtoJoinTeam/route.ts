import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(req:Request) {
    try {

        const clerkUser  = await currentUser()

        if(!clerkUser){
            return NextResponse.json(
                {error:'Unauthorisied user'},
                {status:401}
            )
        }

        // this will fetch the rejected req of user only by leaders.
        const userRejectreq  = await prisma.userReqtojointeam.findMany({
            where:{
                userid : clerkUser?.id,
                status : 'REJECTED'
            }
        })

        if(!userRejectreq){
            return NextResponse.json(
                {message:'No reject req'},
                {status:400}
            )
        }

        return NextResponse.json(
            {message:'Fetched rejected req.',data:userRejectreq},
            {status:200}
        )
        

    } catch (error) {
        console.log(`Issue Occured while fetching reject req: ${error}`)
        return NextResponse.json(
            {error:`Issue Occured while fetching reject req: ${error}`},
            {status:500}
        )
    }
}