import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { clerkClient,auth } from "@clerk/nextjs/server";

export async function GET(_req:Request) {
   try {

        await auth.protect() // show 404 error when user is unauthorised.
        const { userId } = await auth()

        if (!userId) {
          return NextResponse.json({ error: 'Error: No signed in userid' }, { status: 401 })
        }

        // checking if user is already created.
        const user = await prisma.user.findUnique({
          where: {
            id : userId
          }
        })

        if(user){
          return NextResponse.json(
            {message:`User is Already Present.`,data:user},
            {status:200}
          )
        }

        const clerkUser = await (await clerkClient()).users.getUser(userId)

        if(!clerkUser){
          return NextResponse.json(
            {error:`User id is invalid or maybe unauthorised user`},
            {status:400}
          )
        }

        const newuser = await prisma.user.create({
          data: {
            id : clerkUser.id,
            name : clerkUser.fullName || clerkUser.username || 'New User',
            email : clerkUser.emailAddresses[0].emailAddress,
            bio : 'Tell a little bit about yourself here..',
            profileurl : clerkUser.imageUrl,
          }
        })

        if(!newuser){
          return NextResponse.json(
            {error:`Issue occured when creating user`},
            {status:400}
          )
        }

        return NextResponse.json(
          {message:`User Created:`,usercreatedData:newuser},
          {status:201}
        )
    
   } catch (error) {
      console.log(`Failed To add User To DB : ${error}`)
      return NextResponse.json(
        {message:`Failed To add User To DB : ${error}`},
        {status:500}
      )
   }
}

