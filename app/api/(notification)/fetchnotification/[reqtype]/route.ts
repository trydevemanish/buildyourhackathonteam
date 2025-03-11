import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req:Request) {
    try {
        const url = new URL(req.url)
        const reqtype = await url.pathname.split('/')[3]


        // finding all notification of req type user to leader

        if(reqtype == 'user_to_Leader'){
            const userNotification = await prisma.userReqtojointeam.findMany({
                include : {
                    user : true,
                }
            })
    
            if(!userNotification){
                return NextResponse.json(
                    {error:'Failed to fetch all notification.'},
                    {status:400}
                )
            }
    
            return NextResponse.json(
                {message:'fetched notifications.',data:userNotification},
                {status:200}
            )
        }  

        if(reqtype == 'leader_to_User'){
            const userNotification = await prisma.leaderReqUserToJoinThereTeam.findMany({
                include : {
                    user : true,
                }
            })
    
            if(!userNotification){
                return NextResponse.json(
                    {error:'Failed to fetch all notification.'},
                    {status:400}
                )
            }
    
            return NextResponse.json(
                {message:'fetched notifications.',data:userNotification},
                {status:200}
            )
        }
        
    } catch (error) {
        console.log(`Issue ocuured when fetching notification: ${error}`)
        return NextResponse.json(
            {error:`Issue ocuured when fetching notification: ${error}`},
            {status:500}
        )
    }
}