"use client";

import { useState } from "react";
import { COMPANY } from "@/lib/constants";

const MATERIALS = [
  {
    id: "3tab",
    name: "3-Tab Shingles",
    multiplier: 0.7,
    warranty: "20–25 years",
    pros: ["Most affordable option", "Clean, uniform look", "Easy to repair"],
    cons: ["Shorter lifespan", "Less wind resistance", "Fewer style options"],
    description: "A solid budget-friendly choice for homeowners who want reliable protection without the premium price tag.",
  },
  {
    id: "architectural",
    name: "Architectural Shingles",
    multiplier: 1.0,
    warranty: "30–50 years",
    pros: ["Most popular choice", "Dimensional look adds curb appeal", "Strong wind resistance (up to 130 mph)", "Wide color selection"],
    cons: ["Mid-range cost", "Heavier than 3-tab"],
    description: "The go-to for most homeowners. Great balance of durability, looks, and value. This is what we install most often.",
  },
  {
    id: "premium",
    name: "Premium Designer Shingles",
    multiplier: 1.3,
    warranty: "50+ years / Lifetime",
    pros: ["Mimics slate or cedar shake", "Maximum curb appeal", "Best manufacturer warranties", "Excellent wind & impact resistance"],
    cons: ["Higher upfront cost", "Heavier — may need structural check"],
    description: "For homeowners who want the best of the best. Stunning looks with top-tier protection and warranty coverage.",
  },
  {
    id: "metal",
    name: "Standing Seam Metal",
    multiplier: 1.6,
    warranty: "40–70 years",
    pros: ["Longest lifespan", "Energy efficient (reflects heat)", "Fire & wind resistant", "Low maintenance", "Great for Oregon rain"],
    cons: ["Highest upfront cost", "Can be louder in heavy rain", "Fewer local installers"],
    description: "The long game. Higher upfront investment, but metal roofs can last a lifetime with almost zero maintenance.",
  },
] as const;

const ROOF_SIZES = [
  { id: "small", label: "Small", range: "Under 1,500 sq ft", squares: 15 },
  { id: "medium", label: "Medium", range: "1,500 – 2,500 sq ft", squares: 25 },
  { id: "large", label: "Large", range: "2,500 – 3,500 sq ft", squares: 35 },
  { id: "xl", label: "Extra Large", range: "3,500+ sq ft", squares: 45 },
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

const BASE_PRICE_PER_SQUARE = 500;

type Step = "size" | "material" | "complexity" | "result";

export default function RoofEstimator({ compact = false }: { compact?: boolean }) {
  const [step, setStep] = useState<Step>("size");
  const [sizeId, setSizeId] = useState<string | null>(null);
  const [materialId, setMaterialId] = useState<string | null>(null);
  const [complexityId, setComplexityId] = useState<string | null>(null);

  const selectedSize = ROOF_SIZES.find((s) => s.id === sizeId);
  const selectedMaterial = MATERIALS.find((m) => m.id === materialId);
  const selectedComplexity = COMPLEXITY.find((c) => c.id === complexityId);

  function getEstimate() {
    if (!selectedSize || !selectedMaterial || !selectedComplexity) return null;
    const base = selectedSize.squares * BASE_PRICE_PER_SQUARE * selectedMaterial.multiplier * selectedComplexity.multiplier;
    const low = Math.round(base * 0.85 / 100) * 100;
    const high = Math.round(base * 1.15 / 100) * 100;
    return { low, high };
  }

  function reset() {
    setStep("size");
    setSizeId(null);
    setMaterialId(null);
    setComplexityId(null);
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
            Get a ballpark price in 60 seconds — no contact info required
          </p>
        </div>

        {/* Progress bar */}
        <div className="flex border-b border-gray-100">
          {(["size", "material", "complexity", "result"] as Step[]).map((s, i) => {
            const stepLabels = ["Size", "Material", "Complexity", "Estimate"];
            const stepIndex = ["size", "material", "complexity", "result"].indexOf(step);
            const isActive = i <= stepIndex;
            return (
              <div key={s} className={`flex-1 py-2 text-center text-xs font-medium ${isActive ? "bg-[#ffbd59]/20 text-[#092e5e]" : "text-gray-400"}`}>
                <span className={`inline-flex items-center justify-center h-5 w-5 rounded-full text-[10px] font-bold mr-1 ${isActive ? "bg-[#d85024] text-white" : "bg-gray-200 text-gray-500"}`}>
                  {i + 1}
                </span>
                <span className="hidden sm:inline">{stepLabels[i]}</span>
              </div>
            );
          })}
        </div>

        <div className="p-6 sm:p-8">
          {/* ── Step 1: Roof Size ── */}
          {step === "size" && (
            <div>
              <h4 className="text-lg font-semibold text-[#092e5e] mb-2">
                How big is your home?
              </h4>
              <p className="text-sm text-gray-500 mb-6">
                Pick the closest match — don&apos;t worry about being exact, that&apos;s what the full assessment is for.
              </p>
              <div className="grid grid-cols-2 gap-3">
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
                    <span className="block text-xs text-gray-500 mt-1">
                      {size.range}
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
                      <span className="flex-shrink-0 rounded-full bg-[#092e5e]/5 px-3 py-1 text-xs font-medium text-[#092e5e]">
                        {mat.multiplier === 1.0
                          ? "Most Popular"
                          : mat.multiplier < 1
                          ? "Budget"
                          : mat.multiplier >= 1.5
                          ? "Premium"
                          : "Upgrade"}
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
                      setStep("result");
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

          {/* ── Step 4: Result ── */}
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
                    <span className="block text-xs text-gray-500">Home Size</span>
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
              </div>

              <div className="rounded-xl bg-[#ffbd59]/10 border border-[#ffbd59]/30 p-4 text-sm text-[#3e3d3b] mb-6">
                <strong className="text-[#092e5e]">This is a ballpark estimate.</strong>{" "}
                Your actual price depends on tear-off layers, decking condition,
                flashing, vents, and other factors we can only assess on-site.
                The good news? Our assessment is completely free — no obligation,
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

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={COMPANY.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-[#d85024] px-8 py-4 text-lg font-semibold text-white hover:bg-[#c04520] transition-colors"
                >
                  Book Your FREE Assessment
                </a>
                <a
                  href={COMPANY.phoneTel}
                  className="text-lg font-semibold text-[#092e5e]"
                >
                  Or call {COMPANY.phone}
                </a>
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
