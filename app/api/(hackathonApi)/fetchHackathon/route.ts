import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try {

        const {uri1, uri2} = await req.json();

        if(!uri1 || !uri2){
            return NextResponse.json(
                {error: `Url not provided correctly`},
                {status: 400}
            )
        }

        const devpost = await fetch(uri1);
        const unstop = await fetch(uri2);

        if(!devpost || !unstop){
            return NextResponse.json(
                {error: 'response retured is wrong'},
                {status : 404}
            )
        }

        return NextResponse.json(
            {data: [await devpost.json(), await unstop.json()]},
            {status:200}
        )
        
    } catch (error) {
        console.log(`Issue Occured: Fetching hackathon data: ${error}`)
        return NextResponse.json(
            {error:`Issue Occured, Fetching hackathon data: ${error}`},
            {status:500}
        )
    }
}