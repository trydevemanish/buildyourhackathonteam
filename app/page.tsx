import React from "react";
import Navbar from "@/components/LandingPage/Navbar";
import About from "@/components/LandingPage/About";
import Faq from "@/components/LandingPage/Faq";
import Footer from "@/components/LandingPage/Footer";
import Header from "@/components/LandingPage/Header";
import HeaderPara from "@/components/LandingPage/HeaderPara";
import GridFeatureComponent from "@/components/LandingPage/GridFeatureComponent";
import { ScrollAreaHorizontal } from "@/components/LandingPage/Scrollarea";

export default function Home() { 
  return (
    <main className="py-2">
        <Navbar />
        <Header />
        <About />
        <HeaderPara />
        <GridFeatureComponent />
        <ScrollAreaHorizontal />
        <Faq />
        <Footer />
    </main>
  );
}