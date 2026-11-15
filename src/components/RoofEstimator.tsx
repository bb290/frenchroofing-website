"use client";

import { useEffect, useRef, useState } from "react";
import { COMPANY } from "@/lib/constants";
import VentDiagram from "./VentDiagram";

/*
  Instant Roof Estimate (redesigned 2026-11-15 for readability: one question per screen, large type and tap
  targets, plain-English progress, every answer editable from the result). Pricing data and math are unchanged
  from the previous version: squares x $500 x material x complexity, a -15%/+15% range, plus flat add-ons.
*/

const MATERIALS = [
  {
    id: "landmark",
    name: "CertainTeed Landmark",
    multiplier: 1.0,
    warranty: "Lifetime limited",
    pros: ["Most popular choice", "Dimensional architectural look", "Strong wind resistance (up to 130 mph)", "Wide color selection", "StreakFighter algae resistance"],
    cons: ["Standard tier - fewer premium features"],
    description: "Our most-installed shingle. Great balance of durability, curb appeal, and value. Built for Oregon's rain and wind.",
    tag: "Good",
  },
  {
    id: "landmark-pro",
    name: "CertainTeed Landmark Pro",
    multiplier: 1.2,
    warranty: "Lifetime limited + extended",
    pros: ["Thicker, more dimensional profile", "Max Def colors - richer look", "Enhanced wind warranty (up to 130 mph)", "Longer-lasting than standard Landmark", "StreakFighter algae resistance"],
    cons: ["Moderate price increase over Landmark"],
    description: "Everything Landmark offers, plus a thicker profile and richer color depth. The sweet spot for homeowners who want a step up.",
    tag: "Better",
  },
  {
    id: "presidential",
    name: "CertainTeed Presidential",
    multiplier: 1.5,
    warranty: "Lifetime limited + premium",
    pros: ["Luxury wood-shake look without the maintenance", "Maximum curb appeal", "Best CertainTeed warranty tier", "Superior impact resistance (Class 4)", "Heavyweight construction"],
    cons: ["Highest upfront cost", "Heavier - ideal for sturdy structures"],
    description: "The top of the line. Looks like natural wood shake but lasts decades longer. For homeowners who want the absolute best on their roof.",
    tag: "Best",
  },
] as const;

const ROOF_SIZES = [
  { id: "small", label: "Small Roof", range: "10 – 15 squares", sqft: "1,000 – 1,500 sq ft", squares: 12, hint: "Typical for smaller ranch homes, cottages, or detached garages", scale: 0.62 },
  { id: "medium", label: "Medium Roof", range: "15 – 25 squares", sqft: "1,500 – 2,500 sq ft", squares: 20, hint: "Most common - average single-story or smaller two-story homes", scale: 0.76 },
  { id: "large", label: "Large Roof", range: "25 – 35 squares", sqft: "2,500 – 3,500 sq ft", squares: 30, hint: "Larger single-story, split-level, or mid-size two-story homes", scale: 0.88 },
  { id: "xl", label: "Extra Large Roof", range: "35+ squares", sqft: "3,500+ sq ft", squares: 40, hint: "Large two-story homes, complex rooflines, or multi-section roofs", scale: 1 },
] as const;

const COMPLEXITY = [
  { id: "standard", label: "Standard", multiplier: 1.0, description: "Walkable pitch, simple layout, few features" },
  { id: "moderate", label: "Moderate", multiplier: 1.15, description: "Steeper sections, some valleys or dormers" },
  { id: "complex", label: "Complex", multiplier: 1.3, description: "Steep pitch, multiple levels, many penetrations" },
] as const;

const ADDONS = [
  {
    id: "ridge-vents",
    name: "Ridge Vent Upgrade",
    description: "Replace standard box vents with a continuous ridge vent system for better attic airflow.",
    flatPrice: 1200,
    pros: ["Even airflow across entire roof", "Invisible from the ground - cleaner look", "Reduces moisture & heat buildup in attic", "Extends shingle lifespan"],
    cons: ["Higher upfront cost vs box vents", "Requires proper soffit intake to work effectively"],
    recommended: true,
    tag: "Recommended",
  },
  {
    id: "gutters",
    name: "New Gutters & Downspouts",
    description: "Complete gutter system install - seamless aluminum, sized for Oregon rain. We coordinate this through our trusted subcontractor so you don't have to.",
    flatPrice: 2500,
    pros: ["One project, one point of contact", "Properly sized for PNW rainfall", "Seamless aluminum - no leaky seams", "Protects foundation, siding & landscaping"],
    cons: ["Adds to total project cost", "Scheduling depends on subcontractor availability"],
    recommended: false,
    tag: "Bundled Service",
  },
] as const;

