import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import RevealInit from "@/components/RevealInit";

export const metadata: Metadata = { title: "Solutions — Moniket Technologies" };

const SOLUTIONS = [
  {
    href: "/solutions/cloud-infrastructure/",
    icon: '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/>',
    title: "Cloud Infrastructure",
    desc: "Design, deploy and optimize multi-cloud environments on AWS, GCP and Azure.",
  },
  {
    href: "/solutions/devops-automation/",
    icon: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    title: "DevOps Automation",
    desc: "CI/CD pipelines, container orchestration and infrastructure-as-code at scale.",
  },
  {
    href: "/solutions/security/",
    icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    title: "Security & SecOps",
    desc: "End-to-end security hardening, threat monitoring and compliance automation.",
  },
  {
    href: "/solutions/networking/",
    icon: '<rect x="2" y="2" width="6" height="6" rx="1"/><rect x="16" y="2" width="6" height="6" rx="1"/><rect x="9" y="16" width="6" height="6" rx="1"/><path d="M5 8v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8"/><line x1="12" y1="14" x2="12" y2="16"/>',
    title: "Networking",
    desc: "Network architecture, routing, firewalls and software-defined networking.",
  },
  {
    href: "/solutions/monitoring-observability/",
    icon: '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>',
    title: "Monitoring & Observability",
    desc: "Full-stack observability with metrics, logs, traces and intelligent alerting.",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <SiteHeader />
      <div className="subhero">
        <div className="wrap">
          <Link className="backlink" href="/">← Home</Link>
          <h1>Solutions</h1>
          <p>Enterprise-grade consulting across cloud, DevOps, security, networking and observability.</p>
        </div>
      </div>
      <section>
        <div className="wrap">
          <div className="page-grid reveal">
            {SOLUTIONS.map((s) => (
              <Link key={s.href} href={s.href} className="page-card">
                <div className="pc-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: s.icon }} />
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span className="pc-arrow">Explore →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="alt">
        <div className="wrap">
          <div className="cta reveal">
            <h2>Not sure which solution fits?</h2>
            <p>Tell me about your stack and goals — I&apos;ll recommend the right approach.</p>
            <Link className="btn btn-primary" href="/contact">Get in touch →</Link>
          </div>
        </div>
      </section>
      <SiteFooter />
      <RevealInit />
    </>
  );
}
