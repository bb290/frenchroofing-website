"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ProcessStep } from "./types";

/*
  Option A: photo timeline. A vertical rail fills in orange as you scroll (inspired by 21st.dev #857 "Timeline" and
  #35029 "Scroll animated timeline"), each step with a real job photo. Hand-built: no animation library. With
  reduced motion the rail is simply full.
*/
export default function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  const wrap = useRef<HTMLOListElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setProgress(1);
      return;
    }
    const onScroll = () => {
      const el = wrap.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const mid = window.innerHeight * 0.55;
      setProgress(Math.min(1, Math.max(0, (mid - r.top) / r.height)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <ol ref={wrap} className="relative space-y-14 sm:space-y-20">
      {/* rail */}
      <div aria-hidden="true" className="absolute left-5 top-2 bottom-2 w-1 -translate-x-1/2 rounded-full bg-[#e5e0d6] sm:left-6" />
      <div
        aria-hidden="true"
        className="absolute left-5 top-2 w-1 -translate-x-1/2 rounded-full bg-[#d85024] sm:left-6"
        style={{ height: `calc(${progress * 100}% - 1rem)` }}
      />
      {steps.map((step, i) => {
        const reached = progress * steps.length > i + 0.15;
        return (
          <li key={step.title} className="relative grid grid-cols-[2.5rem_1fr] gap-x-5 sm:grid-cols-[3rem_1fr] sm:gap-x-8">
            <span
              className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-4 text-lg font-bold transition-colors sm:h-12 sm:w-12 sm:text-xl ${
                reached ? "border-[#d85024] bg-[#092e5e] text-white" : "border-[#e5e0d6] bg-white text-[#092e5e]"
              }`}
            >
              {i + 1}
            </span>
            <div className="grid gap-6 lg:grid-cols-[1fr_20rem] lg:items-start">
              <div>
                <h3 className="text-2xl font-bold text-[#092e5e]">{step.title}</h3>
                {step.note && (
                  <p className="mt-2 inline-block rounded-md bg-[#ffbd59]/25 px-3 py-1 text-base font-semibold text-[#092e5e]">{step.note}</p>
                )}
                <p className="mt-3 max-w-[36rem] text-lg leading-relaxed text-[#3e3d3b]">{step.description}</p>
              </div>
              {step.image && (
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image src={step.image.src} alt={step.image.alt} fill sizes="(min-width: 1024px) 320px, 90vw" className="object-cover" />
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
