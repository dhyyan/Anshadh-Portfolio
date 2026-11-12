"use client";

import { useEffect, useRef } from "react";
import {
  Search,
  BarChart3,
  Compass,
  Rocket,
  TrendingUp,
} from "lucide-react";
import { workProcessData } from "@/data/portfolio";
import {
  animateStaggerReveal,
  gsap,
  prefersReducedMotion,
  registerGsap,
} from "@/animations/gsapAnimations";

const iconMap = {
  Search,
  BarChart3,
  Compass,
  Rocket,
  TrendingUp,
};

export default function WorkProcess() {
  const sectionRef = useRef(null);
  const timelineWrapRef = useRef(null);
  const progressLineRef = useRef(null);

  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      animateStaggerReveal(".process-header-reveal", sectionRef.current, {
        y: 28,
        stagger: 0.08,
      });

      // Vertical connecting line progresses smoothly on scroll
      gsap.fromTo(
        progressLineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineWrapRef.current,
            start: "top 75%",
            end: "bottom 65%",
            scrub: true,
          },
        }
      );

      // Step indicators activate sequentially as user scrolls into each step
      const steps = gsap.utils.toArray(".process-step");
      steps.forEach((step) => {
        const badge = step.querySelector(".process-icon-ring");
        const num = step.querySelector(".process-number");

        gsap.fromTo(
          step,
          { opacity: 0.35, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: step,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          }
        );

        if (badge) {
          gsap.fromTo(
            badge,
            { borderColor: "#292929", backgroundColor: "#080808" },
            {
              borderColor: "#E50920",
              backgroundColor: "rgba(229, 9, 32, 0.14)",
              duration: 0.4,
              scrollTrigger: {
                trigger: step,
                start: "top 72%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (num) {
          gsap.fromTo(
            num,
            { color: "#999999" },
            {
              color: "#E50920",
              duration: 0.35,
              scrollTrigger: {
                trigger: step,
                start: "top 72%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative border-b border-[#292929] bg-[#080808] pb-20 sm:pb-28 lg:pb-32"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Sticky Editorial Heading */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="process-header-reveal mb-4 flex items-center gap-3">
                <span className="inline-block h-2 w-2 bg-[#E50920]" />
                <span className="font-mono text-xs tracking-[0.26em] text-[#E50920] uppercase">
                  {workProcessData.sectionLabel}
                </span>
              </div>

              <h2 className="process-header-reveal font-display text-5xl leading-[0.92] tracking-tight text-white uppercase sm:text-6xl lg:text-7xl">
                FROM STRATEGY{" "}
                <span className="text-[#E50920]">TO SUCCESS</span>
              </h2>

              <p className="process-header-reveal mt-6 max-w-sm text-sm leading-relaxed text-[#999999] sm:text-base">
                A structured, transparent SEO and digital marketing workflow built
                to turn search demand into measurable long-term growth.
              </p>

              <div className="process-header-reveal mt-8 hidden border-t border-[#292929] pt-5 font-mono text-[11px] tracking-[0.2em] text-[#999999] uppercase lg:block">
                05 PHASES // CONTINUOUS OPTIMIZATION
              </div>
            </div>
          </div>

          {/* Right Vertical 5-Step Timeline */}
          <div ref={timelineWrapRef} className="relative lg:col-span-7">
            {/* Static background track */}
            <div
              aria-hidden="true"
              className="absolute top-6 bottom-6 left-[59px] hidden w-px bg-[#292929] sm:block"
            />
            {/* Animated red progress track */}
            <div
              ref={progressLineRef}
              aria-hidden="true"
              className="absolute top-6 bottom-6 left-[59px] hidden w-[2px] -translate-x-[0.5px] bg-[#E50920] shadow-[0_0_12px_rgba(229,9,32,0.55)] sm:block"
            />

            <div className="space-y-8 sm:space-y-10">
              {workProcessData.steps.map((step) => {
                const IconComponent = iconMap[step.icon] || Search;
                return (
                  <div
                    key={step.number}
                    className="process-step relative flex items-start gap-4 border border-[#292929] bg-[#111111]/60 p-5 sm:gap-6 sm:border-0 sm:bg-transparent sm:p-0"
                  >
                    {/* Red Number Label */}
                    <span className="process-number w-8 shrink-0 pt-2.5 font-display text-2xl leading-none text-[#E50920] sm:text-3xl">
                      {step.number}
                    </span>

                    {/* Circular Icon Indicator */}
                    <div className="process-icon-ring relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#292929] bg-[#080808] text-[#E50920] transition-colors">
                      <IconComponent className="h-5 w-5" />
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 border-b border-[#292929]/70 pb-6 sm:pb-8">
                      <h3 className="font-display text-2xl tracking-wide text-white uppercase sm:text-3xl">
                        {step.title}
                      </h3>
                      <p className="mt-2 max-w-lg text-sm leading-relaxed text-[#999999] sm:text-base">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

