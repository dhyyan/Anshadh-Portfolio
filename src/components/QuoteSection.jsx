"use client";

import { useEffect, useRef } from "react";
import { quoteData } from "@/data/portfolio";
import {
  animateStaggerReveal,
  gsap,
  prefersReducedMotion,
  registerGsap,
} from "@/animations/gsapAnimations";

export default function QuoteSection() {
  const sectionRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        panelRef.current,
        { clipPath: "inset(6% 0% 6% 0%)", opacity: 0.4 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );

      animateStaggerReveal(".quote-reveal", sectionRef.current, {
        y: 28,
        stagger: 0.12,
        start: "top 78%",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="quote"
      ref={sectionRef}
      aria-label="Philosophy quote by Anshad"
      className="relative bg-[#080808] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div
          ref={panelRef}
          className="quote-crimson-panel relative overflow-hidden border border-[#292929] px-6 py-14 sm:px-12 sm:py-20 lg:px-20 lg:py-24"
        >
          {/* Decorative Corner Accents */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 right-0 h-56 w-56 rounded-full bg-[#E50920]/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-0 h-44 w-44 rounded-full bg-[#A50B19]/20 blur-3xl"
          />

          <div className="relative z-10 mx-auto max-w-4xl">
            {/* Large Red Opening Quote Mark */}
            <div
              aria-hidden="true"
              className="quote-reveal font-display text-7xl leading-none text-[#E50920] select-none sm:text-8xl"
            >
              &ldquo;
            </div>

            <blockquote className="quote-reveal mt-2 font-sans text-2xl leading-snug font-light tracking-tight text-white sm:text-3xl lg:text-4xl lg:leading-[1.28]">
              {quoteData.quote}
            </blockquote>

            <div className="quote-reveal mt-10 flex flex-col justify-between gap-6 border-t border-[#292929]/90 pt-8 sm:flex-row sm:items-end">
              <div>
                <p className="font-script text-4xl text-white sm:text-5xl">
                  {quoteData.signature}
                </p>
                <p className="mt-1 font-mono text-[10px] tracking-[0.26em] text-[#E50920] uppercase">
                  {quoteData.signature} — FREELANCE SEO SPECIALIST
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 bg-[#E50920]" />
                <p className="font-mono text-[11px] tracking-[0.2em] text-[#999999] uppercase">
                  {quoteData.tagline}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

