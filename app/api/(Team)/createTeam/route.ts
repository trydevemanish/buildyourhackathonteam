import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req:Request) {
    try {

        const { teamname,projectname,projectdesc,hackathonname,hackathondesc } = await req.json() ?? {}

        if(!teamname && !projectname && !projectdesc && !hackathondesc && !hackathonname){
            return NextResponse.json(
                {error:`Invalid Properties.`},
                {status:404}
            )
        }

        const clerkUser = await currentUser()

        if(!clerkUser){
            return NextResponse.json(
                {error:`Unauthorisied User.`},
                {status:401}
            )
        }

        const newTeam = await prisma.team.create({
            data : {
                teamname : teamname,
                leaderid : clerkUser?.id,
                leadername:clerkUser?.firstName || 'not mentioned',
                projectname:projectname,
                projectdesc : projectdesc,
                hackathonname : hackathonname,
                hackathondesc : hackathondesc
            }
        })

        if(!newTeam){
            return NextResponse.json(
                {error:`Failed to Create Team.`},
                {status : 404}
            )
        }

        return NextResponse.json(
            {message : 'New Team Created',data:newTeam},
            {status:201}
        )

        
    } catch (error) {
        console.log(`Failed To Create Team: ${error}`)
        return NextResponse.json(
            {error :`Failed To Create Team: ${error}`},
            {status:500}
        )
    }
}