"use client";

import { useEffect, useRef } from "react";
import {
  Mail,
  MessageCircle,
  MapPin,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { contactData } from "@/data/portfolio";
import {
  animateStaggerReveal,
  gsap,
  prefersReducedMotion,
  registerGsap,
} from "@/animations/gsapAnimations";

function LinkedinIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const iconMap = {
  Mail,
  MessageCircle,
  Linkedin: LinkedinIcon,
  Instagram: InstagramIcon,
};

export default function Contact() {
  const sectionRef = useRef(null);

  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      animateStaggerReveal(".contact-reveal", sectionRef.current, {
        y: 30,
        stagger: 0.09,
        start: "top 82%",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const primaryChannel = contactData.channels[0];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-[#292929] bg-[#080808] pt-20 pb-16 sm:pt-28 sm:pb-24"
    >
      {/* Subtle Crimson Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full opacity-35 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(229, 9, 32, 0.35) 0%, rgba(165, 11, 25, 0.14) 50%, transparent 75%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start lg:gap-14">
          {/* Left: Dramatic Headline, Subheading, Availability, Location, Big CTA */}
          <div className="space-y-8 lg:col-span-6">
            <div className="contact-reveal inline-flex items-center gap-2.5 border border-[#292929] bg-[#111111] px-3.5 py-1.5">
              <span className="h-2 w-2 rounded-full bg-[#E50920]" />
              <span className="font-mono text-[10px] tracking-[0.22em] text-white uppercase sm:text-[11px]">
                {contactData.availability}
              </span>
            </div>

            <div className="space-y-4">
              <h2 className="contact-reveal font-display text-6xl leading-[0.88] tracking-tight text-white uppercase sm:text-7xl lg:text-[5.5rem]">
                LET&apos;S WORK{" "}
                <span className="text-[#E50920]">TOGETHER</span>
              </h2>

              <p className="contact-reveal max-w-md text-sm leading-relaxed text-[#999999] sm:text-base">
                {contactData.subheading}
              </p>
            </div>

            {/* Identity & Location */}
            <div className="contact-reveal flex flex-wrap items-center gap-6 border-t border-[#292929] pt-6">
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] text-[#999999] uppercase">
                  SPECIALIST
                </p>
                <p className="mt-1 font-display text-2xl tracking-wide text-white uppercase">
                  {contactData.name}
                </p>
              </div>

              <div className="h-8 w-px bg-[#292929]" />

              <div className="flex items-start gap-2.5">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#E50920]" />
                <div>
                  <p className="font-mono text-[10px] tracking-[0.2em] text-[#999999] uppercase">
                    LOCATION
                  </p>
                  <p className="mt-1 text-sm text-white">
                    {contactData.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Large Contact CTA with Animated Arrow */}
            <div className="contact-reveal pt-2">
              <a
                href={primaryChannel.href}
                data-cursor="interactive"
                className="group inline-flex items-center gap-4 border border-[#E50920] bg-[#E50920] px-7 py-4 font-mono text-xs font-semibold tracking-[0.22em] text-white uppercase transition-all duration-300 hover:bg-[#A50B19]"
              >
                <span>{contactData.ctaLabel}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </a>
            </div>
          </div>

          {/* Right: Contact Channels Grid (Driven by src/data/portfolio.js) */}
          <div className="lg:col-span-6">
            <div className="contact-reveal border-t border-[#292929]">
              {contactData.channels.map((channel) => {
                const IconComponent = iconMap[channel.icon] || Mail;
                const isExternal = channel.href.startsWith("http");

                return (
                  <a
                    key={channel.id}
                    href={channel.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    data-cursor="interactive"
                    className="group flex items-center justify-between gap-4 border-b border-[#292929] py-6 transition-colors duration-300 hover:border-[#E50920] hover:bg-[#111111]/60 sm:px-4"
                  >
                    <div className="flex items-center gap-4 sm:gap-5">
                      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#292929] bg-[#111111] text-[#E50920] transition-all duration-300 group-hover:scale-105 group-hover:border-[#E50920] group-hover:bg-[#E50920] group-hover:text-white">
                        <IconComponent className="h-4 w-4" />
                      </span>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] tracking-[0.22em] text-[#999999] uppercase">
                            {channel.label}
                          </span>
                          {channel.placeholder && (
                            <span className="border border-[#292929] px-1.5 py-0.5 font-mono text-[9px] tracking-[0.14em] text-[#999999] uppercase">
                              CONFIG PLACEHOLDER
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-base font-medium text-white transition-colors duration-200 group-hover:text-[#E50920] sm:text-lg">
                          {channel.displayValue}
                        </p>
                      </div>
                    </div>

                    <ArrowUpRight className="h-5 w-5 shrink-0 text-[#999999] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#E50920]" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
