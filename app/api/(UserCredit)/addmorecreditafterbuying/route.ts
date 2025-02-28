import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function PUT(req:Request) {
    try {

        const clerkuser = await currentUser()

        if(!clerkuser){
            return NextResponse.json(
                {error:`UnAuthorisied User`},
                {status:400}
            )
        }

        const updatedCredit = await prisma.userCredit.update({
            where: {
                userid : clerkuser?.id
            },
            data: {
                initialCredit : 3
            }
        })

        if(!updatedCredit){
            return NextResponse.json(
                {error:'Failed to Update user credit.'},
                {status:400}
            )
        }

        return NextResponse.json(
            {message:'User credit updated.',data:updatedCredit},
            {status:200}
        )
        
    } catch (error) {
        return NextResponse.json(
            {message:`Failed to update User credit: ${error}`},
            {status:500}
        )
    }
}