import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try {

    } catch (error) {
        console.log(`Issue Occured while fetching reject req: ${error}`)
        return NextResponse.json(
            {error:`Issue Occured while fetching reject req: ${error}`},
            {status:500}
        )
    }
}