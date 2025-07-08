import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function POST(_req:Request) {
   try {

        const { userId } = await auth();

        console.log('user id in the route.ts file',userId)

        if(!userId){
          return NextResponse.json(
            {message : 'Unauthorised user'},
            {status:401}
          )
        }

        // checking if user is already created.
        let user = await prisma.user.findUnique({
          where: {
            id : userId
          }
        })

        // if yes return a message of success.
        if(user){
          return NextResponse.json(
            {message:`User is Already Present.`,data:user},
            {status:200}
          )
        }

        // const clerkUser = await clerkClient.users.getUser(userId);
        const clerkUser = await (await clerkClient()).users.getUser(userId)
        console.log('Creating a new User')
        //otherwise create a new User.
        const newuser = await prisma.user.create({
          data: {
            id : clerkUser.id,
            name : clerkUser.fullName || "New User",
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
        {error:`Failed To add User To DB : ${error}`},
        {status:500}
      )
   }
}

