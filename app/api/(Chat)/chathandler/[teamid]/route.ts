import { ConnectDb } from "@/mongoose/connections/Dbconnect";
import { NextResponse } from "next/server";
import { ChatModel } from "@/mongoose/models/chatmodels";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req:Request) {
    try {
        await ConnectDb()

        const url = new URL(req.url)
        const teamid = url.pathname.split('/')

        const {message} = await req.json()

        console.log('message: ',message)

        if(!message){
            return NextResponse.json(
                {error:'Invalid msg'},
                {status:404}
            )
        }

        const clerkUser = await currentUser()

        if(!clerkUser){
            return NextResponse.json(
                {error:'UnAuthorisied User'},
                {status:400}
            )
        }

        const addmsg = await ChatModel.create({
            teamid : teamid[3],
            senderid : clerkUser?.firstName,
            createdAt : Date.now().toLocaleString(),
            message : message
        })

        if(!addmsg){
            return NextResponse.json(
                {error:'Issue in added msg to DB'},
                {status:400}
            )
        }

        return NextResponse.json(
            {message:`Msg added to DB.`,data:addmsg},
            {status:201}
        )
        
    } catch (error) {
        return NextResponse.json(
            {error:`Failed to add msg to DB: ${error}`},
            {status:500}
        )
    }
}