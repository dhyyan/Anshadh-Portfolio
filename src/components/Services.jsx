"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { servicesData } from "@/data/services";
import {
  animateDivider,
  animateStaggerReveal,
  gsap,
  prefersReducedMotion,
  registerGsap,
} from "@/animations/gsapAnimations";

export default function Services() {
  const sectionRef = useRef(null);
  const dividerRef = useRef(null);

  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      animateDivider(dividerRef.current, sectionRef.current);
      animateStaggerReveal(".services-header-reveal", sectionRef.current, {
        y: 28,
        stagger: 0.08,
      });
      animateStaggerReveal(".service-row", sectionRef.current, {
        y: 36,
        stagger: 0.1,
        start: "top 80%",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative bg-[#080808] py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-12 grid grid-cols-1 gap-6 lg:mb-16 lg:grid-cols-12 lg:items-end">
          <div className="space-y-3 lg:col-span-7">
            <div className="services-header-reveal flex items-center gap-3">
              <span className="inline-block h-2 w-2 bg-[#E50920]" />
              <span className="font-mono text-xs tracking-[0.26em] text-[#E50920] uppercase">
                {servicesData.sectionLabel}
              </span>
            </div>
            <h2 className="services-header-reveal font-display text-5xl leading-[0.92] tracking-tight text-white uppercase sm:text-6xl lg:text-7xl">
              {servicesData.heading}
            </h2>
          </div>

          <p className="services-header-reveal max-w-md text-sm leading-relaxed text-[#999999] sm:text-base lg:col-span-5 lg:justify-self-end lg:text-right">
            {servicesData.subtitle}
          </p>
        </div>

        {/* Two-Column Interactive Editorial Service Grid */}
        <div className="grid grid-cols-1 border-t border-l border-[#292929] md:grid-cols-2">
          {servicesData.items.map((service) => (
            <a
              key={service.number}
              href="#contact"
              data-cursor="interactive"
              className="service-row group relative flex flex-col justify-between border-r border-b border-[#292929] bg-[#080808] p-7 transition-all duration-300 hover:bg-[#111111] sm:p-9 lg:p-10"
            >
              {/* Left Crimson Edge Highlight on Hover */}
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 h-0 w-[3px] bg-[#E50920] transition-all duration-300 ease-out group-hover:h-full"
              />

              <div className="flex items-start justify-between gap-4">
                <div className="flex items-baseline gap-4 sm:gap-5">
                  <span className="font-display text-4xl leading-none text-[#E50920] transition-transform duration-300 group-hover:translate-x-1 sm:text-5xl">
                    {service.number}
                  </span>
                  <h3 className="font-display text-2xl leading-tight tracking-wide text-white uppercase transition-colors duration-300 group-hover:text-[#E50920] sm:text-3xl">
                    {service.title}
                  </h3>
                </div>

                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-[#292929] text-[#999999] transition-all duration-300 group-hover:border-[#E50920] group-hover:bg-[#E50920] group-hover:text-white">
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>

              <div className="mt-6 space-y-5 pl-0 sm:pl-14">
                <p className="text-sm leading-relaxed text-[#999999] transition-colors duration-300 group-hover:text-white/85 sm:text-[15px]">
                  {service.description}
                </p>

                <div className="border-t border-[#292929]/80 pt-3 font-mono text-[10px] tracking-[0.18em] text-[#999999] uppercase transition-colors duration-300 group-hover:border-[#A50B19]/60 group-hover:text-white/75">
                  {service.focus}
                </div>
              </div>
            </a>
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

