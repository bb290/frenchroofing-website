"use client";

import { useState } from "react";
import { COMPANY } from "@/lib/constants";

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
  { id: "small", label: "Small Roof", range: "10 – 15 squares", squares: 12, hint: "Typical for smaller ranch homes, cottages, or detached garages" },
  { id: "medium", label: "Medium Roof", range: "15 – 25 squares", squares: 20, hint: "Most common - average single-story or smaller two-story homes" },
  { id: "large", label: "Large Roof", range: "25 – 35 squares", squares: 30, hint: "Larger single-story, split-level, or mid-size two-story homes" },
  { id: "xl", label: "Extra Large Roof", range: "35+ squares", squares: 40, hint: "Large two-story homes, complex rooflines, or multi-section roofs" },
] as const;

const COMPLEXITY = [
  {
    id: "standard",
    label: "Standard",
    multiplier: 1.0,
    description: "Walkable pitch, simple layout, few features",
  },
  {
    id: "moderate",
    label: "Moderate",
    multiplier: 1.15,
    description: "Steeper sections, some valleys or dormers",
  },
  {
    id: "complex",
    label: "Complex",
    multiplier: 1.3,
    description: "Steep pitch, multiple levels, many penetrations",
  },
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
const ALL_STEPS: Step[] = ["size", "material", "complexity", "addons", "result"];
const STEP_LABELS = ["Size", "Material", "Complexity", "Add-Ons", "Estimate"];

export default function RoofEstimator({ compact = false }: { compact?: boolean }) {
  const [step, setStep] = useState<Step>("size");
  const [sizeId, setSizeId] = useState<string | null>(null);
  const [materialId, setMaterialId] = useState<string | null>(null);
  const [complexityId, setComplexityId] = useState<string | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<Set<string>>(new Set());

  const selectedSize = ROOF_SIZES.find((s) => s.id === sizeId);
  const selectedMaterial = MATERIALS.find((m) => m.id === materialId);
  const selectedComplexity = COMPLEXITY.find((c) => c.id === complexityId);

  function toggleAddon(id: string) {
    setSelectedAddons((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
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

  const estimate = getEstimate();

  return (
    <div className={compact ? "" : "mx-auto max-w-3xl"}>
      <div className="rounded-2xl border border-gray-200 bg-white shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-[#092e5e] px-6 py-5 sm:px-8">
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Instant Roof Estimate
          </h3>
          <p className="text-sm text-gray-300 mt-1">
            Get a ballpark price in 60 seconds - no contact info required
          </p>
        </div>

        {/* Progress bar */}
        <div className="flex border-b border-gray-100">
          {ALL_STEPS.map((s, i) => {
            const stepIndex = ALL_STEPS.indexOf(step);
            const isActive = i <= stepIndex;
            return (
              <div key={s} className={`flex-1 py-2 text-center text-xs font-medium ${isActive ? "bg-[#ffbd59]/20 text-[#092e5e]" : "text-gray-400"}`}>
                <span className={`inline-flex items-center justify-center h-5 w-5 rounded-full text-[10px] font-bold mr-1 ${isActive ? "bg-[#d85024] text-white" : "bg-gray-200 text-gray-500"}`}>
                  {i + 1}
                </span>
                <span className="hidden sm:inline">{STEP_LABELS[i]}</span>
              </div>
            );
          })}
        </div>

        <div className="p-6 sm:p-8">
          {/* ── Step 1: Roof Size ── */}
          {step === "size" && (
            <div>
              <h4 className="text-lg font-semibold text-[#092e5e] mb-2">
                How big is your roof?
              </h4>
              <p className="text-sm text-gray-500 mb-2">
                Roofs are measured in <strong>squares</strong> (1 square = 10&apos; x 10&apos; = 100 sq ft). Pick the closest match - don&apos;t worry about being exact, that&apos;s what the full assessment is for.
              </p>
              <p className="text-xs text-gray-400 mb-6">
                Not sure how many squares your roof is? Most homes fall in the 15–25 range. We&apos;ll measure it precisely during your free assessment.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ROOF_SIZES.map((size) => (
                  <button
                    key={size.id}
                    type="button"
                    onClick={() => {
                      setSizeId(size.id);
                      setStep("material");
                    }}
                    className={`rounded-xl border-2 p-4 text-left transition-all hover:border-[#d85024] hover:shadow-md ${
                      sizeId === size.id ? "border-[#d85024] bg-[#d85024]/5" : "border-gray-200"
                    }`}
                  >
                    <span className="block text-base font-semibold text-[#092e5e]">
                      {size.label}
                    </span>
                    <span className="block text-sm font-medium text-[#d85024] mt-0.5">
                      {size.range}
                    </span>
                    <span className="block text-xs text-gray-500 mt-1">
                      {size.hint}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Step 2: Material ── */}
          {step === "material" && (
            <div>
              <h4 className="text-lg font-semibold text-[#092e5e] mb-2">
                Choose a roofing material
              </h4>
              <p className="text-sm text-gray-500 mb-6">
                Each material has trade-offs. We&apos;ll help you pick the right one during your assessment.
              </p>
              <div className="space-y-3">
                {MATERIALS.map((mat) => (
                  <button
                    key={mat.id}
                    type="button"
                    onClick={() => {
                      setMaterialId(mat.id);
                      setStep("complexity");
                    }}
                    className={`w-full rounded-xl border-2 p-5 text-left transition-all hover:border-[#d85024] hover:shadow-md ${
                      materialId === mat.id ? "border-[#d85024] bg-[#d85024]/5" : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <span className="block text-base font-semibold text-[#092e5e]">
                          {mat.name}
                        </span>
                        <span className="block text-xs text-gray-500 mt-0.5">
                          Warranty: {mat.warranty}
                        </span>
                        <p className="text-sm text-gray-600 mt-2">
                          {mat.description}
                        </p>
                      </div>
                      <span className={`flex-shrink-0 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                        mat.tag === "Good"
                          ? "bg-[#092e5e]/10 text-[#092e5e]"
                          : mat.tag === "Better"
                          ? "bg-[#ffbd59]/20 text-[#d85024]"
                          : "bg-[#d85024]/10 text-[#d85024]"
                      }`}>
                        {mat.tag}
                      </span>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-green-700">Pros</span>
                        <ul className="mt-1 space-y-0.5">
                          {mat.pros.map((pro) => (
                            <li key={pro} className="flex items-start gap-1.5 text-xs text-gray-600">
                              <svg className="h-3 w-3 mt-0.5 flex-shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-red-700">Cons</span>
                        <ul className="mt-1 space-y-0.5">
                          {mat.cons.map((con) => (
                            <li key={con} className="flex items-start gap-1.5 text-xs text-gray-600">
                              <svg className="h-3 w-3 mt-0.5 flex-shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setStep("size")}
                className="mt-4 text-sm text-gray-500 hover:text-[#d85024]"
              >
                &larr; Back
              </button>
            </div>
          )}

          {/* ── Step 3: Complexity ── */}
          {step === "complexity" && (
            <div>
              <h4 className="text-lg font-semibold text-[#092e5e] mb-2">
                How complex is your roof?
              </h4>
              <p className="text-sm text-gray-500 mb-6">
                Steeper roofs and more features (valleys, dormers, skylights) take more time and materials.
              </p>
              <div className="space-y-3">
                {COMPLEXITY.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      setComplexityId(c.id);
                      setStep("addons");
                    }}
                    className={`w-full rounded-xl border-2 p-5 text-left transition-all hover:border-[#d85024] hover:shadow-md ${
                      complexityId === c.id ? "border-[#d85024] bg-[#d85024]/5" : "border-gray-200"
                    }`}
                  >
                    <span className="block text-base font-semibold text-[#092e5e]">
                      {c.label}
                    </span>
                    <span className="block text-sm text-gray-500 mt-1">
                      {c.description}
                    </span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setStep("material")}
                className="mt-4 text-sm text-gray-500 hover:text-[#d85024]"
              >
                &larr; Back
              </button>
            </div>
          )}

          {/* ── Step 4: Add-Ons ── */}
          {step === "addons" && (
            <div>
              <h4 className="text-lg font-semibold text-[#092e5e] mb-2">
                Want to add anything to your project?
              </h4>
              <p className="text-sm text-gray-500 mb-6">
                These are popular upgrades our customers bundle with their roof replacement. Select any that interest you - or skip ahead.
              </p>
              <div className="space-y-4">
                {ADDONS.map((addon) => {
                  const isSelected = selectedAddons.has(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon.id)}
                      className={`w-full rounded-xl border-2 p-5 text-left transition-all hover:shadow-md ${
                        isSelected
                          ? "border-[#d85024] bg-[#d85024]/5"
                          : "border-gray-200 hover:border-[#d85024]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <div
                              className={`h-5 w-5 rounded flex-shrink-0 flex items-center justify-center border-2 transition-colors ${
                                isSelected
                                  ? "bg-[#d85024] border-[#d85024]"
                                  : "border-gray-300"
                              }`}
                            >
                              {isSelected && (
                                <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                              )}
                            </div>
                            <span className="text-base font-semibold text-[#092e5e]">
                              {addon.name}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-2 ml-7">
                            {addon.description}
                          </p>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <span className="block text-base font-bold text-[#092e5e]">
                            +${addon.flatPrice.toLocaleString()}
                          </span>
                          <span className={`inline-block mt-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                            addon.recommended
                              ? "bg-[#ffbd59]/20 text-[#d85024]"
                              : "bg-[#092e5e]/5 text-[#092e5e]"
                          }`}>
                            {addon.tag}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 ml-7 grid grid-cols-2 gap-3">
                        <div>
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-green-700">Pros</span>
                          <ul className="mt-1 space-y-0.5">
                            {addon.pros.map((pro) => (
                              <li key={pro} className="flex items-start gap-1.5 text-xs text-gray-600">
                                <svg className="h-3 w-3 mt-0.5 flex-shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-red-700">Cons</span>
                          <ul className="mt-1 space-y-0.5">
                            {addon.cons.map((con) => (
                              <li key={con} className="flex items-start gap-1.5 text-xs text-gray-600">
                                <svg className="h-3 w-3 mt-0.5 flex-shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="mt-6 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep("complexity")}
                  className="text-sm text-gray-500 hover:text-[#d85024]"
                >
                  &larr; Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep("result")}
                  className="rounded-lg bg-[#d85024] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#c04520] transition-colors"
                >
                  {selectedAddons.size > 0
                    ? `See Estimate with ${selectedAddons.size} Add-On${selectedAddons.size > 1 ? "s" : ""}`
                    : "Skip - See Estimate"}
                </button>
              </div>
            </div>
          )}

          {/* ── Step 5: Result ── */}
          {step === "result" && estimate && selectedMaterial && selectedSize && selectedComplexity && (
            <div className="text-center">
              <div className="inline-flex items-center rounded-full bg-green-50 px-4 py-1.5 text-sm font-medium text-green-700 mb-4">
                Estimate ready
              </div>
              <h4 className="text-lg font-semibold text-[#092e5e] mb-1">
                Your Estimated Roof Replacement Cost
              </h4>
              <p className="text-5xl sm:text-6xl font-bold text-[#092e5e] my-6">
                ${estimate.low.toLocaleString()}{" "}
                <span className="text-2xl text-gray-400">–</span>{" "}
                ${estimate.high.toLocaleString()}
              </p>

              {/* Summary */}
              <div className="rounded-xl bg-gray-50 p-5 text-left mb-6">
                <h5 className="text-sm font-semibold text-[#092e5e] mb-3">
                  Your selections:
                </h5>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="block text-xs text-gray-500">Roof Size</span>
                    <span className="font-medium text-[#3e3d3b]">
                      {selectedSize.label}
                    </span>
                    <span className="block text-xs text-gray-400">
                      {selectedSize.range}
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs text-gray-500">Material</span>
                    <span className="font-medium text-[#3e3d3b]">
                      {selectedMaterial.name}
                    </span>
                    <span className="block text-xs text-gray-400">
                      {selectedMaterial.warranty} warranty
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs text-gray-500">Complexity</span>
                    <span className="font-medium text-[#3e3d3b]">
                      {selectedComplexity.label}
                    </span>
                  </div>
                </div>
                {selectedAddons.size > 0 && (
                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <span className="block text-xs text-gray-500 mb-1">Add-Ons</span>
                    <div className="space-y-1">
                      {ADDONS.filter((a) => selectedAddons.has(a.id)).map((a) => (
                        <div key={a.id} className="flex items-center justify-between text-sm">
                          <span className="font-medium text-[#3e3d3b]">{a.name}</span>
                          <span className="text-xs text-gray-500">+${a.flatPrice.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="rounded-xl bg-[#ffbd59]/10 border border-[#ffbd59]/30 p-4 text-sm text-[#3e3d3b] mb-6">
                <strong className="text-[#092e5e]">This is a ballpark estimate.</strong>{" "}
                Your actual price depends on tear-off layers, decking condition,
                flashing, vents, and other factors we can only assess on-site.
                The good news? Our assessment is completely free - no obligation,
                no pressure.
              </div>

              {/* Financing callout */}
              <div className="rounded-xl bg-[#092e5e]/5 p-4 text-sm text-[#3e3d3b] mb-8">
                <strong className="text-[#092e5e]">0% financing available</strong>{" "}
                through Enhancify. That&apos;s as low as{" "}
                <strong>
                  ${Math.round(estimate.low / 60).toLocaleString()}/mo
                </strong>{" "}
                with a 60-month plan. No-impact credit check to pre-qualify.
              </div>

              {/* What Next */}
              <div className="rounded-xl bg-gray-50 p-6 text-left">
                <h5 className="text-lg font-bold text-[#092e5e] text-center mb-5">
                  What Next?
                </h5>
                <div className="flex flex-col gap-3">
                  <a
                    href={COMPANY.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center rounded-lg bg-[#d85024] px-6 py-4 text-base font-semibold text-white hover:bg-[#c04520] transition-colors"
                  >
                    Schedule Free Assessment
                  </a>
                  <div className="my-1 overflow-hidden rounded-lg aspect-video bg-black">
                    <iframe
                      src="https://www.youtube-nocookie.com/embed/0hqL0UgHZUI?start=32&rel=0&autoplay=1&mute=1&playsinline=1"
                      title="Meet French Roofing"
                      className="w-full h-full"
                      allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                  <a
                    href="/financing"
                    className="flex items-center justify-center rounded-lg border-2 border-[#092e5e] px-6 py-4 text-base font-semibold text-[#092e5e] hover:bg-[#092e5e] hover:text-white transition-colors"
                  >
                    Learn More About Financing
                  </a>
                  <a
                    href="/essentials"
                    className="flex items-center justify-center rounded-lg border-2 border-[#ffbd59] px-6 py-4 text-base font-semibold text-[#092e5e] hover:bg-[#ffbd59] transition-colors"
                  >
                    Learn More About French Roofing
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={reset}
                className="mt-6 text-sm text-gray-500 hover:text-[#d85024]"
              >
                Start over with different options
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
