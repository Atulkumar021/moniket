import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import RevealInit from "@/components/RevealInit";
import ServicesSection from "@/components/sections/ServicesSection";
import { getSiteContent } from "@/lib/sections";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Services — Moniket Technologies" };

export default async function ServicesPage() {
  const { serviceSection, serviceCards } = await getSiteContent();
  return (
    <>
      <SiteHeader />
      <div className="subhero">
        <div className="wrap">
          <Link className="backlink" href="/">
            ← Back to home
          </Link>
          <h1 style={{ fontSize: "1.9rem" }}>Services</h1>
          <p style={{ color: "var(--muted)", marginTop: 6 }}>
            Consulting across infrastructure, platform, DevOps, SecOps and networking.
          </p>
        </div>
      </div>
      <ServicesSection serviceSection={serviceSection} serviceCards={serviceCards} />
      <section className="alt">
        <div className="wrap">
          <div className="cta reveal">
            <h2>Need a hand with your stack?</h2>
            <p>Tell me what you&apos;re dealing with — I&apos;ll be honest about whether I can help.</p>
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
