"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/animations/gsapAnimations";

export default function CustomCursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer || prefersReducedMotion()) {
      return undefined;
    }

    document.body.classList.add("custom-cursor-ready");

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return undefined;

    const xRing = gsap.quickTo(ring, "x", { duration: 0.28, ease: "power3.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.28, ease: "power3.out" });
    const xDot = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power2.out" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power2.out" });

    const onMove = (e) => {
      gsap.set([ring, dot], { opacity: 1 });
      xRing(e.clientX);
      yRing(e.clientY);
      xDot(e.clientX);
      yDot(e.clientY);
    };

    const onEnterInteractive = (e) => {
      const target = e.target.closest("a, button, [data-cursor='interactive']");
      if (!target) return;
      gsap.to(ring, {
        scale: 1.75,
        borderColor: "#E50920",
        backgroundColor: "rgba(229, 9, 32, 0.08)",
        duration: 0.22,
        ease: "power2.out",
      });
      gsap.to(dot, { scale: 0.5, duration: 0.2 });
    };

    const onLeaveInteractive = (e) => {
      const target = e.target.closest("a, button, [data-cursor='interactive']");
      if (!target) return;
      gsap.to(ring, {
        scale: 1,
        borderColor: "rgba(255, 255, 255, 0.45)",
        backgroundColor: "transparent",
        duration: 0.22,
        ease: "power2.out",
      });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    const onMouseLeaveWindow = () => {
      gsap.to([ring, dot], { opacity: 0, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onEnterInteractive);
    document.addEventListener("mouseout", onLeaveInteractive);
    document.addEventListener("mouseleave", onMouseLeaveWindow);

    return () => {
      document.body.classList.remove("custom-cursor-ready");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnterInteractive);
      document.removeEventListener("mouseout", onLeaveInteractive);
      document.removeEventListener("mouseleave", onMouseLeaveWindow);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-50 hidden md:block">
      <div
        ref={ringRef}
        className="fixed top-0 left-0 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/45 opacity-0 transition-colors"
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E50920] opacity-0"
      />
    </div>
  );
}
