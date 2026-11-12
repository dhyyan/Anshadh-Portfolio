"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navigationLinks, siteConfig } from "@/data/portfolio";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-40 transition-colors duration-300 ${
          scrolled
            ? "border-b border-[#292929] bg-[#080808]/90 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          aria-label="Primary navigation"
          className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12"
        >
          <a
            href="#hero"
            className="group flex items-center gap-2.5 text-white focus:outline-none"
          >
            <span className="font-display text-2xl tracking-wider uppercase">
              ANSHAD<span className="text-[#E50920]">.</span>
            </span>
            <span className="hidden border-l border-[#292929] pl-2.5 font-mono text-[10px] tracking-[0.22em] text-[#999999] uppercase sm:inline-block">
              SEO SPECIALIST
            </span>
          </a>

          <ul className="hidden items-center gap-7 lg:flex">
            {navigationLinks.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="font-mono text-[11px] tracking-[0.2em] text-[#999999] uppercase transition-colors duration-200 hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden items-center gap-1.5 border border-[#292929] bg-[#111111] px-4 py-2 font-mono text-[11px] tracking-[0.18em] text-white uppercase transition-all duration-200 hover:border-[#E50920] hover:bg-[#E50920] sm:inline-flex"
            >
              LET&apos;S TALK
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="inline-flex h-10 w-10 items-center justify-center border border-[#292929] bg-[#111111] text-white transition-colors hover:border-[#E50920] lg:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-30 flex flex-col justify-between bg-[#080808] px-6 pt-24 pb-10 lg:hidden"
          >
            <div className="border-t border-[#292929]">
              {navigationLinks.map((item, idx) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between border-b border-[#292929] py-4 transition-colors hover:text-[#E50920]"
                >
                  <span className="font-display text-3xl tracking-wide text-white uppercase">
                    {item.label}
                  </span>
                  <span className="font-mono text-xs text-[#E50920]">
                    0{idx + 1}
                  </span>
                </a>
              ))}
            </div>

            <div className="space-y-3 border-t border-[#292929] pt-6">
              <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-white uppercase">
                <span className="inline-block h-2 w-2 rounded-full bg-[#E50920]" />
                {siteConfig.availability}
              </div>
              <p className="font-mono text-[11px] tracking-[0.18em] text-[#999999] uppercase">
                {siteConfig.location}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

