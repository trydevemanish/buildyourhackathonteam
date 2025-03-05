import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req:Request) {
    try {

        const clerkUser = await currentUser()
        
        if(!clerkUser){
            return NextResponse.json(
                {error:`UnAuthorisied User`},
                {status:401}
            )
        }

        const { teamid,leaderid } = await req.json()

        if(!teamid && !leaderid){
            return NextResponse.json(
                {error:`Invalid prop`},
                {status:400}
            )
        }

        const reqCreated = await prisma.userReqtojointeam.create({
            data : {
                leaderid : leaderid,
                teamid : teamid,
                userid : clerkUser?.id
            }
        })

        if(!reqCreated){
            return NextResponse.json(
                {error:`Failed to create req. `},
                {status:400}
            )
        }

        return NextResponse.json(
            {message:'Req generated success.',data:reqCreated},
            {status:201}
        )
        
    } catch (error) {
        console.log(`Issue Occured for creating req: ${error}`)
        return NextResponse.json(
            {error : `Issue Occured for creating req: ${error}`},
            {status:500}
        )
    }
}