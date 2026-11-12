"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/animations/gsapAnimations";

export default function Preloader({ onComplete }) {
  const [visible, setVisible] = useState(true);
  const overlayRef = useRef(null);
  const lineRef = useRef(null);
  const wordRef = useRef(null);
  const subRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set(overlayRef.current, { autoAlpha: 0, display: "none" });
      const frame = requestAnimationFrame(() => {
        setVisible(false);
        onComplete?.();
      });
      return () => cancelAnimationFrame(frame);
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setVisible(false);
          onComplete?.();
        },
      });

      tl.fromTo(
        wordRef.current,
        { yPercent: 105, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.6, ease: "power4.out" }
      )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
          "-=0.3"
        )
        .fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 0.65, ease: "power3.inOut" },
          "-=0.25"
        )
        .to([wordRef.current, subRef.current], {
          yPercent: -40,
          opacity: 0,
          duration: 0.35,
          ease: "power2.in",
        })
        .to(
          overlayRef.current,
          {
            yPercent: -100,
            duration: 0.65,
            ease: "power4.inOut",
          },
          "-=0.15"
        );
    }, overlayRef);

    return () => ctx.revert();
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#080808] px-6 select-none"
    >
      <div className="w-full max-w-md">
        <div className="overflow-hidden pb-2 text-center">
          <div
            ref={wordRef}
            className="font-display text-6xl tracking-tight text-white uppercase sm:text-7xl"
          >
            ANSHAD<span className="text-[#E50920]">.</span>
          </div>
        </div>

        <p
          ref={subRef}
          className="mb-5 text-center font-mono text-[11px] tracking-[0.28em] text-[#999999] uppercase"
        >
          SEO SPECIALIST — ERNAKULAM
        </p>

        <div className="h-[2px] w-full overflow-hidden bg-[#292929]">
          <div
            ref={lineRef}
            className="h-full w-full bg-[#E50920] shadow-[0_0_16px_rgba(229,9,32,0.8)]"
          />
        </div>
      </div>
    </div>
  );
}
