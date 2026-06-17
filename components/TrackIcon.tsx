/* Premium 3D-style, gradient-filled track icons (no external assets). */

type Props = { name: string; size?: number };

const SHEEN = <ellipse cx="18" cy="13" rx="14" ry="8" fill="#fff" opacity="0.22" />;

export default function TrackIcon({ name, size = 40 }: Props) {
  const common = { width: size, height: size, viewBox: "0 0 48 48", fill: "none" as const };

  switch (name) {
    case "Linux":
      return (
        <svg {...common}>
          <defs>
            <linearGradient id="ic-lx" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#4b5563" />
              <stop offset="1" stopColor="#1f2937" />
            </linearGradient>
          </defs>
          <path d="M24 6c-5 0-7.5 4-7.5 9.2 0 3.2-3 6.2-5 10.3-2.2 4.4 1.2 9.5 12.5 9.5s13.7-5.1 11.5-9.5c-2-4.1-5-7.1-5-10.3C30.5 10 28.9 6 24 6z" fill="url(#ic-lx)" />
          <path d="M24 18.5c-3.2 0-5.8 3-5.8 8.4 0 3.8 2.8 5.8 5.8 5.8s5.8-2 5.8-5.8c0-5.4-2.6-8.4-5.8-8.4z" fill="#fff" />
          <ellipse cx="20.8" cy="13" rx="2.5" ry="3" fill="#fff" />
          <ellipse cx="27.2" cy="13" rx="2.5" ry="3" fill="#fff" />
          <circle cx="21.4" cy="13.6" r="1.2" fill="#111827" />
          <circle cx="26.6" cy="13.6" r="1.2" fill="#111827" />
          <path d="M22 15.6h4l-2 2.6z" fill="#F59E0B" />
          <ellipse cx="20" cy="35.2" rx="3.4" ry="1.9" fill="#F59E0B" />
          <ellipse cx="28" cy="35.2" rx="3.4" ry="1.9" fill="#F59E0B" />
        </svg>
      );

    case "DevOps":
      return (
        <svg {...common}>
          <defs>
            <linearGradient id="ic-dv" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#8FD0FB" />
              <stop offset="1" stopColor="#E0792B" />
            </linearGradient>
          </defs>
          <line x1="15" y1="15" x2="33" y2="24" stroke="#BCDCFA" strokeWidth="3.2" strokeLinecap="round" />
          <line x1="15" y1="33" x2="33" y2="24" stroke="#BCDCFA" strokeWidth="3.2" strokeLinecap="round" />
          <circle cx="15" cy="15" r="6.2" fill="url(#ic-dv)" />
          <circle cx="15" cy="33" r="6.2" fill="url(#ic-dv)" />
          <circle cx="33" cy="24" r="6.2" fill="url(#ic-dv)" />
          <circle cx="13" cy="13" r="1.8" fill="#fff" opacity="0.5" />
          <circle cx="13" cy="31" r="1.8" fill="#fff" opacity="0.5" />
          <circle cx="31" cy="22" r="1.8" fill="#fff" opacity="0.5" />
        </svg>
      );

    case "SecOps":
      return (
        <svg {...common}>
          <defs>
            <linearGradient id="ic-sec" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#5BA8F5" />
              <stop offset="1" stopColor="#1F6FD6" />
            </linearGradient>
          </defs>
          <path d="M24 5l14 5v9c0 9.2-7.2 15.2-14 19-6.8-3.8-14-9.8-14-19v-9z" fill="url(#ic-sec)" />
          <path d="M24 5l14 5v9c0 .6 0 1.2-.1 1.7C33 18 28.8 16 24 16s-9 2-13.9 5.7C10 21.2 10 20.6 10 20v-9z" fill="#fff" opacity="0.18" />
          <path d="M17 24l5 5 9-10" stroke="#fff" strokeWidth="3.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "Networking":
      return (
        <svg {...common}>
          <defs>
            <linearGradient id="ic-nw" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#7FE3F0" />
              <stop offset="1" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
          <line x1="24" y1="24" x2="13" y2="14" stroke="#B6ECF4" strokeWidth="3" strokeLinecap="round" />
          <line x1="24" y1="24" x2="35" y2="16" stroke="#B6ECF4" strokeWidth="3" strokeLinecap="round" />
          <line x1="24" y1="24" x2="26" y2="37" stroke="#B6ECF4" strokeWidth="3" strokeLinecap="round" />
          <circle cx="24" cy="24" r="5.6" fill="url(#ic-nw)" />
          <circle cx="13" cy="14" r="4.4" fill="url(#ic-nw)" />
          <circle cx="35" cy="16" r="4.4" fill="url(#ic-nw)" />
          <circle cx="26" cy="37" r="4.4" fill="url(#ic-nw)" />
        </svg>
      );

    case "Cloud":
      return (
        <svg {...common}>
          <defs>
            <linearGradient id="ic-cl" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#CDEBFF" />
              <stop offset="1" stopColor="#F2A65E" />
            </linearGradient>
          </defs>
          <path d="M34 32H15a8.5 8.5 0 0 1-1-16.94A10.5 10.5 0 0 1 34 17a7.5 7.5 0 0 1 0 15z" fill="url(#ic-cl)" />
          {SHEEN}
        </svg>
      );

    case "Containers":
      return (
        <svg {...common}>
          <defs>
            <linearGradient id="ic-dk" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#5BB4F5" />
              <stop offset="1" stopColor="#E0792B" />
            </linearGradient>
          </defs>
          <g fill="url(#ic-dk)">
            <rect x="13" y="19" width="6" height="5.4" rx="1" />
            <rect x="20" y="19" width="6" height="5.4" rx="1" />
            <rect x="27" y="19" width="6" height="5.4" rx="1" />
            <rect x="20" y="12.6" width="6" height="5.4" rx="1" />
            <rect x="27" y="12.6" width="6" height="5.4" rx="1" />
          </g>
          <path d="M9 25h30c0 0-1.2 9-12 9-7 0-9.5-3-11-5.4C13 28.5 9 28 9 25z" fill="url(#ic-dk)" />
          <path d="M37.5 24.5c1.8-1.3 3.4-.6 3.9 0-.4 1.4-1.9 2.2-3.3 1.8z" fill="url(#ic-dk)" />
        </svg>
      );

    case "Virtualization":
      return (
        <svg {...common}>
          <defs>
            <linearGradient id="ic-vt" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#A5B4FF" />
              <stop offset="1" stopColor="#6366F1" />
            </linearGradient>
          </defs>
          <rect x="8" y="9" width="32" height="22" rx="3.5" fill="url(#ic-vt)" />
          <rect x="12" y="13" width="24" height="13.5" rx="2" fill="#fff" opacity="0.28" />
          <rect x="20" y="31" width="8" height="4" fill="url(#ic-vt)" />
          <rect x="15" y="36" width="18" height="3" rx="1.5" fill="url(#ic-vt)" />
          {SHEEN}
        </svg>
      );

    case "Storage":
      return (
        <svg {...common}>
          <defs>
            <linearGradient id="ic-st" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#8FD0FB" />
              <stop offset="1" stopColor="#E0792B" />
            </linearGradient>
          </defs>
          <path d="M11 22v7c0 2.6 5.8 4.6 13 4.6s13-2 13-4.6v-7z" fill="url(#ic-st)" opacity="0.85" />
          <ellipse cx="24" cy="22" rx="13" ry="4.6" fill="#9FD0F7" />
          <path d="M11 14v7c0 2.6 5.8 4.6 13 4.6s13-2 13-4.6v-7z" fill="url(#ic-st)" />
          <ellipse cx="24" cy="14" rx="13" ry="4.6" fill="#BFE3FB" />
          <ellipse cx="20" cy="12.5" rx="5" ry="1.6" fill="#fff" opacity="0.5" />
        </svg>
      );

    case "Monitoring":
      return (
        <svg {...common}>
          <defs>
            <linearGradient id="ic-mn" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#C4A9FF" />
              <stop offset="1" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          <rect x="8" y="8" width="32" height="32" rx="9" fill="url(#ic-mn)" />
          <ellipse cx="18" cy="15" rx="12" ry="6" fill="#fff" opacity="0.16" />
          <polyline points="14 30 20 22 25 26 34 15" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="34" cy="15" r="2.2" fill="#fff" />
        </svg>
      );

    case "Open Source":
      return (
        <svg {...common}>
          <defs>
            <linearGradient id="ic-os" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#86EFAC" />
              <stop offset="1" stopColor="#22C55E" />
            </linearGradient>
          </defs>
          <path d="M24 9a15 15 0 1 0 8 27.6l-4.2-6.4a7.6 7.6 0 1 1-7.6 0l-4.2 6.4A15 15 0 0 0 24 9z" fill="url(#ic-os)" />
          <rect x="22" y="22" width="4" height="14" rx="2" fill="url(#ic-os)" />
          {SHEEN}
        </svg>
      );

    default:
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="14" fill="#F2A65E" />
        </svg>
      );
  }
}
