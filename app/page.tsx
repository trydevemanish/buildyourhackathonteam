"use client"
import React from "react";
import Coding from "@/public/coding.png"
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { RedirectToSignIn } from "@clerk/nextjs";


export default function Home() {

  const { isSignedIn } = useUser()
  const router = useRouter()

  async function handleSignin() {
      if(!isSignedIn){
        return <RedirectToSignIn/>
      } else {
        router.push('/dashboard')
      }
  }

  return (
    <main>
        <div className="flex justify-between items-center p-2">
            <div className="text-xs flex gap-1">
              <p>buildyourhackathonteam</p>
              <Image src={Coding} alt="icon" className="size-4" />
            </div>
            <button className="bg-black text-white px-4 text-xs py-1 rounded" onClick={handleSignin}>
               Login
            </button>  
        </div>

        <p className="text-6xl font-bold text-center py-9">Why ?</p>
        <p className="text-center text-xs opacity-60">i am creating this one !</p>
        <p className="text-center text-sm mt-8 px-48">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, nesciunt impedit? Maxime quaerat explicabo, iste culpa voluptate sit perferendis temporibus dicta nisi  recusandae ad fuga quae consectetur repellat tempora eum? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus cumque impedit corporis alias odit earum eos nihil? Dolor quo aspernatur enim hic, eius explicabo consequuntur harum labore pariatur dolores consectetur!
        </p>
        <div className="flex justify-center items-center py-8">
            <button className="text-sm bg-black text-white rounded-md border border-black px-7 py-1 hover:bg-white hover:text-black">Get Started</button>
        </div>

        {/* <div className="grid grid-cols-2 py-16">
          <div className="col-start-1 col-end-2">
            <Image src={Sample} alt="sample" className="h-96" />
          </div>
          <div className="col-start-2 col-end-3">
            <p className={`text-4xl`}>Build Your Hackathon team</p>
            <p>Connect with learning developer.</p>
            <p>some points here</p>
          </div>
        </div> */}

    </main>
  );
}
