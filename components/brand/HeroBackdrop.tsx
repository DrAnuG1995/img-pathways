/**
 * Decorative hero backdrop — abstract "pathway" routes converging on a
 * destination node, plus soft colour washes. Purely ornamental (aria-hidden),
 * sits behind hero content at low opacity. No photos, no external assets.
 */
export default function HeroBackdrop({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 520"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="hb-wash-a" cx="0.18" cy="0.2" r="0.5">
          <stop offset="0" stopColor="#1F5C8C" stopOpacity="0.16" />
          <stop offset="1" stopColor="#1F5C8C" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hb-wash-b" cx="0.85" cy="0.1" r="0.55">
          <stop offset="0" stopColor="#2A9D8F" stopOpacity="0.14" />
          <stop offset="1" stopColor="#2A9D8F" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hb-line" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#1F5C8C" stopOpacity="0.0" />
          <stop offset="0.5" stopColor="#1F5C8C" stopOpacity="0.5" />
          <stop offset="1" stopColor="#2A9D8F" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      <rect width="1200" height="520" fill="url(#hb-wash-a)" />
      <rect width="1200" height="520" fill="url(#hb-wash-b)" />

      {/* Converging pathways toward a destination node, top-right */}
      <g stroke="url(#hb-line)" strokeWidth="2" strokeLinecap="round">
        <path d="M-20 470 C 300 460, 520 360, 1020 120" />
        <path d="M-20 540 C 360 520, 640 420, 1020 120" fill="none" opacity="0.7" />
        <path d="M120 560 C 420 470, 700 470, 1020 120" opacity="0.55" />
      </g>

      {/* Route nodes */}
      <g fill="#1F5C8C">
        <circle cx="300" cy="441" r="4" opacity="0.5" />
        <circle cx="560" cy="360" r="3.5" opacity="0.45" />
        <circle cx="700" cy="430" r="3.5" opacity="0.4" />
      </g>

      {/* Destination: medical cross node */}
      <g transform="translate(1020 120)">
        <circle r="30" fill="#fff" opacity="0.9" />
        <circle r="30" fill="none" stroke="#2A9D8F" strokeWidth="2" opacity="0.6" />
        <path
          d="M0 -13V13M-13 0H13"
          stroke="#1F5C8C"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
