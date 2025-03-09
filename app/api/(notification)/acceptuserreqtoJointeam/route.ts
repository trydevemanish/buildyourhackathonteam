// when accept added to the teamember model and then update the status
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req:Request) {
    try {

        const { reqid,userid,leaderid,teamid } = await req.json()

        if(!userid && !leaderid && !teamid && !reqid){
            return NextResponse.json(
                {error:`Invalid Properties.`},
                {status:400}
            )
        }

        // adding user to the team member
        const addtoteam = await prisma.teamMembers.create({
            data : {
                teamId : teamid,
                userId : userid
            }
        })

        if(!addtoteam){
            return NextResponse.json(
                {error:'Issue in adding user to the team'},
                {status:400}
            )
        }

        // updating the status in the req section
        const updateStatus = await prisma.userReqtojointeam.update({
            where : {
                id : reqid,
                teamid : teamid,
                leaderid : leaderid,
                userid : userid
            },
            data : {
                status : 'ACCEPTED'
            }
        })

        if(!updateStatus){
            return NextResponse.json(
                {error:'Issue in Updating Status of user req.'},
                {status:400}
            )
        }

        return NextResponse.json(
            {message:'User req Accepted, user added to team'},
            {status:200}
        )

        
    } catch (error) {
        console.log(`Failed to accept user req: ${error}`)
        return NextResponse.json(
            {error:`Failed to accept user req: ${error}`},
            {status:500}
        )
    }
}