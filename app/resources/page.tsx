import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import RevealInit from "@/components/RevealInit";

export const metadata: Metadata = { title: "Resources — Moniket Technologies" };

const RESOURCES = [
  {
    href: "/blog/",
    icon: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    title: "Blog",
    desc: "In-depth write-ups on infrastructure, DevOps, security and open-source tooling.",
  },
  {
    href: "/tutorials/",
    icon: '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
    title: "Tutorials",
    desc: "Step-by-step, copy-paste-ready guides you can follow along and adapt.",
  },
  {
    href: "/resources/case-studies/",
    icon: '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
    title: "Case Studies",
    desc: "Real-world infrastructure and DevOps transformation stories with measurable outcomes.",
  },
  {
    href: "/resources/documentation/",
    icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>',
    title: "Documentation",
    desc: "Reference docs, configuration templates and best-practice guides.",
  },
  {
    href: "/toolbox/",
    icon: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>',
    title: "Open-Source",
    desc: "70+ curated open-source tools across every infrastructure domain.",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <SiteHeader />
      <div className="subhero">
        <div className="wrap">
          <Link className="backlink" href="/">← Home</Link>
          <h1>Resources</h1>
          <p>Guides, tutorials, case studies and open-source tools to help you build better infrastructure.</p>
        </div>
      </div>
      <section>
        <div className="wrap">
          <div className="page-grid reveal">
            {RESOURCES.map((r) => (
              <Link key={r.href} href={r.href} className="page-card">
                <div className="pc-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: r.icon }} />
                </div>
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
                <span className="pc-arrow">Explore →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="alt">
        <div className="wrap">
          <div className="cta reveal">
            <h2>Can&apos;t find what you need?</h2>
            <p>Reach out — I&apos;m always adding new content based on what the community asks for.</p>
            <Link className="btn btn-primary" href="/contact">Get in touch →</Link>
          </div>
        </div>
      </section>
      <SiteFooter />
      <RevealInit />
    </>
  );
}
