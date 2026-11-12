"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGsap() {
  if (typeof window !== "undefined" && !registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function animateDivider(element, triggerEl) {
  if (!element || prefersReducedMotion()) return null;
  return gsap.fromTo(
    element,
    { scaleX: 0, transformOrigin: "left center" },
    {
      scaleX: 1,
      duration: 0.95,
      ease: "power3.out",
      scrollTrigger: {
        trigger: triggerEl || element,
        start: "top 88%",
        once: true,
      },
    }
  );
}

export function animateStaggerReveal(targets, triggerEl, options = {}) {
  if (!targets || prefersReducedMotion()) return null;
  const { y = 32, stagger = 0.08, duration = 0.85, start = "top 84%" } = options;

  return gsap.fromTo(
    targets,
    { y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      ease: "power3.out",
      clearProps: "transform",
      scrollTrigger: {
        trigger: triggerEl,
        start,
        once: true,
      },
    }
  );
}

export { gsap, ScrollTrigger };

