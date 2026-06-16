import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import RevealInit from "@/components/RevealInit";
import StatsBand from "@/components/StatsBand";
import AboutSection from "@/components/sections/AboutSection";
import ProcessSection from "@/components/sections/ProcessSection";
import { getSiteContent } from "@/lib/sections";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "About — Moniket Technologies" };

export default async function AboutPage() {
  const { about, processSection, processSteps, stats } = await getSiteContent();
  return (
    <>
      <SiteHeader />
      <div className="subhero">
        <div className="wrap">
          <Link className="backlink" href="/">
            ← Back to home
          </Link>
          <h1 style={{ fontSize: "1.9rem" }}>About</h1>
          <p style={{ color: "var(--muted)", marginTop: 6 }}>
            20+ years hands-on — and how I work with you.
          </p>
        </div>
      </div>
      <AboutSection about={about} />
      <StatsBand stats={stats} />
      <ProcessSection processSection={processSection} processSteps={processSteps} />
      <section className="alt">
        <div className="wrap">
          <div className="cta reveal">
            <h2>Let&apos;s work together</h2>
            <p>Have a project in mind? Tell me about it.</p>
            <Link className="btn btn-primary" href="/contact">
              Get in touch →
            </Link>
          </div>
        </div>
      </section>
      <SiteFooter />
      <RevealInit />
    </>
  );
}
