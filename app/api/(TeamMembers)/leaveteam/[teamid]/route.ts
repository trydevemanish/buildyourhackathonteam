import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function DELETE(req:Request) {
    try {

        const clerkUser = await currentUser()

        if(!clerkUser){
            return NextResponse.json(
                {error:`UnAuthorisied User`},
                {status:401}
            )
        }

        const newurl = new URL(req.url)
        const teamId = newurl.pathname.split('/')[3]

        if(!teamId){
            return NextResponse.json(
                {error:`Invlaid Property`},
                {status:400}
            )
        }

        const leaveTeam = await prisma.teamMembers.delete({
            where:{
                teamId : teamId,
                userId : clerkUser?.id
            }
        })

        if(!leaveTeam){
            return NextResponse.json(
                {message : 'Something went wrong while leaving team'},
                {status:400}
            )
        }

        return NextResponse.json(
            {message : 'User leaved the team.',data : leaveTeam},
            {status:201}
        )
        
    } catch (error) {
        console.log(`Failed To leave team: ${error}`)
        return NextResponse.json(
            {error :`Failed To leave team: ${error}`},
            {status:500}
        )
    }   
}