import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req:Request) {
    try {

        
        
    } catch (error) {
        console.log(`Failed To Create Team: ${error}`)
        return NextResponse.json(
            {error :`Failed To Create Team: ${error}`},
            {status:500}
        )
    }
}