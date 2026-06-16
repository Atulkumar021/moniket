import Link from "next/link";
import type { SiteContent } from "@/lib/sections";

export default function Hero({ hero }: { hero: SiteContent["hero"] }) {
  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden>
        <span className="aurora a1" />
        <span className="aurora a2" />
        <span className="aurora a3" />
        <span className="aurora a4" />
        <span className="dots d1" />
        <span className="dots d2" />
        <svg className="hero-curve" viewBox="0 0 440 220" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M-20 200 C 120 120, 200 200, 460 60" opacity=".5" />
          <path d="M-20 220 C 140 150, 220 220, 460 90" opacity=".3" />
        </svg>
        <svg className="hero-curve right" viewBox="0 0 380 200" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M0 40 C 120 110, 220 30, 400 150" opacity=".5" />
        </svg>
      </div>
      <div className="wrap hero-grid">
        <div>
          <span className="avail">
            <span className="dot" /> {hero.badge}
          </span>
          <h1>
            {hero.title}
            <br />
            <span className="grad">{hero.titleAccent}</span>
          </h1>
          <p className="lead">{hero.description}</p>
          <div className="hero-actions">
            <Link className="btn btn-primary" href={hero.primaryButton.link}>
              {hero.primaryButton.text}
            </Link>
            <Link className="btn btn-soft" href={hero.secondaryButton.link}>
              {hero.secondaryButton.text}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
            </Link>
          </div>
        </div>
        <div className="card-stage reveal">
          <div className="card-float">
            <div className="ring">M</div>
            <h3>Manish</h3>
            <div className="role">{"// Infrastructure · DevOps · SecOps"}</div>
            <div className="mini">
              {hero.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="n">{stat.value}</div>
                  <div className="l">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="term">
              <div>
                <span className="p">$</span> make infra secure fast open
              </div>
              <div>
                <span className="cm">{"// 418+ automation · 2M+ users · free"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
