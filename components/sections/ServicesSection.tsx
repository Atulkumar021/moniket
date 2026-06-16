import Link from "next/link";
import Icon from "@/components/Icon";
import { VALUE_ITEMS } from "@/lib/data/home";
import type { SiteContent } from "@/lib/sections";

type Props = {
  serviceSection: SiteContent["serviceSection"];
  serviceCards: SiteContent["serviceCards"];
  preview?: boolean;
};

export default function ServicesSection({ serviceSection, serviceCards, preview = false }: Props) {
  return (
    <section id="services" className="svc-section">
      <div className="svc-bg" aria-hidden>
        <span className="aurora s1" />
        <span className="aurora s2" />
        <span className="dots sd1" />
        <span className="dots sd2" />
        <svg className="svc-curve" viewBox="0 0 420 200" fill="none" stroke="currentColor" strokeWidth="1.3">
          <path d="M0 40 C 140 120, 250 30, 430 150" opacity=".55" />
          <path d="M0 70 C 150 150, 260 60, 430 180" opacity=".3" />
        </svg>
      </div>
      <div className="wrap">
        <div className="svc-head">
          <span className="eyebrow-line">{serviceSection.eyebrow}</span>
          <span className="eyebrow-dot" />
          <h2>{serviceSection.heading}</h2>
          <p>{serviceSection.description}</p>
        </div>
        <div className="svc-grid">
          {serviceCards.map((s) => (
            <div className="svc-card reveal" key={s.title}>
              <Icon path={s.icon} size={120} stroke={1.1} className="ghost" />
              <div className="svc-ic">
                <Icon path={s.icon} size={26} stroke={1.7} />
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              {!preview && <span className="svc-more">Learn more →</span>}
            </div>
          ))}
        </div>

        {preview ? (
          <div style={{ textAlign: "center", marginTop: 30 }}>
            <Link className="btn btn-primary" href="/services">
              Explore all services →
            </Link>
          </div>
        ) : (
          <div className="value-bar reveal">
            {VALUE_ITEMS.map((v) => (
              <div className="value-item" key={v.title}>
                <div className="vic">
                  <Icon path={v.icon} size={22} stroke={1.7} />
                </div>
                <div>
                  <h4>{v.title}</h4>
                  <p>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
