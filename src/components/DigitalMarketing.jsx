"use client";

import { useEffect, useRef } from "react";
import { digitalMarketingData } from "@/data/portfolio";
import {
  animateDivider,
  animateStaggerReveal,
  gsap,
  prefersReducedMotion,
  registerGsap,
} from "@/animations/gsapAnimations";

function HighlightedText({ text, highlights }) {
  if (!highlights || highlights.length === 0) return text;

  const escaped = highlights.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const regex = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, idx) => {
    const isHighlighted = highlights.some(
      (h) => h.toLowerCase() === part.toLowerCase()
    );
    if (isHighlighted) {
      return (
        <span key={idx} className="font-medium text-[#E50920]">
          {part}
        </span>
      );
    }
    return <span key={idx}>{part}</span>;
  });
}

export default function DigitalMarketing() {
  const sectionRef = useRef(null);
  const dividerRef = useRef(null);
  const graphicRef = useRef(null);

  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      animateDivider(dividerRef.current, sectionRef.current);
      animateStaggerReveal(".dm-reveal", sectionRef.current, {
        y: 30,
        stagger: 0.1,
      });

      gsap.fromTo(
        graphicRef.current,
        { clipPath: "inset(0 100% 0 0)", opacity: 0.2 },
        {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          duration: 1.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: graphicRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="digital-marketing"
      ref={sectionRef}
      className="relative bg-[#111111] py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Top Heading + Decorative SEO/Search Graphic */}
        <div className="grid grid-cols-1 items-center gap-10 border-b border-[#292929] pb-14 lg:grid-cols-12 lg:pb-16">
          <div className="space-y-4 lg:col-span-8">
            <div className="dm-reveal flex items-center gap-3">
              <span className="inline-block h-2 w-2 bg-[#E50920]" />
              <span className="font-mono text-xs tracking-[0.26em] text-[#E50920] uppercase">
                {digitalMarketingData.sectionLabel}
              </span>
            </div>
            <h2 className="dm-reveal font-display text-5xl leading-[0.94] tracking-tight text-white uppercase sm:text-6xl lg:text-7xl">
              Your Business Deserves{" "}
              <span className="text-[#E50920]">To Be Seen.</span>
            </h2>
          </div>

          {/* Editorial SEO / Search Signal SVG Graphic */}
          <div className="lg:col-span-4">
            <div
              ref={graphicRef}
              className="relative border border-[#292929] bg-[#080808] p-5"
            >
              <div className="mb-3 flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-[#999999] uppercase">
                <span>SEARCH VISIBILITY INDEX</span>
                <span className="text-[#E50920]">SERP // 01</span>
              </div>

              <svg
                viewBox="0 0 320 120"
                className="h-auto w-full"
                role="img"
                aria-label="Minimalist search ranking trajectory graphic"
              >
                {/* Horizontal grid hairlines */}
                <line x1="0" y1="24" x2="320" y2="24" stroke="#292929" strokeWidth="1" />
                <line x1="0" y1="60" x2="320" y2="60" stroke="#292929" strokeWidth="1" />
                <line x1="0" y1="96" x2="320" y2="96" stroke="#292929" strokeWidth="1" />

                {/* Search radar concentric arcs */}
                <circle cx="272" cy="30" r="24" stroke="#292929" strokeWidth="1" fill="none" />
                <circle cx="272" cy="30" r="14" stroke="#A50B19" strokeWidth="1" fill="none" />

                {/* Organic growth curve */}
                <path
                  d="M12 102 C 58 98, 92 78, 134 72 C 176 66, 206 42, 272 30"
                  fill="none"
                  stroke="#E50920"
                  strokeWidth="2.2"
                />
                <path
                  d="M12 102 C 58 98, 92 78, 134 72 C 176 66, 206 42, 272 30 L 272 112 L 12 112 Z"
                  fill="url(#seoGlow)"
                  opacity="0.35"
                />

                {/* Key milestone nodes */}
                <circle cx="12" cy="102" r="3" fill="#FFFFFF" />
                <circle cx="134" cy="72" r="3" fill="#FFFFFF" />
                <circle cx="272" cy="30" r="4.5" fill="#E50920" />
                <circle cx="272" cy="30" r="8" stroke="#E50920" strokeOpacity="0.45" fill="none" />

                <defs>
                  <linearGradient id="seoGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E50920" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#080808" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="mt-3 flex items-center justify-between border-t border-[#292929] pt-2.5 font-mono text-[10px] tracking-[0.18em] text-[#999999] uppercase">
                <span>INTENT</span>
                <span>AUTHORITY</span>
                <span className="text-white">RANKING</span>
              </div>
            </div>
          </div>
        </div>

        {/* Two-Column Editorial Content */}
        <div className="mt-12 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-16">
          {digitalMarketingData.subsections.map((sub) => (
            <div
              key={sub.number}
              className="dm-reveal space-y-6 border-l border-[#292929] pl-6 sm:pl-8"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-display text-4xl leading-none text-[#E50920]">
                  {sub.number}
                </span>
                <h3 className="font-display text-2xl tracking-wide text-white uppercase sm:text-3xl">
                  {sub.title}
                </h3>
              </div>

              <div className="space-y-4">
                {sub.paragraphs.map((paragraph, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-sm leading-relaxed text-[#999999] sm:text-base"
                  >
                    <HighlightedText
                      text={paragraph}
                      highlights={sub.highlights}
                    />
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          ref={dividerRef}
          className="mt-16 h-px w-full bg-[#292929] sm:mt-20"
        />
      </div>
    </section>
  );
}

