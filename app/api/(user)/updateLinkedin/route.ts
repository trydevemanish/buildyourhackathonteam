import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";

export async function PUT(req : Request){
    try {

        const { newLinkedin,userId } = await req.json()

        if(!newLinkedin){
            return NextResponse.json(
                {error : `Invalid Email Field`},
                {status:404}
            )
        }

        if(!userId){
          return NextResponse.json(
            {message : 'Unauthorised user'},
            {status:401}
          )
        }

        const authUser = await (await clerkClient()).users.getUser(userId)

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

        const updatedLinkedin = await prisma.user.update({
            where : {
                id : authUser?.id
            },
            data : {
                linkedin : newLinkedin
            }
        })

        if(!updatedLinkedin){
            return NextResponse.json(
                {error:`Failed Updating Linkedin.`},
                {status:400}
            )
        }

        return NextResponse.json(
            {message:'Linkedin Updated',data: updatedLinkedin},
            {status:200}
        )
        
    } catch (error) {
        console.log(`Failed to Update Linkedin: ${error}`)
        return NextResponse.json(
            {error : `Failed to Update Linkedin: ${error}`},
            {status : 500}
        )
    }
}