import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req:Request){
    try {

        const { role } = await req.json();

        if(!role){
            return NextResponse.json(
                {error:'Invalid Properties'},
                {status:400}
            )
        }

        const result  = await prisma.user.findMany({
            where : {
                role : role
            }
        })

        if(!result){
            return NextResponse.json(
                {error:'No user with the role'},
                {status:400}
            )
        }

        return NextResponse.json(
            {message:'User Founded with role',data:result},
            {status:200}
        )
        
    } catch (error) {
        console.log(`Issue occured while fetching User detail: ${error}`)
        return NextResponse.json(
            {error:`Issue occured while fetching User detail: ${error}`},
            {status:500}
        )
    }
}