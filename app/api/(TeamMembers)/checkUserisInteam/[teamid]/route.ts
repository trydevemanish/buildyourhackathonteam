import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req:Request) {
    try {

        const url = new URL(req.url)
        const teamid = url.pathname.split('/')[3]

        if(!teamid){
            return NextResponse.json(
                {message:'Invalid teamid'},
                {status:400}
            )
        }

        const { userid } = await req.json()

        if(!userid){
            return NextResponse.json(
                {message:'Invalid Property'},
                {status:400}
            )
        }

        const resultIfUserIsinTeamasaMember = await prisma.teamMembers.findFirst({
            where : {
                teamId : teamid,
                userId:userid
            }
        })

        if(!resultIfUserIsinTeamasaMember){
            return NextResponse.json(
                {message:"User isn't in team."},
                {status:400}
            )
        }

        return NextResponse.json(
            {message:'User is present in team.',data:resultIfUserIsinTeamasaMember},
            {status:200}
        )
        
    } catch (error) {
        return NextResponse.json(
            {message:`Issue Occured while checking if user is in team: ${error}`},
            {status:500}
        )
    }
}9