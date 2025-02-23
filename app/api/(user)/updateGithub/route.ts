import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function PUT(req : Request){
    try {

        const { newGithub } = await req.json()

        if(!newGithub){
            return NextResponse.json(
                {error : `Invalid Github Field`},
                {status:404}
            )
        }

        const authUser = await currentUser()

        if(!authUser){
            return NextResponse.json(
                {error:`Unauthorizied User.`},
                {status:401}
            )
        }

        let user = await prisma.user.findUnique({
            where : {
                id : authUser?.id
            }
        })

        if(!user){
            user = await prisma.user.create({
                data : {
                    id : authUser?.id,
                    name : authUser?.firstName || `new User`,
                    email : authUser?.emailAddresses[0].emailAddress,
                }
            })
        }

        const UpdatedGithub = await prisma.user.update({
            where : {
                id : authUser?.id
            },
            data : {
                github : newGithub
            }
        })

        if(!UpdatedGithub){
            return NextResponse.json(
                {error:`Failed Updating Github.`},
                {status:400}
            )
        }

        return NextResponse.json(
            {message:'Github Updated',data: UpdatedGithub},
            {status:200}
        )
        
    } catch (error) {
        console.log(`Failed to Update Github: ${error}`)
        return NextResponse.json(
            {error : `Failed to Update Github: ${error}`},
            {status : 500}
        )
    }
}