const BASE_PRICE_PER_SQUARE = 500;

type Step = "size" | "material" | "complexity" | "addons" | "result";
const QUESTION_STEPS: { id: Step; label: string }[] = [
  { id: "size", label: "Roof size" },
  { id: "material", label: "Shingles" },
  { id: "complexity", label: "Roof shape" },
  { id: "addons", label: "Extras" },
];

const priceNote = (m: number) => (m === 1 ? "Base price" : `About ${Math.round((m - 1) * 100)}% more`);

function Check({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function HouseIcon({ scale }: { scale: number }) {
  return (
    <svg viewBox="0 0 64 56" className="h-12 w-14 flex-shrink-0 sm:h-14 sm:w-16" aria-hidden="true">
      <g transform={`translate(${32 - 32 * scale} ${56 - 56 * scale}) scale(${scale})`}>
        <polygon points="4,26 32,4 60,26" fill="#092e5e" />
        <rect x="11" y="26" width="42" height="28" fill="#ffbd59" />
        <rect x="27" y="36" width="10" height="18" fill="#092e5e" opacity="0.8" />
      </g>
    </svg>
  );
}

function RoofShapeIcon({ level }: { level: "standard" | "moderate" | "complex" }) {
  return (
    <svg viewBox="0 0 64 44" className="h-9 w-12 flex-shrink-0 sm:h-11 sm:w-16" aria-hidden="true">
      {level === "standard" && <polygon points="4,40 32,16 60,40" fill="#092e5e" />}
      {level === "moderate" && (
        <>
          <polygon points="2,40 26,12 50,40" fill="#092e5e" />
          <polygon points="30,40 46,24 62,40" fill="#4b6584" />
        </>
      )}
      {level === "complex" && (
        <>
          <polygon points="2,40 20,10 38,40" fill="#092e5e" />
          <polygon points="22,40 40,4 58,40" fill="#4b6584" />
          <polygon points="40,40 52,26 64,40" fill="#092e5e" />
        </>
      )}
    </svg>
  );
}

export default function RoofEstimator({ compact = false }: { compact?: boolean }) {
  // Step questions sit one level under the estimator title (h3 on /estimate, h4 inside the home section).
  const StepHeading = compact ? "h4" : "h3";
  const [step, setStep] = useState<Step>("size");
  const [sizeId, setSizeId] = useState<string | null>(null);
  const [materialId, setMaterialId] = useState<string | null>(null);
  const [complexityId, setComplexityId] = useState<string | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<Set<string>>(new Set());
  const [playVideo, setPlayVideo] = useState(false);

  const selectedSize = ROOF_SIZES.find((s) => s.id === sizeId);
  const selectedMaterial = MATERIALS.find((m) => m.id === materialId);
  const selectedComplexity = COMPLEXITY.find((c) => c.id === complexityId);

  function toggleAddon(id: string) {
    setSelectedAddons((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function getEstimate() {
    if (!selectedSize || !selectedMaterial || !selectedComplexity) return null;
    const base = selectedSize.squares * BASE_PRICE_PER_SQUARE * selectedMaterial.multiplier * selectedComplexity.multiplier;
    const addonsTotal = ADDONS.filter((a) => selectedAddons.has(a.id)).reduce((sum, a) => sum + a.flatPrice, 0);
    const low = Math.round((base * 0.85 + addonsTotal) / 100) * 100;
    const high = Math.round((base * 1.15 + addonsTotal) / 100) * 100;
    return { low, high, addonsTotal };
  }

  function reset() {
    setStep("size");
    setSizeId(null);
    setMaterialId(null);
    setComplexityId(null);
    setSelectedAddons(new Set());
  }

  // Bring the next question into view after each answer (the sticky site header is about 80px tall).
  const cardRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const el = cardRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top;
    if (top < 90 || top > window.innerHeight * 0.4) {
      window.scrollTo({ top: window.scrollY + top - 96, behavior: "smooth" });
    }
  }, [step]);

  const estimate = getEstimate();
  const stepIndex = QUESTION_STEPS.findIndex((s) => s.id === step);

  const optionClass = (selected: boolean) =>
    `group w-full rounded-xl border-2 p-5 text-left transition-colors focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#d85024] ${
      selected ? "border-[#092e5e] bg-[#ffbd59]/15" : "border-gray-200 bg-white hover:border-[#092e5e] hover:bg-gray-50"
    }`;

  const BackButton = ({ to }: { to: Step }) => (
    <button
      type="button"
      onClick={() => setStep(to)}
      className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-lg font-medium text-[#092e5e] hover:bg-gray-100"
    >
      <span aria-hidden="true">&larr;</span> Back
    </button>
  );

  return (
    <div className={compact ? "" : "mx-auto max-w-3xl"}>
      <div ref={cardRef} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_8px_30px_rgba(9,46,94,0.08)]">
        {/* Header */}
        <div className="bg-[#092e5e] px-6 py-6 sm:px-8">
          {compact ? (
            <h3 className="text-2xl sm:text-3xl font-bold text-white">Instant Roof Estimate</h3>
          ) : (
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Instant Roof Estimate</h2>
          )}
          <p className="mt-1 text-lg text-white/90">
            4 quick questions. A ballpark price in about a minute. No contact info needed.
          </p>
        </div>

        {/* Progress */}
        {step !== "result" && (
          <div className="border-b border-gray-200 px-6 pt-5 pb-4 sm:px-8">
            <p className="text-lg font-semibold text-[#092e5e]" aria-live="polite">
              Step {stepIndex + 1} of 4 <span className="font-normal text-gray-600">· {QUESTION_STEPS[stepIndex].label}</span>
            </p>
            <div className="mt-3 grid grid-cols-4 gap-2" aria-hidden="true">
              {QUESTION_STEPS.map((s, i) => (
                <div key={s.id} className={`h-2 rounded-full ${i <= stepIndex ? "bg-[#d85024]" : "bg-gray-200"}`} />
              ))}
            </div>
          </div>
        )}

        <div className="p-6 sm:p-8">
          {/* ── 1. Roof size ── */}
          {step === "size" && (
            <div>
              <StepHeading className="text-2xl font-bold text-[#092e5e]">How big is your roof?</StepHeading>
              <p className="mt-2 text-lg text-gray-700">
                Pick the closest match. Not sure? Most homes are <strong className="text-[#092e5e]">Medium</strong>, and we
                measure exactly at your free assessment.
              </p>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2" role="group" aria-label="Roof size">
                {ROOF_SIZES.map((size) => (
                  <button
                    key={size.id}
                    type="button"
                    aria-pressed={sizeId === size.id}
                    onClick={() => {
                      setSizeId(size.id);
                      setStep("material");
                    }}
                    className={optionClass(sizeId === size.id)}
                  >
                    <span className="flex items-center gap-4">
                      <HouseIcon scale={size.scale} />
                      <span>
                        <span className="block text-xl font-bold text-[#092e5e]">{size.label}</span>
                        <span className="mt-0.5 block text-lg text-[#3e3d3b]"><span className="whitespace-nowrap">{size.sqft.replace(" sq ft", "")}</span> sq ft of roof</span>
                      </span>
                    </span>
                    <span className="mt-3 block text-base text-gray-600">{size.hint}.</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── 2. Shingles ── */}
          {step === "material" && (
            <div>
              <StepHeading className="text-2xl font-bold text-[#092e5e]">Which shingles?</StepHeading>
              <p className="mt-2 text-lg text-gray-700">All three are CertainTeed, the brand we install. We&apos;ll help you choose at your assessment.</p>
              <div className="mt-6 space-y-3" role="group" aria-label="Shingles">
                {MATERIALS.map((mat) => (
                  <div key={mat.id} className={`rounded-xl border-2 ${materialId === mat.id ? "border-[#092e5e] bg-[#ffbd59]/15" : "border-gray-200 hover:border-[#092e5e]"}`}>
                    <button
                      type="button"
                      aria-pressed={materialId === mat.id}
                      onClick={() => {
                        setMaterialId(mat.id);
                        setStep("complexity");
                      }}
                      className="block w-full p-5 pb-3 text-left focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#d85024]"
                    >
                      <span className="flex flex-wrap items-center gap-x-3 gap-y-2">
                        <span className="rounded-md bg-[#092e5e] px-2.5 py-0.5 text-base font-bold text-white">{mat.tag}</span>
                        <span className="rounded-md bg-[#f5f1ea] px-2.5 py-0.5 text-base font-semibold text-[#c04520]">{priceNote(mat.multiplier)}</span>
                      </span>
                      <span className="mt-2 block text-xl font-bold text-[#092e5e]">{mat.name}</span>
                      <span className="mt-1 block text-lg text-[#3e3d3b]">{mat.description}</span>
                      <span className="mt-2 block text-base text-gray-600">Warranty: {mat.warranty}</span>
                    </button>
                    <details className="group px-5 pb-4">
                      <summary className="inline-flex min-h-11 cursor-pointer list-none items-center text-lg font-semibold text-[#c04520] [&::-webkit-details-marker]:hidden">
                        <span className="group-open:hidden">Pros and cons &darr;</span>
                        <span className="hidden group-open:inline">Hide pros and cons &uarr;</span>
                      </summary>
                      <ul className="mt-3 space-y-1.5">
                        {mat.pros.map((pro) => (
                          <li key={pro} className="flex items-start gap-2 text-base text-gray-700">
                            <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-700" />
                            {pro}
                          </li>
                        ))}
                        {mat.cons.map((con) => (
                          <li key={con} className="flex items-start gap-2 text-base text-gray-700">
                            <span aria-hidden="true" className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center font-bold text-[#b8341c]">!</span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </details>
                  </div>
                ))}
              </div>
              <div className="mt-5">
                <BackButton to="size" />
              </div>
            </div>
          )}

          {/* ── 3. Roof shape ── */}
          {step === "complexity" && (
            <div>
              <StepHeading className="text-2xl font-bold text-[#092e5e]">How complicated is your roof?</StepHeading>
              <p className="mt-2 text-lg text-gray-700">Steeper roofs and extra features like valleys, dormers, and skylights take more time and material.</p>
              <div className="mt-6 space-y-3" role="group" aria-label="Roof shape">
                {COMPLEXITY.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    aria-pressed={complexityId === c.id}
                    onClick={() => {
                      setComplexityId(c.id);
                      setStep("addons");
                    }}
                    className={optionClass(complexityId === c.id)}
                  >
                    <span className="flex items-center gap-4">
                      <RoofShapeIcon level={c.id} />
                      <span className="flex-1">
                        <span className="block text-xl font-bold text-[#092e5e]">{c.label}</span>
                        <span className="mt-0.5 block text-lg text-[#3e3d3b]">{c.description}</span>
                        <span className="mt-1 block text-base font-semibold text-[#c04520] sm:hidden">{priceNote(c.multiplier)}</span>
                      </span>
                      <span className="hidden text-lg font-semibold text-[#c04520] sm:block">{priceNote(c.multiplier)}</span>
                    </span>
                  </button>
                ))}
              </div>
              <div className="mt-5">
                <BackButton to="material" />
              </div>
            </div>
          )}

          {/* ── 4. Extras ── */}
          {step === "addons" && (
            <div>
              <StepHeading className="text-2xl font-bold text-[#092e5e]">Add anything?</StepHeading>
              <p className="mt-2 text-lg text-gray-700">Optional. Tap to add or remove, then see your estimate.</p>
              <div className="mt-6 space-y-4">
                {ADDONS.map((addon) => {
                  const on = selectedAddons.has(addon.id);
                  return (
                    <div key={addon.id} className={`rounded-xl border-2 ${on ? "border-[#092e5e] bg-[#ffbd59]/15" : "border-gray-200"}`}>
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={on}
                        onClick={() => toggleAddon(addon.id)}
                        className="flex w-full items-start gap-4 p-5 text-left focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#d85024]"
                      >
                        <span
                          className={`mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md border-2 ${
                            on ? "border-[#092e5e] bg-[#092e5e] text-white" : "border-gray-400 bg-white"
                          }`}
                        >
                          {on && <Check />}
                        </span>
                        <span className="flex-1">
                          <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <span className="text-xl font-bold text-[#092e5e]">{addon.name}</span>
                            {addon.recommended && (
                              <span className="rounded-md bg-[#ffbd59] px-2 py-0.5 text-base font-semibold text-[#092e5e]">{addon.tag}</span>
                            )}
                            <span className="w-full text-xl font-bold text-[#092e5e] sm:ml-auto sm:w-auto">+${addon.flatPrice.toLocaleString()}</span>
                          </span>
                        </span>
                      </button>
                      <p className="-mt-2 px-5 pb-3 text-lg text-[#3e3d3b] sm:pl-16">{addon.description}</p>

                      {addon.id === "ridge-vents" && (
                        <div className="grid grid-cols-2 gap-3 px-3 pb-2 sm:gap-4 sm:px-5">
                          <figure>
                            <div className="overflow-hidden rounded-lg border border-gray-200">
                              <VentDiagram type="box" />
                            </div>
                            <figcaption className="mt-2 text-base text-gray-700">
                              <strong className="block text-[#092e5e]">Box vents</strong>
                              Standard. A few separate vents.
                            </figcaption>
                          </figure>
                          <figure>
                            <div className="overflow-hidden rounded-lg border border-gray-200">
                              <VentDiagram type="ridge" />
                            </div>
                            <figcaption className="mt-2 text-base text-gray-700">
                              <strong className="block text-[#092e5e]">Ridge vent</strong>
                              Upgrade. One vent along the whole peak.
                            </figcaption>
                          </figure>
                        </div>
                      )}

                      <details className="group px-5 pb-5 pt-2">
                        <summary className="inline-flex min-h-11 cursor-pointer list-none items-center text-lg font-semibold text-[#c04520] [&::-webkit-details-marker]:hidden">
                          <span className="group-open:hidden">Pros and cons &darr;</span>
                          <span className="hidden group-open:inline">Hide pros and cons &uarr;</span>
                        </summary>
                        <div className="mt-3 grid gap-4 sm:grid-cols-2">
                          <ul className="space-y-1.5">
                            {addon.pros.map((pro) => (
                              <li key={pro} className="flex items-start gap-2 text-base text-gray-700">
                                <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-700" />
                                {pro}
                              </li>
                            ))}
                          </ul>
                          <ul className="space-y-1.5">
                            {addon.cons.map((con) => (
                              <li key={con} className="flex items-start gap-2 text-base text-gray-700">
                                <span aria-hidden="true" className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center font-bold text-[#b8341c]">!</span>
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </details>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                <BackButton to="complexity" />
                <button
                  type="button"
                  onClick={() => setStep("result")}
                  className="rounded-lg bg-[#ffbd59] px-8 py-4 text-xl font-bold text-[#092e5e] hover:bg-[#f0ad40] focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#d85024]"
                >
                  See my estimate &rarr;
                </button>
              </div>
            </div>
          )}

          {/* ── Result ── */}
          {step === "result" && estimate && selectedMaterial && selectedSize && selectedComplexity && (
            <div>
              <div className="text-center">
                <StepHeading className="text-2xl font-bold text-[#092e5e]">Your estimated roof replacement</StepHeading>
                <p className="mt-4 flex flex-wrap items-baseline justify-center gap-x-3 text-[2.5rem] leading-tight font-extrabold tracking-tight text-[#092e5e] sm:text-6xl">
                  <span>${estimate.low.toLocaleString()}</span>
                  <span className="text-2xl font-semibold text-gray-500 sm:text-3xl">to</span>
                  <span>${estimate.high.toLocaleString()}</span>
                </p>
                <p className="mt-3 text-lg text-[#3e3d3b]">
                  or as low as <strong className="text-[#092e5e]">${Math.round(estimate.low / 60).toLocaleString()}/month</strong> with 0% financing through Enhancify (60 months)
                </p>
              </div>

              <a
                href={COMPANY.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex items-center justify-center rounded-lg bg-[#ffbd59] px-6 py-5 text-center text-xl font-bold text-[#092e5e] hover:bg-[#f0ad40]"
              >
                Get my exact price: free assessment
              </a>
              <p className="mt-2 text-center text-base text-gray-600">No obligation, no pressure.</p>

              <div className="mt-8 rounded-xl border border-gray-200">
                <h5 className="border-b border-gray-200 px-5 py-3 text-lg font-bold text-[#092e5e]">Your answers</h5>
                <dl className="divide-y divide-gray-200">
                  {[
                    { label: "Roof size", value: `${selectedSize.label} (about ${selectedSize.sqft} of roof)`, to: "size" as Step },
                    { label: "Shingles", value: `${selectedMaterial.name}, ${selectedMaterial.warranty} warranty`, to: "material" as Step },
                    { label: "Roof shape", value: selectedComplexity.label, to: "complexity" as Step },
                    {
                      label: "Extras",
                      value: selectedAddons.size
                        ? ADDONS.filter((a) => selectedAddons.has(a.id)).map((a) => `${a.name} (+$${a.flatPrice.toLocaleString()})`).join(", ")
                        : "None",
                      to: "addons" as Step,
                    },
                  ].map((row) => (
                    <div key={row.label} className="flex items-start gap-4 px-5 py-3">
                      <div className="flex-1 sm:flex sm:gap-4">
                        <dt className="text-base text-gray-600 sm:w-28 sm:flex-shrink-0">{row.label}</dt>
                        <dd className="text-lg text-[#3e3d3b]">{row.value}</dd>
                      </div>
                      <button
                        type="button"
                        onClick={() => setStep(row.to)}
                        className="-my-1 min-h-11 rounded-lg px-3 text-lg font-semibold text-[#c04520] underline-offset-4 hover:bg-gray-100 hover:underline"
                        aria-label={`Change ${row.label.toLowerCase()}`}
                      >
                        Change
                      </button>
                    </div>
                  ))}
                </dl>
              </div>

              <p className="mt-6 rounded-xl bg-[#f5f1ea] p-5 text-lg text-[#3e3d3b]">
                <strong className="text-[#092e5e]">This is a ballpark.</strong> Your actual price depends on things we can only
                see on-site: tear-off layers, decking, flashing, and vents. The assessment is free.
              </p>

              <div className="mt-8 overflow-hidden rounded-xl bg-black aspect-video">
                {playVideo ? (
                  <iframe
                    src="https://www.youtube-nocookie.com/embed/0hqL0UgHZUI?start=32&rel=0&autoplay=1&playsinline=1"
                    title="Meet French Roofing"
                    className="h-full w-full"
                    allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setPlayVideo(true)}
                    className="group relative block h-full w-full"
                    aria-label="Play video: Meet French Roofing"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://i.ytimg.com/vi/0hqL0UgHZUI/hqdefault.jpg" alt="" className="h-full w-full object-cover" loading="lazy" />
                    <span className="absolute inset-0 flex items-end justify-start bg-gradient-to-t from-black/50 to-transparent p-4 group-hover:from-black/40">
                      <span className="flex items-center gap-3 rounded-full bg-[#ffbd59] px-6 py-3 text-lg font-bold text-[#092e5e]">
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l10.6-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14z" /></svg>
                        Meet the crew
                      </span>
                    </span>
                  </button>
                )}
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <a href="/financing" className="flex items-center justify-center rounded-lg border-2 border-[#092e5e] px-6 py-4 text-center text-lg font-semibold text-[#092e5e] hover:bg-[#092e5e] hover:text-white">
                  How financing works
                </a>
                <a href="/essentials" className="flex items-center justify-center rounded-lg border-2 border-[#092e5e] px-6 py-4 text-center text-lg font-semibold text-[#092e5e] hover:bg-[#092e5e] hover:text-white">
                  10 questions to ask any roofer
                </a>
              </div>

              <div className="mt-6 text-center">
                <button type="button" onClick={reset} className="rounded-lg px-3 py-2 text-lg font-medium text-[#092e5e] underline underline-offset-4 hover:bg-gray-100">
                  Start over
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
