import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

//delete every data of user

export async function DELETE(_req:Request) {
    try {

        const authUser = await currentUser()

        if(!authUser){
            return NextResponse.json(
                {error:`Unauthorizied User.`},
                {status:401}
            )
        }

        //delete User From database
        const deleteUser = await prisma.user.delete({
            where : {
                id : authUser?.id
            }
        })

        //delete teams User created
        const deleteALlTeamsUserCreated = await prisma.team.deleteMany({
            where : {
                leaderid : authUser?.id
            }
        })

        // remove user from all the team User joined 
        const removefromteam = await prisma.teamMembers.deleteMany({
            where : {
                userId : authUser?.id
            }
        })

        if(!deleteUser && !deleteALlTeamsUserCreated && !removefromteam){
            return NextResponse.json(
                {message : `Something went wrong while deleting user.`},
                {status:400}
            )
        }

        return NextResponse.json(
            {message : 'User Deleted With its all Data.',data : {
                deleteUser : deleteUser,
                deleteALlTeamsUserCreated : deleteALlTeamsUserCreated,
                removefromteam : removefromteam
            }},
            {status:200}
        )

    } catch (error) {
        console.log(`Failed to Update Role: ${error}`)
        return NextResponse.json(
            {error : `Failed to Update Role: ${error}`},
            {status : 500}
        )
    }
}