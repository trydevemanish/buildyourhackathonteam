import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req:Request){
    try {

        const { text } = await req.json();

        if(!text){
            return NextResponse.json(
                {error:'Invalid Properties'},
                {status:400}
            )
        }

        const result  = await prisma.user.findMany({
            where : {
                name : {
                    startsWith : text
                }
            }
        })

        if(!result){
            return NextResponse.json(
                {error:'No user with the name'},
                {status:400}
            )
        }

        return NextResponse.json(
            {message:'User Founded with name',data:result},
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