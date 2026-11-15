/*
  Simple drawn comparison of box vents vs a ridge vent (2026-11-15). Same roof, seen from the street, with the
  attic air drawn as arrows. Illustrations, not photos: French Roofing's photo library has box vents but no clear
  ridge vent yet. Swap in real photos when there's a good ridge vent shot.
*/
export default function VentDiagram({ type }: { type: "box" | "ridge" }) {
  const isRidge = type === "ridge";
  return (
    <svg
      viewBox="0 0 240 150"
      className="h-auto w-full"
      role="img"
      aria-label={
        isRidge
          ? "Illustration: a ridge vent runs along the whole peak of the roof, letting attic air out evenly"
          : "Illustration: box vents are separate square vents set into the roof near the peak, each letting air out in one spot"
      }
    >
      <rect x="0" y="0" width="240" height="150" fill="#e8f1f8" />
      {/* house wall */}
      <rect x="40" y="96" width="160" height="46" fill="#fdfcfa" stroke="#c9c2b3" strokeWidth="1.5" />
      <rect x="108" y="112" width="22" height="30" fill="#092e5e" opacity="0.85" />
      <rect x="60" y="108" width="26" height="18" fill="#bcd3e6" stroke="#c9c2b3" />
      <rect x="152" y="108" width="26" height="18" fill="#bcd3e6" stroke="#c9c2b3" />
      {/* roof plane */}
      <polygon points="28,98 212,98 186,40 54,40" fill="#4b5563" />
      {/* shingle courses */}
      {[52, 64, 76, 88].map((y) => (
        <line key={y} x1={54 - ((y - 40) * 26) / 58} y1={y} x2={186 + ((y - 40) * 26) / 58} y2={y} stroke="#6b7280" strokeWidth="1" />
      ))}
      {isRidge ? (
        <>
          {/* continuous ridge vent along the peak */}
          <rect x="52" y="34" width="136" height="8" rx="2" fill="#2c2b29" />
          <rect x="52" y="34" width="136" height="3" rx="1.5" fill="#6b7280" />
          {[70, 95, 120, 145, 170].map((x) => (
            <path key={x} d={`M${x} 30 v-14 m-5 5 l5 -5 l5 5`} stroke="#d85024" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          ))}
        </>
      ) : (
        <>
          {/* separate box vents near the top */}
          {[78, 120, 162].map((x) => (
            <g key={x}>
              <rect x={x - 9} y="46" width="18" height="12" rx="2" fill="#2c2b29" />
              <rect x={x - 9} y="46" width="18" height="4" rx="2" fill="#6b7280" />
              <path d={`M${x} 42 v-14 m-5 5 l5 -5 l5 5`} stroke="#d85024" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          ))}
        </>
      )}
    </svg>
  );
}
