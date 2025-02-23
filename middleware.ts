import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "./lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function handlers(req:Request) {
   try {

        const Clerkuser = await currentUser()

        if(!Clerkuser){
          return NextResponse.json(
            {error:`Unauthorized User`},
            {status:401}
          )
        }

        let user = await prisma.user.findUnique({
          where: {
            id : Clerkuser?.id
          }
        })

        if(user){
          return NextResponse.json(
            {message:`User is Already Created.`},
            {status:200}
          )
        }

        user = await prisma.user.create({
          data: {
            id : Clerkuser?.id,
            name : Clerkuser?.fullName || "New User",
            email : Clerkuser?.emailAddresses[0]?.emailAddress
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




export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};