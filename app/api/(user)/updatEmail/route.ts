import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function PUT(req : Request){
    try {

        const { newEmail } = await req.json()

        if(!newEmail){
            return NextResponse.json(
                {error : `Invalid Email Field`},
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

        const UpdatedEmail = await prisma.user.update({
            where : {
                id : authUser?.id
            },
            data : {
                email : newEmail
            }
        })

        if(!UpdatedEmail){
            return NextResponse.json(
                {error:`Failed Updating Email.`},
                {status:400}
            )
        }

        return NextResponse.json(
            {message:'Email Updated Success',data: UpdatedEmail},
            {status:200}
        )
        
    } catch (error) {
        console.log(`Failed to Update Email: ${error}`)
        return NextResponse.json(
            {error : `Failed to Update Email: ${error}`},
            {status : 500}
        )
    }
}