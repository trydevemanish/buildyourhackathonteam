import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(req:Request) {
    try {

        const { leaderid,teamid,userId } = await req.json()

        if(!leaderid && !teamid){
            return NextResponse.json(
                {error:`Invalid properties received`},
                {status:400}
            )
        }

        if(!userId){
          return NextResponse.json(
            {message : 'User id not passed'},
            {status:404}
          )
        }

        // checking if user is already created.
        const user = await prisma.user.findUnique({
          where: {
            id : userId
          }
        })

        // if yes return a message of success.
        if(!user){
          return NextResponse.json(
            {message:`Invalid user id`},
            {status:400}
          )
        }

        const userreqCreated = await prisma.userReqtojointeam.create({
            data : {
                leaderid : leaderid,
                userid : userId,
                teamid : teamid
            }
        })

        if(!userreqCreated){
            return NextResponse.json(
                {message:'Failed to create Use req to Join team'},
                {status:400}
            )
        }

        return NextResponse.json(
            {message:'Req Made',data:userreqCreated},
            {status:201}
        )

        
    } catch (error) {
        return NextResponse.json(
            {error:`Failed to make req to the leader: ${error}`},
            {status:500}
        )
    }
}