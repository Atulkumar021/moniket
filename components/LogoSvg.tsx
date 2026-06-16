export default function LogoSvg({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 420 115"
      className={className}
      aria-label="Moniket Technologies"
      role="img"
    >
      <defs>
        {/* Clip back half of ring (below planet center) */}
        <clipPath id="ring-b">
          <rect x="0" y="40" width="200" height="80" />
        </clipPath>
        {/* Clip front half of ring (above planet center) */}
        <clipPath id="ring-f">
          <rect x="0" y="-20" width="200" height="60" />
        </clipPath>
      </defs>

      {/* ── M ── */}
      <text
        x="2" y="80"
        fontFamily="'Arial Black','Arial Bold',Gadget,sans-serif"
        fontWeight="900" fontSize="78"
        className="logo-letter"
      >M</text>

      {/* ── Planet (replaces O) ── */}
      {/* Back half of ring */}
      <ellipse cx="100" cy="40" rx="44" ry="12"
        fill="none" stroke="#E07020" strokeWidth="5"
        transform="rotate(-18 100 40)"
        clipPath="url(#ring-b)"
        strokeOpacity="0.55"
      />
      {/* Sphere */}
      <circle cx="100" cy="40" r="31" fill="#E07020" />
      {/* Subtle inner highlight */}
      <ellipse cx="93" cy="33" rx="8.5" ry="6.5"
        fill="#F09040" opacity="0.38"
        transform="rotate(-12 93 33)"
      />
      {/* Front half of ring */}
      <ellipse cx="100" cy="40" rx="44" ry="12"
        fill="none" stroke="#E07020" strokeWidth="5"
        transform="rotate(-18 100 40)"
        clipPath="url(#ring-f)"
      />
      {/* Dot on ring (upper-right) */}
      <circle cx="142" cy="24" r="5.5" fill="#E07020" />

      {/* ── NIKET ── */}
      <text
        x="148" y="80"
        fontFamily="'Arial Black','Arial Bold',Gadget,sans-serif"
        fontWeight="900" fontSize="78"
        className="logo-letter"
      >NIKET</text>

      {/* ── Tagline ── */}
      <text
        x="2" y="108"
        fontFamily="Arial,Helvetica,sans-serif"
        fontSize="9.5"
        textLength="414"
        lengthAdjust="spacing"
        className="logo-tagline"
      >SECURING INFRASTRUCTURE, DELIVERING UPTIME</text>
    </svg>
  );
}
