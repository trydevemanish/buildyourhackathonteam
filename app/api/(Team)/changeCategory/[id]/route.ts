import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function PUT(req:Request) {
    try {

        const { newCategory } = await req.json()

        if(!newCategory){
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

        const updateCategory = await prisma.team.update({
            where : {
                id : teamId,
                leaderid : clerkUser?.id
            },
            data : {
                category : newCategory
            }
        })

        if(!updateCategory){
            return NextResponse.json(
                {error:`Only team leader can make changes.`},
                {status:400}
            )
        }

        return NextResponse.json(
            {message:`Category Updated`,data:updateCategory},
            {status:200}
        )

        
    } catch (error) {
        console.log(`Failed To Update Category: ${error}`)
        return NextResponse.json(
            {error :`Failed To Update Category: ${error}`},
            {status:500}
        )
    }
}