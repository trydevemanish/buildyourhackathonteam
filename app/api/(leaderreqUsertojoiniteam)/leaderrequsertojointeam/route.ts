import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req:Request) {
    try {

        const clerkUser = await currentUser()

        if(!clerkUser){
            return NextResponse.json(
                {message:'Unauthorisied User'},
                {status:401}
            )
        }

        const { userid,teamid } = await req.json()

        if(!userid && !teamid){
            return NextResponse.json(
                {error:'Invalid Properties'},
                {status:400}
            )
        }

        const leaderReqCreated = await prisma.leaderReqUserToJoinThereTeam.create({
            data : {
                teamid : teamid,
                userid : userid,
                leaderid : clerkUser?.id
            }
        })

        if(!leaderReqCreated){
            return NextResponse.json(
                {messsage:'Issue Ocuured while making req to User'},
                {status:400}
            )
        }

        return NextResponse.json(
            {message:'Req Sended to user',data:leaderReqCreated},
            {status:201}
        )

        
    } catch (error) {
        console.log(`Issue Occured when leader make a req to the user: ${error}`)
        return NextResponse.json(
            {error:`Issue Occured when leader make a req to the user: ${error}`},
            {status:500}
        )
    }
}