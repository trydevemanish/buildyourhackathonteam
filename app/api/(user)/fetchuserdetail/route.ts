import { NextResponse } from "next/server";
import { currentUser } from '@clerk/nextjs/server'

export async function GET(req : Request){
    try {

        const user = await currentUser()

        if(!user){
            return NextResponse.json(
                {error : `User is Logged out`},
                {status: 400}
            )
        }

        console.log("User Founded",user)

        return NextResponse.json(
            {message : `Fetched User Data`, data : user},
            {status : 200}
        )

        
    } catch (error) {
      console.log("Fetching User Detail Failed",error)   
      return NextResponse.json(
        {error : `Fetching User Detail Failed: ${error}`},
        {status: 500}
      )
    }
}