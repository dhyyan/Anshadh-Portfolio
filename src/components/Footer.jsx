import { ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#292929] bg-[#080808] py-8">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-4 px-5 sm:flex-row sm:px-8 lg:px-12">
        <p className="font-mono text-[11px] tracking-[0.2em] text-[#999999] uppercase">
          &copy; 2026 ANSHAD. ALL RIGHTS RESERVED.
        </p>

        <div className="flex items-center gap-6">
          <span className="font-mono text-[10px] tracking-[0.2em] text-[#999999] uppercase">
            ERNAKULAM, KERALA, INDIA
          </span>

          <a
            href="#hero"
            aria-label="Scroll back to top"
            className="inline-flex h-9 w-9 items-center justify-center border border-[#292929] bg-[#111111] text-white transition-colors duration-200 hover:border-[#E50920] hover:bg-[#E50920]"
          >
            <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
