import React from "react";
import Navbar from "@/components/LandingPage/Navbar";
import About from "@/components/LandingPage/About";
import Faq from "@/components/LandingPage/Faq";
import Footer from "@/components/LandingPage/Footer";
import Header from "@/components/LandingPage/Header";

export default function Home() {
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