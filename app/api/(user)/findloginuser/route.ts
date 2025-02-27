import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req:Request) {
   try {

        const userdatareceived = await currentUser()

        if(!userdatareceived){
          return NextResponse.json(
            {error:`Unauthorisied User.`},
            {status:401}
          )
        }

        // checking if user is already created.
        let user = await prisma.user.findUnique({
          where: {
            id : userdatareceived?.id
          }
        })

        // if yes return a message of success.
        if(!user){
          return NextResponse.json(
            {message:`Unknown Db error.`},
            {status:400}
          )
        }

        return NextResponse.json(
            {message:`User found: `,data:user},
            {status:200}
        )
    
   } catch (error) {
      console.log(`Failed To found user : ${error}`)
      return NextResponse.json(
        {error:`Failed To found user: ${error}`},
        {status:500}
      )
   }
}

