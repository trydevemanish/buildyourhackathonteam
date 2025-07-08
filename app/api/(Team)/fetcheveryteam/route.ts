// need to do pagination 
// fetch only neccessary field using include 
// need to do all things

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_req:Request) {
    try { 

        const Allteam = await prisma.team.findMany({
            orderBy : {
                teamname : 'asc'
            }
        })

        if(!Allteam){
            return NextResponse.json(
                {error:`No team Listed`},
                {status:400}
            )
        }

        return NextResponse.json(
            {message:`All team fetched.`,data:Allteam},
            {status:200}
        )

        
    } catch (error) {
        console.log(`Failed To get allteam: ${error}`)
        return NextResponse.json(
            {error :`Failed To get allteam: ${error}`},
            {status:500}
        )
    }
}