"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/animations/gsapAnimations";

export default function Preloader({ onComplete }) {
  const [visible, setVisible] = useState(true);
  const overlayRef = useRef(null);
  const lineRef = useRef(null);
  const wordRef = useRef(null);
  const subRef = useRef(null);
  const completedRef = useRef(false);

  useEffect(() => {
    const notifyReady = () => {
      if (!completedRef.current) {
        completedRef.current = true;
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
        onComplete?.();
      }
    };

    if (prefersReducedMotion()) {
      gsap.set(overlayRef.current, { autoAlpha: 0, display: "none" });
      const frame = requestAnimationFrame(() => {
        setVisible(false);
        notifyReady();
      });
      return () => cancelAnimationFrame(frame);
    }

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const safetyTimer = setTimeout(() => {
      setVisible(false);
      notifyReady();
    }, 2800);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          clearTimeout(safetyTimer);
          setVisible(false);
          notifyReady();
        },
      });

      tl.fromTo(
        wordRef.current,
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: "power4.out" }
      )
        .fromTo(
          subRef.current,
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" },
          "-=0.3"
        )
        .fromTo(
          lineRef.current,
          { scaleX: 0, opacity: 1, transformOrigin: "left center" },
          { scaleX: 1, opacity: 1, duration: 0.6, ease: "power3.inOut" },
          "-=0.22"
        )
        .to([wordRef.current, subRef.current], {
          y: -18,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        })
        .to(
          overlayRef.current,
          {
            yPercent: -100,
            duration: 0.6,
            ease: "power4.inOut",
            onStart: notifyReady,
          },
          "-=0.1"
        );
    }, overlayRef);

    return () => {
      clearTimeout(safetyTimer);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      ctx.revert();
    };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex h-dvh w-screen touch-none flex-col items-center justify-center overflow-hidden bg-[#080808] px-6 select-none"
    >
      <div className="w-full max-w-md">
        <div className="pb-2 text-center">
          <div
            ref={wordRef}
            className="font-display text-6xl leading-none tracking-tight text-white uppercase opacity-0 sm:text-7xl"
          >
            ANSHAD<span className="text-[#E50920]">.</span>
          </div>
        </div>

        <p
          ref={subRef}
          className="mb-5 text-center font-mono text-[11px] tracking-[0.28em] text-[#999999] uppercase opacity-0"
        >
          SEO SPECIALIST — ERNAKULAM
        </p>

        <div className="h-[2px] w-full overflow-hidden bg-[#292929]">
          <div
            ref={lineRef}
            className="h-full w-full bg-[#E50920] opacity-0 shadow-[0_0_16px_rgba(229,9,32,0.8)]"
          />
        </div>
      </div>
    </div>
  );
}
