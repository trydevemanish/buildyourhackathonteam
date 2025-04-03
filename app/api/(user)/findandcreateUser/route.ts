import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(_req:Request) {
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
            bio : 'Add are your bio here.',
            profileurl : userdatareceived?.imageUrl,
          }
        })

        // assigning User credit here
        const initialcredit = await prisma.userCredit.create({
            data : {
                initialCredit : 3,
                userid:userdatareceived?.id
            }
        })

        if(!user){
          return NextResponse.json(
            {error:`Issue occured when creating user`},
            {status:400}
          )
        }

        if(!initialcredit){
            return NextResponse.json(
                {error:'Issue ocuured when creating user initial credit'},
                {status:400}
            )
        }

        return NextResponse.json(
          {message:`User Created:`,usercreatedData:user,userInitialCredit:initialcredit},
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

