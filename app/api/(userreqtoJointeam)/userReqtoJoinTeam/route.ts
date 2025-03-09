import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req:Request) {
    try {

        const { leaderid,teamid } = await req.json()

        if(!leaderid && !teamid){
            return NextResponse.json(
                {error:`Invalid properties received`},
                {status:400}
            )
        }

        const clerkuser = await currentUser()

        if(!clerkuser){
            return NextResponse.json(
                {error:'Unauthoriseied User'},
                {status:400}
            )
        }

        const userreqCreated = await prisma.userReqtojointeam.create({
            data : {
                leaderid : leaderid,
                userid : clerkuser?.id,
                teamid : teamid
            }
        })

        if(!userreqCreated){
            return NextResponse.json(
                {message:'Failed to create Use req to Join team'},
                {status:400}
            )
        }

        return NextResponse.json(
            {message:'Req Made',data:userreqCreated},
            {status:201}
        )

        
    } catch (error) {
        return NextResponse.json(
            {error:`Failed to make req to the leader: ${error}`},
            {status:500}
        )
    }
}