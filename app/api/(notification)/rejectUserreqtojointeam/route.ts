import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req:Request) {
    try {

        const { reqid,userid,teamid,leaderid } = await req.json()

        if(!userid && !leaderid && !teamid && !reqid){
            return NextResponse.json(
                {error:`Invalid Properties.`},
                {status:400}
            )
        }

        const rejectedreq = await prisma.userReqtojointeam.update({
            where : {
                id : reqid,
                teamid:teamid,
                leaderid:leaderid,
                userid:userid
            },
            data : {
                status : 'REJECTED',
                rejectionmsg: "Leader didn't accept your req."
            }
        })

        if(!rejectedreq){
            return NextResponse.json(
                {error:'failed to update rejected req'},
                {status:400}
            )
        }

        return NextResponse.json(
            {message:'User Rejected to join team',data:rejectedreq},
            {status:200}
        )

    } catch (error) {
        console.log(`Issue Occured while rejecting req: ${error}`)
        return NextResponse.json(
            {error:`Issue Occured while rejecting req: ${error}`},
            {status:500}
        )
    }
}