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

        const { name,cardno,cvv,expiry } = await req.json()

        if(cardno != 987654321000){
            return NextResponse.json(
                {message:'Invalid Cardno.'},
                {status:400}
            )
        }

        if(cvv != 987){
            return NextResponse.json(
                {message:'Invalid cvv.'},
                {status:400}
            )
        }

        if(expiry != 10/2000){
            return NextResponse.json(
                {message:'Invalid expiry no.'},
                {status:400}
            )
        }

        const updatedCredit = await prisma.userCredit.update({
            where: {
                userid : clerkuser?.id,
                user : { 
                    name : name
                }
            },
            data: {
                initialCredit : 3
            }
        })

        if(!updatedCredit){
            return NextResponse.json(
                {error:'Invalid Name passed.'},
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