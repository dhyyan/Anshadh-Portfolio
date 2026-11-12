"use client";

import { useEffect, useRef } from "react";
import { whyChooseMeData } from "@/data/portfolio";
import {
  animateDivider,
  animateStaggerReveal,
  gsap,
  prefersReducedMotion,
  registerGsap,
} from "@/animations/gsapAnimations";

export default function WhyChooseMe() {
  const sectionRef = useRef(null);
  const dividerRef = useRef(null);

  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      animateDivider(dividerRef.current, sectionRef.current);
      animateStaggerReveal(".why-header-reveal", sectionRef.current, {
        y: 28,
        stagger: 0.08,
      });
      animateStaggerReveal(".why-card", sectionRef.current, {
        y: 40,
        stagger: 0.14,
        start: "top 78%",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="why-choose-me"
      ref={sectionRef}
      className="relative bg-[#080808] pb-20 sm:pb-28 lg:pb-32"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="space-y-3">
            <div className="why-header-reveal flex items-center gap-3">
              <span className="inline-block h-2 w-2 bg-[#E50920]" />
              <span className="font-mono text-xs tracking-[0.26em] text-[#E50920] uppercase">
                STRATEGIC ADVANTAGE
              </span>
            </div>
            <h2 className="why-header-reveal font-display text-4xl tracking-tight text-white uppercase sm:text-5xl lg:text-6xl">
              {whyChooseMeData.sectionLabel}
            </h2>
          </div>

          <p className="why-header-reveal max-w-xs font-mono text-[11px] leading-relaxed tracking-[0.18em] text-[#999999] uppercase sm:text-right">
            PRECISION SEO CRAFTED FOR SUSTAINABLE BRAND AUTHORITY
          </p>
        </div>

        {/* Three Editorial Columns */}
        <div className="grid grid-cols-1 border-t border-l border-[#292929] md:grid-cols-3">
          {whyChooseMeData.items.map((item) => (
            <article
              key={item.number}
              data-cursor="interactive"
              className="why-card group relative flex flex-col justify-between border-r border-b border-[#292929] bg-[#080808] p-7 transition-colors duration-300 hover:bg-[#111111] sm:p-9 lg:p-10"
            >
              {/* Animated Top Red Border Line on Hover */}
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 h-[2px] w-0 bg-[#E50920] transition-all duration-500 ease-out group-hover:w-full"
              />

              <div className="space-y-8">
                <div className="flex items-start justify-between">
                  <span className="font-display text-6xl leading-none text-[#E50920] transition-transform duration-300 group-hover:translate-x-1 sm:text-7xl">
                    {item.number}
                  </span>
                  <span className="mt-2 h-2 w-2 rounded-full border border-[#292929] transition-colors duration-300 group-hover:border-[#E50920] group-hover:bg-[#E50920]" />
                </div>

                <div className="space-y-4">
                  <h3 className="font-display text-2xl leading-tight tracking-wide text-white uppercase sm:text-[1.75rem]">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#999999] transition-colors duration-300 group-hover:text-white/85 sm:text-[15px]">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="mt-10 flex items-center gap-3 pt-4">
                <span className="h-px flex-1 bg-[#292929] transition-colors duration-300 group-hover:bg-[#A50B19]" />
                <span className="font-mono text-[10px] tracking-[0.22em] text-[#999999] uppercase transition-colors group-hover:text-[#E50920]">
                  PILLAR {item.number}
                </span>
              </div>
            </article>
          ))}
        </div>

        <div
          ref={dividerRef}
          className="mt-20 h-px w-full bg-[#292929] sm:mt-24"
        />
      </div>
    </section>
  );
}

