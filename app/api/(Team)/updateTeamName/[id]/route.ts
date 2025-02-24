// only leader can change the team Name
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function PUT(req:Request) {
    try {

        const { newTeamName } = await req.json()

        if(!newTeamName){
            return NextResponse.json(
                {error : `Invalid Property`},
                {status:404}
            )
        }

        const newurl = new URL(req.url)
        const teamId = newurl.pathname.split('/')[3]

        const clerkUser = await currentUser()

        if(!clerkUser){
            return NextResponse.json(
                {error:`UnAuthorisied User`},
                {status:401}
            )
        }

        const updateTeamName = await prisma.team.update({
            where : {
                id : teamId,
                leaderid : clerkUser?.id
            },
            data : {
                teamname : newTeamName
            }
        })

        if(!updateTeamName){
            return NextResponse.json(
                {error:`Only team leader can make changes.`},
                {status:400}
            )
        }

        return NextResponse.json(
            {message:`Team Name Updated`,data:updateTeamName},
            {status:200}
        )

        
    } catch (error) {
        console.log(`Failed To Update Team Name: ${error}`)
        return NextResponse.json(
            {error :`Failed To Update Team Name: ${error}`},
            {status:500}
        )
    }
}