import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function PUT(req : Request){
    try {

        const { newRole } = await req.json()

        if(!newRole){
            return NextResponse.json(
                {error : `Invalid Role Field`},
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

        const UpdatedRole = await prisma.user.update({
            where : {
                id : authUser?.id
            },
            data : {
                role : newRole
            }
        })

        if(!UpdatedRole){
            return NextResponse.json(
                {error:`Failed Updating Role.`},
                {status:400}
            )
        }

        return NextResponse.json(
            {message:'Role Updated',data: UpdatedRole},
            {status:200}
        )
        
    } catch (error) {
        console.log(`Failed to Update Role: ${error}`)
        return NextResponse.json(
            {error : `Failed to Update Role: ${error}`},
            {status : 500}
        )
    }
}