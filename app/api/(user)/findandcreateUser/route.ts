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
        if(user){
          return NextResponse.json(
            {message:`User is Already Present.`,data:user},
            {status:200}
          )
        }

        console.log('Creating a new User')
        //otherwise create a new User.
        user = await prisma.user.create({
          data: {
            id : userdatareceived?.id,
            name : userdatareceived?.fullName || "New User",
            email : userdatareceived?.emailAddresses[0].emailAddress,
            bio : 'ok'
          }
        })

        return NextResponse.json(
          {message:`User Created:`,Data:user},
          {status:201}
        )
    
   } catch (error) {
      console.log(`Failed To add User To DB : ${error}`)
      return NextResponse.json(
        {error:`Failed To add User To DB : ${error}`},
        {status:500}
      )
   }
}

