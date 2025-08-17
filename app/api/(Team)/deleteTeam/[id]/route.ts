import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";

export async function DELETE(req:Request) {
    try {

        const newurl = new URL(req.url)
        const teamId = newurl.pathname.split('/')[3]

        const { userId } = await req.json()

        const clerkUser = await (await clerkClient()).users.getUser(userId)

        if(!clerkUser){
            return NextResponse.json(
                {error:`UnAuthorisied User`},
                {status:401}
            )
        }

        const deleteTeam = await prisma.team.delete({
            where : {
                id : teamId,
                leaderid : clerkUser?.id
            }
        })

        if(!deleteTeam){
            return NextResponse.json(
                {error:`Only team leader can make changes.`},
                {status:400}
            )
        }

        return NextResponse.json(
            {message:`Team deleted.`,data:deleteTeam},
            {status:200}
        )

        
    } catch (error) {
        console.log(`Failed To Team deleted: ${error}`)
        return NextResponse.json(
            {error :`Failed To Team deleted: ${error}`},
            {status:500}
        )
    }
}