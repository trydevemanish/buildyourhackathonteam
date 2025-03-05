import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req:Request) {
    try {

        const clerkuser = await currentUser()

        if(!clerkuser){
            return NextResponse.json(
                {error:'UnAuthorisied User.'},
                {status:401}
            )
        }

        const userNotification = await prisma.userReqtojointeam.findMany({
            where : {
                leaderid : clerkuser?.id
            },
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
            {message:'fetched User notifications.',data:userNotification},
            {status:200}
        )
        
    } catch (error) {
        console.log(`Issue ocuured when fetching notification: ${error}`)
        return NextResponse.json(
            {error:`Issue ocuured when fetching notification: ${error}`},
            {status:500}
        )
    }
}