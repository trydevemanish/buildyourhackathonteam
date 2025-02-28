import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req:Request) {
    try {

        const clerkuser = await currentUser()

        if(!clerkuser){
            return NextResponse.json(
                {error:`UnAuthorisied User`},
                {status:400}
            )
        }

        const userCredit = await prisma.userCredit.findUnique({
            where : {
                userid : clerkuser?.id
            }
        })

        if(!userCredit){
            return NextResponse.json(
                {message:`Can't find user credit.`},
                {status:400}
            )
        }

        return NextResponse.json(
            {message:`Find User credit: `,data:userCredit},
            {status:200}
        )
        
    } catch (error) {
        return NextResponse.json(
            {error:`Failed to find User total Credit: ${error}`},
            {status:500}
        )
    }
}