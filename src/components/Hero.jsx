"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { MapPin, Sparkles, ArrowDownRight } from "lucide-react";
import { heroData, siteConfig } from "@/data/portfolio";
import { gsap, prefersReducedMotion, registerGsap } from "@/animations/gsapAnimations";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Hero({ ready = true }) {
  const sectionRef = useRef(null);
  const watermarkRef = useRef(null);
  const portraitWrapRef = useRef(null);
  const portraitParallaxRef = useRef(null);
  const glowRef = useRef(null);
  const contentRef = useRef(null);

  useIsomorphicLayoutEffect(() => {
    if (!ready) return undefined;
    registerGsap();

    if (prefersReducedMotion()) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Giant ANSHAD background reveal
      tl.fromTo(
        watermarkRef.current,
        { y: 60, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 1.05 }
      )
        // Red backlight pulse-in
        .fromTo(
          glowRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 1.0, ease: "power2.out" },
          "-=0.85"
        )
        // Portrait fade + scale + subtle clip reveal
        .fromTo(
          portraitWrapRef.current,
          { opacity: 0, scale: 1.08, y: 36 },
          { opacity: 1, scale: 1, y: 0, duration: 1.05, ease: "power3.out" },
          "-=0.8"
        )
        // Staggered intro & metadata lines
        .fromTo(
          ".hero-stagger",
          { y: 26, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.72,
            stagger: 0.07,
            ease: "power3.out",
            clearProps: "transform",
          },
          "-=0.72"
        );

      // Desktop-only subtle parallax + scroll exit
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.to(portraitParallaxRef.current, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(watermarkRef.current, {
          yPercent: -12,
          opacity: 0.25,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(contentRef.current, {
          y: -36,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "25% top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden border-b border-[#292929] bg-[#080808] pt-20 pb-12 sm:pt-24 lg:flex lg:min-h-[820px] lg:flex-col lg:justify-between lg:pt-24 lg:pb-14"
    >
      {/* Subtle background grid/grain */}
      <div
        aria-hidden="true"
        className="editorial-grain pointer-events-none absolute inset-0 opacity-60"
      />

      {/* Top Editorial Bar inside Hero */}
      <div className="relative z-20 mx-auto flex w-full max-w-[1440px] flex-wrap items-start justify-between gap-4 px-5 sm:px-8 lg:px-12">
        <div className="hero-stagger space-y-0.5">
          <p className="font-mono text-[11px] font-bold tracking-[0.22em] text-[#E50920] uppercase">
            {heroData.topLeftPrimary}
          </p>
          <p className="font-mono text-[11px] tracking-[0.2em] text-[#999999] uppercase">
            {heroData.topLeftSecondary}
          </p>
        </div>

        <div className="hero-stagger flex items-center gap-2.5 border border-[#292929] bg-[#111111]/85 px-3.5 py-1.5 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E50920] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#E50920]" />
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] text-white uppercase sm:text-[11px]">
            {heroData.topRightStatus}
          </span>
        </div>
      </div>

      {/* Giant Background Typography: ANSHAD */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative z-0 mx-auto mt-2 flex w-full max-w-[1440px] justify-center overflow-hidden px-3 select-none lg:absolute lg:inset-x-0 lg:top-[11%] lg:mt-0"
      >
        <div
          ref={watermarkRef}
          className="hero-watermark-gradient font-display text-center text-[25vw] leading-[0.82] tracking-[-0.02em] uppercase sm:text-[23vw] lg:text-[20vw] xl:text-[18.5rem]"
        >
          {heroData.bgWatermark}
        </div>
      </div>

      {/* Main Hero Grid: Left Intro | Center-Right Portrait | Far Right Focus Pillars */}
      <div
        ref={contentRef}
        className="relative z-10 mx-auto grid w-full max-w-[1440px] grid-cols-1 items-end gap-8 px-5 sm:px-8 lg:mt-16 lg:grid-cols-12 lg:gap-6 lg:px-12"
      >
        {/* Center-Right Portrait (ordered first on mobile so it anchors under the giant text, centered-right on desktop) */}
        <div className="relative order-1 mx-auto -mt-14 flex w-full max-w-[360px] justify-center sm:-mt-24 sm:max-w-[420px] lg:order-2 lg:col-span-5 lg:col-start-5 lg:-mt-28 lg:max-w-none">
          {/* Atmospheric Crimson Rim Glow behind portrait */}
          <div
            ref={glowRef}
            aria-hidden="true"
            className="pointer-events-none absolute top-[14%] left-1/2 h-[78%] w-[88%] -translate-x-1/2 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(229, 9, 32, 0.42) 0%, rgba(165, 11, 25, 0.2) 48%, transparent 74%)",
            }}
          />

          <div
            ref={portraitWrapRef}
            className="relative aspect-[3/4] w-full max-w-[460px] overflow-hidden lg:aspect-[4/5]"
          >
            <div ref={portraitParallaxRef} className="relative h-full w-full">
              <Image
                src={siteConfig.profileImage}
                alt="Anshad — Freelance SEO Specialist from Ernakulam, Kerala, India"
                fill
                priority
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 44vw, 460px"
                className="portrait-mask object-cover object-top contrast-[1.06]"
              />
              {/* Subtle bottom dark fade and crimson edge rim highlight */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#080808] via-[#080808]/75 to-transparent"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 mix-blend-screen opacity-20"
                style={{
                  background:
                    "radial-gradient(circle at 75% 32%, rgba(229, 9, 32, 0.55) 0%, transparent 55%)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Left Column: Intro, Name, Role, Description, Location */}
        <div className="order-2 space-y-5 lg:order-1 lg:col-span-4 lg:col-start-1 lg:pb-6">
          <div className="space-y-1">
            <p className="hero-stagger font-script text-3xl text-white/95 sm:text-4xl">
              {heroData.greeting}
            </p>
            <h1 className="hero-stagger font-display text-6xl leading-[0.88] tracking-tight text-white uppercase sm:text-7xl xl:text-[6.25rem]">
              {heroData.name}
            </h1>
          </div>

          <div className="hero-stagger space-y-3">
            <p className="font-display text-xl tracking-wide text-[#E50920] uppercase sm:text-2xl">
              {heroData.role}
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-[#999999] sm:text-[15px]">
              {heroData.description}
            </p>
          </div>

          <div className="hero-stagger flex flex-wrap items-center gap-4 pt-1">
            <div className="flex items-center gap-2 border border-[#292929] bg-[#111111] px-3 py-2">
              <MapPin className="h-3.5 w-3.5 text-[#E50920]" />
              <span className="font-mono text-[10px] tracking-[0.2em] text-white uppercase sm:text-[11px]">
                {heroData.location}
              </span>
            </div>

            <a
              href="#services"
              className="group inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.2em] text-white uppercase transition-colors hover:text-[#E50920]"
            >
              EXPLORE SERVICES
              <ArrowDownRight className="h-4 w-4 text-[#E50920] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Right Column: Editorial Note & Non-Numeric Strategic Pillars */}
        <div className="order-3 flex flex-col justify-end gap-7 border-t border-[#292929] pt-6 lg:col-span-3 lg:col-start-10 lg:border-t-0 lg:pt-0 lg:pb-6 lg:text-right">
          <div className="hero-stagger flex items-start gap-3 lg:flex-row-reverse">
            <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center border border-[#292929] bg-[#111111] text-[#E50920]">
              <Sparkles className="h-4 w-4" />
            </span>
            <p className="max-w-[230px] text-xs leading-relaxed text-[#999999]">
              {heroData.editorialNote}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1 lg:gap-5">
            {heroData.pillars.map((pillar) => (
              <div
                key={pillar.index}
                className="hero-stagger flex items-baseline justify-between gap-4 border-b border-[#292929]/80 pb-3 lg:flex-row-reverse lg:justify-start"
              >
                <span className="font-display text-3xl leading-none text-[#E50920] sm:text-4xl">
                  {pillar.index}
                </span>
                <div className="text-right lg:text-right">
                  <p className="font-mono text-[10px] tracking-[0.18em] text-[#999999] uppercase">
                    {pillar.title}
                  </p>
                  <p className="font-mono text-[11px] font-semibold tracking-[0.16em] text-white uppercase">
                    {pillar.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

