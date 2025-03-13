import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req:Request) {
    try {

        const url = new URL(req.url)
        const teamid = url.pathname.split('/')

        if(!teamid){
            return NextResponse.json(
                {message:'Team id is neccessary'},
                {status:400}
            )
        }

        const teamdata = await prisma.team.findUnique({
            where : {
                id : teamid[3]
            },
            include : {
                members : true
            }
        })

        if(!teamdata){
            return NextResponse.json(
                {error:`Invalid team id.`},
                {status:400}
            )
        }

        return NextResponse.json(
            {message:`Team data fetched.`,data:teamdata},
            {status:200}
        )

        
    } catch (error) {
        console.log(`Failed To get teamdata: ${error}`)
        return NextResponse.json(
            {error :`Failed To get teamdata: ${error}`},
            {status:500}
        )
    }
}