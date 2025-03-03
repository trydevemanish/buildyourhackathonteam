import { ConnectDb } from "@/mongoose/connections/Dbconnect";
import { NextResponse } from "next/server";
import { ChatModel } from "@/mongoose/models/chatmodels";

export async function GET(req:Request) {
    try {
        await ConnectDb()

        const url = new URL(req.url)
        const teamid = url.pathname.split('/')

        const fetchmsg = await ChatModel.find({
            teamid : teamid
        })

        if(!fetchmsg){
            return NextResponse.json(
                {error:'Issue in fetching msg from DB'},
                {status:400}
            )
        }

        return NextResponse.json(
            {messga:`Msg fetched to DB.`,data:fetchmsg},
            {status:200}
        )
        
    } catch (error) {
        return NextResponse.json(
            {error:`Failed to fetch msg to DB: ${error}`},
            {status:500}
        )
    }
}