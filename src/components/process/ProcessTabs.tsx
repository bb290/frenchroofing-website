"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProcessStep } from "./types";

/*
  Option B: step tabs with a photo (inspired by 21st.dev #1368 "Feature Section" and #28276 "Interactive Timeline").
  Steps on one side, the chosen step's photo and details on the other. Click or tap to change; no auto-advance, so
  nothing moves while someone is reading. On phones each step opens in place (accordion). Every step's text stays in
  the HTML for search engines.
*/
export default function ProcessTabs({ steps }: { steps: ProcessStep[] }) {
  const [active, setActive] = useState(0);
  const step = steps[active];

  return (
    <div>
      {/* Desktop: list + panel */}
      <div className="hidden gap-10 lg:grid lg:grid-cols-[22rem_1fr]">
        <div role="tablist" aria-label="Steps" aria-orientation="vertical" className="space-y-2">
          {steps.map((s, i) => (
            <button
              key={s.title}
              role="tab"
              id={`ptab-${i}`}
              aria-selected={active === i}
              aria-controls="ptab-panel"
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") setActive((a) => Math.min(steps.length - 1, a + 1));
                if (e.key === "ArrowUp") setActive((a) => Math.max(0, a - 1));
              }}
              className={`flex w-full items-center gap-4 rounded-xl border-2 px-4 py-4 text-left transition-colors ${
                active === i ? "border-[#092e5e] bg-[#092e5e] text-white" : "border-transparent bg-white text-[#092e5e] hover:border-[#e5e0d6]"
              }`}
            >
              <span
                className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-lg font-bold ${
                  active === i ? "bg-[#ffbd59] text-[#092e5e]" : "bg-[#f5f1ea] text-[#092e5e]"
                }`}
              >
                {i + 1}
              </span>
              <span className="text-xl font-semibold">{s.title}</span>
            </button>
          ))}
        </div>
        <div id="ptab-panel" role="tabpanel" aria-labelledby={`ptab-${active}`} className="overflow-hidden rounded-2xl border border-[#e5e0d6] bg-white">
          {step.image && (
            <div className="relative aspect-[16/9]">
              <Image key={step.image.src} src={step.image.src} alt={step.image.alt} fill sizes="640px" className="object-cover" />
            </div>
          )}
          <div className="p-7">
            <p className="text-base font-semibold text-[#c04520]">
              Step {active + 1} of {steps.length}
            </p>
            <h3 className="mt-1 text-3xl font-bold text-[#092e5e]">{step.title}</h3>
            <p className="mt-3 text-lg leading-relaxed text-[#3e3d3b]">{step.description}</p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setActive((a) => Math.max(0, a - 1))}
                disabled={active === 0}
                className="min-h-11 rounded-lg border-2 border-[#092e5e] px-5 text-lg font-semibold text-[#092e5e] disabled:opacity-40"
              >
                &larr; Previous
              </button>
              <button
                type="button"
                onClick={() => setActive((a) => Math.min(steps.length - 1, a + 1))}
                disabled={active === steps.length - 1}
                className="min-h-11 rounded-lg bg-[#ffbd59] px-5 text-lg font-bold text-[#092e5e] hover:bg-[#f0ad40] disabled:opacity-40"
              >
                Next step &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Phones and tablets: accordion, first step open */}
      <div className="space-y-3 lg:hidden">
        {steps.map((s, i) => (
          <details key={s.title} open={i === 0} className="group overflow-hidden rounded-xl border-2 border-[#e5e0d6] bg-white open:border-[#092e5e]">
            <summary className="flex min-h-14 cursor-pointer list-none items-center gap-4 px-4 py-3 [&::-webkit-details-marker]:hidden">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#f5f1ea] text-lg font-bold text-[#092e5e] group-open:bg-[#ffbd59]">
                {i + 1}
              </span>
              <span className="flex-1 text-xl font-semibold text-[#092e5e]">{s.title}</span>
              <svg className="h-6 w-6 flex-shrink-0 text-[#c04520] transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </summary>
            {s.image && (
              <div className="relative aspect-[16/9]">
                <Image src={s.image.src} alt={s.image.alt} fill sizes="100vw" className="object-cover" />
              </div>
            )}
            <p className="px-4 py-4 text-lg leading-relaxed text-[#3e3d3b]">{s.description}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
