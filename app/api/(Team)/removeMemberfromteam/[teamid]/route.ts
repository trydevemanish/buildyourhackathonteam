import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


// only leader will be able to remove user
export async function DELETE(req:Request) {
    try {

        const { useridToberemoved,userId } = await req.json()


        if(!userId){
            return NextResponse.json(
                {error : `User id not passed who is trying to remove the another user.`},
                {status:404}
            )
        }

        const newurl = new URL(req.url)
        const teamid = newurl.pathname.split('/')[3]
        const teammemberid = newurl.pathname.split('/')[4]

        //check if user is leader
        const checkUserisleader = await prisma.team.findUnique({
            where : {
                id : teamid,
                leaderid : userId
            }
        })

        if(!checkUserisleader){
            return NextResponse.json(
                {error :'Only Leader can Remove user.'},
                {status : 400}
            )
        }

        // const id = '2'

       const removeUser = await prisma.teamMembers.delete({
            where : {
                id: teammemberid,
                teamId : teamid,
                userId : useridToberemoved,
            }
       })

       if(!removeUser){
            return NextResponse.json(
                {error :'Something went Wrong While removing User'},
                {status : 400}
            )
       }

       return NextResponse.json(
        {message :'User removed',data : removeUser},
        {status : 400}
       )

        
    } catch (error) {
        console.log(`Failed To Remove User: ${error}`)
        return NextResponse.json(
            {error :`Failed To Remove User: ${error}`},
            {status:500}
        )
    }
}