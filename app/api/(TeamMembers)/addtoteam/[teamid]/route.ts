import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req:Request) {
    try {

        const newurl = new URL(req.url)
        const teamId = newurl.pathname.split('/')[3]

        if(!teamId){
            return NextResponse.json(
                {error:`Invlaid Property`},
                {status:400}
            )
        }

        const clerkUser = await currentUser()

        const newMember = await prisma.teamMembers.create({
            data:{
                teamId : teamId,
                userId : clerkUser?.id!,
            }
        })

        if(!newMember){
            return NextResponse.json(
                {message : 'Something went wrong while adding user to team'},
                {status:400}
            )
        }

        return NextResponse.json(
            {message : 'User Added to team.',data : newMember},
            {status:201}
        )
        
    } catch (error) {
        console.log(`Failed To Add User to Team: ${error}`)
        return NextResponse.json(
            {error :`Failed To Add User to Team: ${error}`},
            {status:500}
        )
    }   
}