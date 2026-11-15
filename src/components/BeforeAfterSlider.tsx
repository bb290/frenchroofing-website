"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

type Photo = { src: string; alt: string };

/*
  Before/after comparison slider (2026-11-15). Drag anywhere on the photo (mouse or touch) or use the handle with the
  keyboard (arrow keys, Home, End). Vertical swipes still scroll the page (touch-action: pan-y). Both photos are real
  <img> elements with their own alt text, so search engines and screen readers get both descriptions.
*/
export default function BeforeAfterSlider({
  before,
  after,
  start = 50,
}: {
  before: Photo;
  after: Photo;
  start?: number;
}) {
  const [pos, setPos] = useState(start);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const moveTo = useCallback((clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    const pct = ((clientX - r.left) / r.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 5;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") setPos((p) => Math.max(0, p - step));
    else if (e.key === "ArrowRight" || e.key === "ArrowUp") setPos((p) => Math.min(100, p + step));
    else if (e.key === "Home") setPos(0);
    else if (e.key === "End") setPos(100);
    else return;
    e.preventDefault();
  };

  return (
    <div
      ref={box}
      className="relative aspect-[4/5] w-full overflow-hidden rounded-xl select-none cursor-ew-resize bg-gray-100"
      style={{ touchAction: "pan-y" }}
      onPointerDown={(e) => {
        dragging.current = true;
        (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
        moveTo(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && moveTo(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      {/* After sits underneath; Before is clipped from the right as the handle moves. */}
      <Image src={after.src} alt={after.alt} fill sizes="(min-width: 640px) 576px, 100vw" className="object-cover pointer-events-none" draggable={false} />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before.src} alt={before.alt} fill sizes="(min-width: 640px) 576px, 100vw" className="object-cover pointer-events-none" draggable={false} />
      </div>

      <span className="pointer-events-none absolute left-3 top-3 rounded-md bg-[#092e5e]/85 px-3 py-1 text-sm font-semibold uppercase tracking-wider text-white">
        Before
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-md bg-[#ffbd59] px-3 py-1 text-sm font-semibold uppercase tracking-wider text-[#092e5e]">
        After
      </span>

      {/* Divider and handle */}
      <div className="pointer-events-none absolute inset-y-0 w-[3px] -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(9,46,94,0.25)]" style={{ left: `${pos}%` }} />
      <div
        role="slider"
        tabIndex={0}
        aria-label="Drag to compare the roof before and after"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        aria-valuetext={`${Math.round(pos)}% before photo showing`}
        onKeyDown={onKey}
        className="absolute top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-[#092e5e] text-white shadow-[0_4px_12px_rgba(9,46,94,0.35)] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#ffbd59]"
        style={{ left: `${pos}%` }}
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2.25} stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5 3.75 12l4.5 4.5M15.75 7.5l4.5 4.5-4.5 4.5" />
        </svg>
      </div>
    </div>
  );
}
