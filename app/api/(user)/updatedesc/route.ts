import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function PUT(req : Request){
    try {

        const { newbio } = await req.json()

        if(!newbio){
            return NextResponse.json(
                {error : `Invalid Bio Field`},
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

        const UpdatedBio = await prisma.user.update({
            where : {
                id : authUser?.id
            },
            data : {
                bio : newbio
            }
        })

        if(!UpdatedBio){
            return NextResponse.json(
                {error:`Failed Updating Bio.`},
                {status:400}
            )
        }

        return NextResponse.json(
            {message:'Bio Updated',data: UpdatedBio},
            {status:200}
        )
        
    } catch (error) {
        console.log(`Failed to Update Bio: ${error}`)
        return NextResponse.json(
            {error : `Failed to Update Bio: ${error}`},
            {status : 500}
        )
    }
}