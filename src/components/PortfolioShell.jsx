"use client";

import { useCallback, useState } from "react";
import { useLenis } from "@/hooks/useLenis";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WhyChooseMe from "@/components/WhyChooseMe";
import DigitalMarketing from "@/components/DigitalMarketing";
import Services from "@/components/Services";
import WorkProcess from "@/components/WorkProcess";
import QuoteSection from "@/components/QuoteSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function PortfolioShell() {
  useLenis();
  const [heroReady, setHeroReady] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setHeroReady(true);
  }, []);

  return (
    <>
      <CustomCursor />
      <Preloader onComplete={handlePreloaderComplete} />
      <div
        className={
          heroReady
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0 select-none"
        }
      >
        <Navbar />
        <main id="main-content">
          <Hero ready={heroReady} />
          <About />
          <WhyChooseMe />
          <DigitalMarketing />
          <Services />
          <WorkProcess />
          <QuoteSection />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
