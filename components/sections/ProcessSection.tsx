import Icon from "@/components/Icon";
import { TRUST } from "@/lib/data/home";
import type { SiteContent } from "@/lib/sections";

type Props = {
  processSection: SiteContent["processSection"];
  processSteps: SiteContent["processSteps"];
};

export default function ProcessSection({ processSection, processSteps }: Props) {
  return (
    <section className="proc-section">
      <div className="proc-bg" aria-hidden>
        <span className="aurora pr1" />
        <span className="aurora pr2" />
        <span className="dots pdd1" />
        <span className="dots pdd2" />
        <span className="ab-ring" />
        <span className="ab-sphere sp1" />
      </div>
      <div className="wrap">
        <div className="svc-head">
          <span className="eyebrow-dotline">{processSection.eyebrow}</span>
          <h2 style={{ marginTop: 12 }}>
            {processSection.heading}
            <span style={{ color: "var(--primary)" }}>.</span>
          </h2>
          <p>{processSection.description}</p>
        </div>
        <div className="proc-grid">
          {processSteps.map((s) => (
            <div className="proc-card reveal" key={s.num}>
              <div className="proc-iconwrap">
                <svg className="proc-ring" width="96" height="96" viewBox="0 0 96 96" fill="none">
                  <circle cx="48" cy="48" r="45" stroke="#E3ECF5" strokeWidth="2" />
                  <circle cx="48" cy="48" r="45" stroke="#5CC1F5" strokeWidth="3" strokeLinecap="round" strokeDasharray="205 283" transform="rotate(-90 48 48)" />
                  <circle cx="48" cy="3" r="3.2" fill="#2E90FA" />
                </svg>
                <div className="proc-icon">
                  <Icon path={s.icon} size={28} stroke={1.8} />
                </div>
                <span className="proc-step">{s.num}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span className="proc-arrow">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>
          ))}
        </div>
        <div className="trust-bar reveal">
          {TRUST.map((t) => (
            <div className="trust-item" key={t.title}>
              <div className="trust-ic">
                <Icon path={t.icon} size={22} stroke={1.8} />
              </div>
              <div>
                <h4>{t.title}</h4>
                <p>{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
