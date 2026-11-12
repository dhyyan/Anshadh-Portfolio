"use client";

import { useEffect, useRef } from "react";
import { aboutData } from "@/data/portfolio";
import {
  animateDivider,
  animateStaggerReveal,
  gsap,
  prefersReducedMotion,
  registerGsap,
} from "@/animations/gsapAnimations";

export default function About() {
  const sectionRef = useRef(null);
  const dividerRef = useRef(null);
  const accentBarRef = useRef(null);

  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      animateDivider(dividerRef.current, sectionRef.current);
      animateStaggerReveal(".about-reveal", sectionRef.current, {
        y: 34,
        stagger: 0.1,
      });

      gsap.fromTo(
        accentBarRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-[#080808] py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Section Label */}
        <div className="about-reveal mb-8 flex items-center gap-3">
          <span className="inline-block h-2 w-2 bg-[#E50920]" />
          <span className="font-mono text-xs tracking-[0.26em] text-[#E50920] uppercase">
            {aboutData.sectionLabel}
          </span>
        </div>

        {/* Editorial Two-Column Layout */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <h2 className="about-reveal font-display text-5xl leading-[0.94] tracking-tight text-white uppercase sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
              Turning Search Visibility Into{" "}
              <span className="text-[#E50920]">Business Growth.</span>
            </h2>
          </div>

          <div className="space-y-6 lg:col-span-5">
            <div ref={accentBarRef} className="h-[2px] w-16 bg-[#E50920]" />
            <p className="about-reveal text-base leading-relaxed text-[#999999] sm:text-lg">
              {aboutData.body}
            </p>
            <div className="about-reveal flex items-center justify-between border-t border-[#292929] pt-4 font-mono text-[11px] tracking-[0.2em] text-[#999999] uppercase">
              <span>BASED IN ERNAKULAM, KERALA</span>
              <span className="text-white">ORGANIC FIRST</span>
            </div>
          </div>
        </div>

        {/* Expanding Thin Horizontal Divider */}
        <div
          ref={dividerRef}
          className="mt-16 h-px w-full bg-[#292929] sm:mt-20 lg:mt-24"
        />
      </div>
    </section>
  );
}

