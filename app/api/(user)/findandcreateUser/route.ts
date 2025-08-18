import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { clerkClient, currentUser } from "@clerk/nextjs/server";

export async function POST(req:Request) {
   try {

        const { userId } = await req.json();

        console.log('user id in the route.ts file',userId)
        
        const AuthUser = await currentUser()

        // checking if user is already created.
        const user = await prisma.user.findUnique({
          where: {
            id : userId || AuthUser?.id
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
        const clerkUser = await (await clerkClient()).users.getUser(userId || AuthUser?.id)

        if(!clerkUser){
          return NextResponse.json(
            {error:`User id is invalid or maybe unauthorised user`},
            {status:400}
          )
        }

        console.log('Creating a new User')
        //otherwise create a new User.
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
        {error:`Failed To add User To DB : ${error}`},
        {status:500}
      )
   }
}

