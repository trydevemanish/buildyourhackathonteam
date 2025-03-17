import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req:Request) {
    try {

        const url = new URL(req.url)
        const teamid = url.pathname.split('/')[3]

        if(!teamid){
            return NextResponse.json(
                {message:'Invalid teamId'},
                {status:400}
            )
        }

        const teamMember = await prisma.teamMembers.findMany({
            where : {
                teamId : teamid
            },
            include  :{
                user : true
            }
        })

        if(!teamMember){
            return NextResponse.json(
                {message:'No member in team'},
                {status:400}
            )
        }

        return NextResponse.json(
            {message:'Found memebers.',data:teamMember},
            {status:200}
        )
        
    } catch (error) {
        console.log(`Issue Occured while fetching team members : ${error}`)
        return NextResponse.json(
            {error : `Issue Occured while fetching team members : ${error}` },
            {status:500}
        )
    }
}