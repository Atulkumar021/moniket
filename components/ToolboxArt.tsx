/* Premium glassmorphism toolbox illustration with floating icon chips. */

function chip(
  key: string,
  points: string,
  cx: number,
  cy: number,
  grad: string,
  glyph: React.ReactNode,
  delay: number
) {
  return (
    <g
      key={key}
      style={{
        animation: "floaty 4.6s ease-in-out infinite",
        animationDelay: `${delay}s`,
        transformBox: "fill-box",
        transformOrigin: "center",
      }}
    >
      <polygon points={points} fill={`url(#${grad})`} stroke="rgba(255,255,255,.7)" strokeWidth="1" filter="url(#tbx-sh)" />
      <polygon points={points} fill="#fff" opacity="0.12" transform={`translate(0 -2)`} clipPath="none" />
      <g transform={`translate(${cx} ${cy})`} stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {glyph}
      </g>
    </g>
  );
}

export default function ToolboxArt() {
  return (
    <svg viewBox="0 0 360 300" width="100%" height="100%" fill="none" aria-hidden>
      <defs>
        <linearGradient id="tbx-box" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#BFE0FF" />
          <stop offset="1" stopColor="#7FB6F5" />
        </linearGradient>
        <linearGradient id="tbx-box2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#A7CDFB" />
          <stop offset="1" stopColor="#5C97E8" />
        </linearGradient>
        <linearGradient id="tbx-blue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8FD0FB" />
          <stop offset="1" stopColor="#2E90FA" />
        </linearGradient>
        <linearGradient id="tbx-indigo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#A5B4FF" />
          <stop offset="1" stopColor="#6366F1" />
        </linearGradient>
        <linearGradient id="tbx-sky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#CDEBFF" />
          <stop offset="1" stopColor="#5CC1F5" />
        </linearGradient>
        <linearGradient id="tbx-deep" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5BA8F5" />
          <stop offset="1" stopColor="#1F6FD6" />
        </linearGradient>
        <radialGradient id="tbx-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#9FD4FF" stopOpacity="0.5" />
          <stop offset="1" stopColor="#9FD4FF" stopOpacity="0" />
        </radialGradient>
        <filter id="tbx-sh" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#2E90FA" floodOpacity="0.28" />
        </filter>
      </defs>

      {/* glow */}
      <ellipse cx="195" cy="150" rx="160" ry="130" fill="url(#tbx-glow)" />

      {/* toolbox */}
      <g filter="url(#tbx-sh)">
        {/* left face */}
        <polygon points="105,192 185,234 185,286 105,244" fill="url(#tbx-box2)" opacity="0.92" />
        {/* right face */}
        <polygon points="185,234 265,192 265,244 185,286" fill="url(#tbx-box)" opacity="0.92" />
        {/* top rim */}
        <polygon points="185,150 265,192 185,234 105,192" fill="#EAF4FF" opacity="0.95" />
        {/* opening */}
        <polygon points="185,162 248,196 185,228 122,196" fill="#9FC4EE" opacity="0.65" />
      </g>
      {/* rim highlight */}
      <polyline points="105,192 185,150 265,192" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.7" />

      {/* floating cubes */}
      <g style={{ animation: "floaty 5.2s ease-in-out infinite", transformBox: "fill-box", transformOrigin: "center" }}>
        <polygon points="58,150 72,158 58,166 44,158" fill="#CFE6FF" stroke="#fff" strokeWidth="1" opacity="0.9" />
        <polygon points="58,166 58,180 44,172 44,158" fill="#A9CDF5" opacity="0.85" />
        <polygon points="58,166 58,180 72,172 72,158" fill="#8FBDF0" opacity="0.85" />
      </g>
      <g style={{ animation: "floaty 4s ease-in-out infinite", animationDelay: ".6s", transformBox: "fill-box", transformOrigin: "center" }}>
        <polygon points="330,206 340,211 330,216 320,211" fill="#CFE6FF" stroke="#fff" strokeWidth="1" opacity="0.9" />
        <polygon points="330,216 330,226 320,221 320,211" fill="#A9CDF5" opacity="0.85" />
        <polygon points="330,216 330,226 340,221 340,211" fill="#8FBDF0" opacity="0.85" />
      </g>

      {/* dots */}
      <g fill="#7FB6F5" opacity="0.5">
        <circle cx="120" cy="150" r="2" />
        <circle cx="300" cy="70" r="2" />
        <circle cx="335" cy="160" r="2" />
        <circle cx="90" cy="220" r="2" />
      </g>

      {/* chips */}
      {chip("k8s", "200,40 226,55 226,85 200,100 174,85 174,55", 200, 70, "tbx-blue",
        <>
          <circle r="9" />
          <circle r="2.4" />
          <line x1="0" y1="-9" x2="0" y2="-4" />
          <line x1="8" y1="4.5" x2="3.5" y2="2" />
          <line x1="-8" y1="4.5" x2="-3.5" y2="2" />
          <line x1="0" y1="9" x2="0" y2="4" />
        </>, 0)}

      {chip("term", "288,50 309,62 309,86 288,98 267,86 267,62", 288, 74, "tbx-indigo",
        <>
          <path d="M-6 -5 -1 0 -6 5" />
          <line x1="1" y1="5" x2="6" y2="5" />
        </>, 0.8)}

      {chip("docker", "148,90 167,101 167,123 148,134 129,123 129,101", 148, 112, "tbx-sky",
        <>
          <rect x="-7" y="-1" width="4.5" height="4.5" rx="0.6" />
          <rect x="-1.5" y="-1" width="4.5" height="4.5" rx="0.6" />
          <rect x="4" y="-1" width="4.5" height="4.5" rx="0.6" />
          <rect x="-1.5" y="-6.5" width="4.5" height="4.5" rx="0.6" />
          <path d="M-9 3.5c4 3 13 3 17 0" />
        </>, 1.4)}

      {chip("shield", "250,114 267,124 267,144 250,154 233,144 233,124", 250, 134, "tbx-deep",
        <>
          <path d="M0 -7 6 -4.5v4C6 0 3 3 0 4.5 -3 3 -6 0 -6 -.5v-4z" />
        </>, 0.4)}

      {chip("cloud", "316,103 331,112 331,129 316,137 301,129 301,112", 316, 120, "tbx-sky",
        <>
          <path d="M5 2H-4a3 3 0 0 1-.4-6A4 4 0 0 1 4 -1a2.5 2.5 0 0 1 1 5z" />
        </>, 1.1)}
    </svg>
  );
}
