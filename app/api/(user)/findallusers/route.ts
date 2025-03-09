import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req:Request) {
    try {

        const userdata = await prisma.user.findMany({
            orderBy : {
                name : 'asc'
            }
        })

        if(!userdata){
            return NextResponse.json(
                {error:'Failed to fetch all users'},
                {status:400}
            )
        }

        return NextResponse.json(
            {message :'Users Data find.',data:userdata},
            {status:200}
        )
        
    } catch (error) {
        console.log(`Failed to Find users: ${error}`)
        return NextResponse.json(
            {error :`Failed to Find users: ${error}`},
            {status : 500}
        )
    }
}