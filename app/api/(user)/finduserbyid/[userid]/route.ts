import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req:Request) {
   try {
       
        const url = new URL(req.url)
        const userid = url.pathname.split('/')[3]

        if(!userid){
            return NextResponse.json(
                {message:`User id parameter is req.`},
                {status:404}
              )
        }

        // checking if user is already created.
        const user = await prisma.user.findUnique({
          where: {
            id : userid
          },
          include : {
            teamcreated : true,
            teamjoined : true,
          }
        })

        // if yes return a message of success.
        if(!user){
          return NextResponse.json(
            {message:`User doesn't exits`},
            {status:404}
          )
        }

        return NextResponse.json(
          {message:`User Found:`,data:user},
          {status:200}
        )
    
   } catch (error) {
      console.log(`Failed to found user : ${error}`)
      return NextResponse.json(
        {error:`Failed to to found user : ${error}`},
        {status:500}
      )
   }
}

