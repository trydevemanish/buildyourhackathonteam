import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";


export async function PUT(req:Request) {
    try {

        const { newProDesc } = await req.json()

        if(!newProDesc){
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

        const updateDesc = await prisma.team.update({
            where : {
                id : teamId,
                leaderid : clerkUser?.id
            },
            data : {
                projectdesc : newProDesc
            }
        })

        if(!updateDesc){
            return NextResponse.json(
                {error:`Only team leader can make changes.`},
                {status:400}
            )
        }

        return NextResponse.json(
            {message:`Proj Desc Updated`,data:updateDesc},
            {status:200}
        )

        
    } catch (error) {
        console.log(`Failed To Update Proj Desc : ${error}`)
        return NextResponse.json(
            {error :`Failed To Update Proj Desc : ${error}`},
            {status:500}
        )
    }
}