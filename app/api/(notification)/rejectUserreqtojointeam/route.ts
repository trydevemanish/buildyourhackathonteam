import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try {

        const { userid } = await req.json()
        
    } catch (error) {
        console.log(`Issue Occured while rejecting req: ${error}`)
        return NextResponse.json(
            {error:`Issue Occured while rejecting req: ${error}`},
            {status:500}
        )
    }
}