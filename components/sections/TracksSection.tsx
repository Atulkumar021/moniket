import Link from "next/link";
import Icon from "@/components/Icon";
import TrackIcon from "@/components/TrackIcon";
import { KH_STATS } from "@/lib/data/home";
import type { SiteContent } from "@/lib/sections";

type Props = {
  knowledge: SiteContent["knowledge"];
  tracks: SiteContent["tracks"];
  preview?: boolean;
};

export default function TracksSection({ knowledge, tracks, preview = false }: Props) {
  const shown = preview ? tracks.slice(0, 6) : tracks;

  return (
    <section id="tracks" className="kh-section">
      <div className="kh-bg" aria-hidden>
        <span className="aurora k1" />
        <span className="aurora k2" />
        <span className="dots kd1" />
      </div>
      <div className="wrap">
        <div className="svc-head">
          <span className="eyebrow-dotline">{knowledge.eyebrow}</span>
          <h2 style={{ marginTop: 12 }}>{knowledge.heading}</h2>
          <p>{knowledge.description}</p>
        </div>

        {!preview && (
          <div className="kh-feature reveal">
            <div>
              <span className="kh-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <path d="m12 2 2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17.6 5.9 20.4l1.5-6.8L2.2 9l6.9-.7z" />
                </svg>
                Most Popular Track
              </span>
              <h3>DevOps Mastery Path</h3>
              <p className="lead2">
                Learn CI/CD, GitOps, Infrastructure as Code, Kubernetes and deployment automation
                through structured tutorials.
              </p>
              <div className="kh-meta">
                <span className="kh-chip">
                  <Icon path='<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>' size={16} stroke={2} />
                  24 tutorials
                </span>
                <span className="kh-chip">
                  <Icon path='<circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 16 14"/>' size={16} stroke={2} />
                  12 hours content
                </span>
                <span className="kh-chip">
                  <Icon path='<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 4-5"/>' size={16} stroke={2} />
                  Beginner → Advanced
                </span>
              </div>
              <Link className="btn btn-primary" href="/tracks/DevOps">
                Explore Path →
              </Link>
            </div>
            <div className="kh-illus" aria-hidden>
              <span className="glow" />
              <span className="platform" />
              <svg className="kh-infinity" width="180" height="100" viewBox="0 0 170 96" fill="none">
                <defs>
                  <linearGradient id="ig" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#7FCBFB" />
                    <stop offset="1" stopColor="#2E90FA" />
                  </linearGradient>
                </defs>
                <path
                  d="M85 48 C85 24 45 24 45 48 C45 72 85 72 85 48 C85 24 125 24 125 48 C125 72 85 72 85 48 Z"
                  stroke="url(#ig)"
                  strokeWidth="16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="rgba(124,203,251,.18)"
                />
              </svg>
              <span className="kh-float f1">
                <Icon path='<path d="m5 8 4 4-4 4"/><line x1="12" y1="16" x2="17" y2="16"/>' size={22} stroke={2} />
              </span>
              <span className="kh-float f2">
                <Icon path='<path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/>' size={20} stroke={1.8} />
              </span>
            </div>
          </div>
        )}

        <div className="kh-grid">
          {shown.map((t) => (
            <Link className="kh-card reveal" href={`/tracks/${encodeURIComponent(t.name)}`} key={t.name}>
              <div className="kh-icn" style={{ background: t.tint }}>
                <TrackIcon name={t.name} size={38} />
              </div>
              <h3>{t.name}</h3>
              <p>{t.desc}</p>
              <div className="kh-foot">
                <span className="kh-count">
                  <b>{t.guides} Guides</b> · {t.hours} Hours
                </span>
                <span className="kh-arrow">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {preview ? (
          <div style={{ textAlign: "center", marginTop: 30 }}>
            <Link className="btn btn-primary" href="/tracks">
              Explore all learning tracks →
            </Link>
          </div>
        ) : (
          <div className="kh-stats reveal">
            {KH_STATS.map((s) => (
              <div className="kh-stat" key={s.l}>
                <div className="sic" style={{ background: s.tint, color: s.color }}>
                  <Icon path={s.icon} size={24} stroke={1.7} />
                </div>
                <div>
                  <div className="n">{s.n}</div>
                  <div className="l">{s.l}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
