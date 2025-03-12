"use client"
import React from "react";
// import Coding from "@/public/coding.png"
// import Image from "next/image";
// import { useUser } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
import Navbar from "@/components/LandingPage/Navbar";
import About from "@/components/LandingPage/About";
import Faq from "@/components/LandingPage/Faq";
import Footer from "@/components/LandingPage/Footer";
import Header from "@/components/LandingPage/Header";


export default function Home() {

  // const { isSignedIn } = useUser()
  // const router = useRouter()

  // need to change the route of the login page whwn i will deploy it .
  // async function handleSignin() {
  //   return isSignedIn ? router.push('/dashboard') : router.push('https://easy-meerkat-32.accounts.dev/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2Fdashboard')
  // }

  return (
    <main className="py-2">
        <Navbar />
        <Header />
        <About />
        <Faq />
        <Footer />
    </main>
  );
}

{/* <div className="flex justify-between items-center p-2">
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
        </div> */}