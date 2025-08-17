import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(req:Request) {
    try {

        const { userId } = await req.json()

        if(!userId){
            return NextResponse.json(
                {error:`User is didn't pass`},
                {status:404}
            )
        }

        const newurl = new URL(req.url)
        const teamId = newurl.pathname.split('/')[3]
        const teammemberid = newurl.pathname.split('/')[4]

        if(!teamId){
            return NextResponse.json(
                {error:`Invlaid Property`},
                {status:400}
            )
        }

        // check if user is in a team 
        const resultIfUserIsinTeamasaMember = await prisma.teamMembers.findFirst({
            where : {
                teamId : teamId,
                userId:userId
            }
        })

        if(!resultIfUserIsinTeamasaMember){
            return NextResponse.json(
                {message:"User isn't in team."},
                {status:400}
            )
        }

        const leaveTeam = await prisma.teamMembers.delete({
            where:{
                id:teammemberid,
                teamId : teamId,
                userId : userId
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