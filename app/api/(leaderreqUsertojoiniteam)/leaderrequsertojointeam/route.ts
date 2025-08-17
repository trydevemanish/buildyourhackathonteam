import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try {

        const { userid,teamid,leaderId } = await req.json()

        if(!leaderId){
            return NextResponse.json(
                {error:'Invalid leader id'},
                {status:400}
            )
        }

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
                leaderid : leaderId
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