import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import RevealInit from "@/components/RevealInit";

export const metadata: Metadata = { title: "Case Studies — Moniket Technologies" };

export default function CaseStudiesPage() {
  return (
    <>
      <SiteHeader />
      <div className="subhero">
        <div className="wrap">
          <Link className="backlink" href="/resources/">← Resources</Link>
          <h1>Case Studies</h1>
          <p>Real-world infrastructure and DevOps transformations with measurable outcomes.</p>
        </div>
      </div>
      <section>
        <div className="wrap">
          <div className="head reveal">
            <h2>Coming soon</h2>
            <p>Detailed case studies are being prepared. Check back soon or reach out to discuss your specific challenges.</p>
          </div>
        </div>
      </section>
      <section className="alt">
        <div className="wrap">
          <div className="cta reveal">
            <h2>Want to discuss your project?</h2>
            <p>Every engagement is a potential case study — let&apos;s solve something together.</p>
            <Link className="btn btn-primary" href="/contact">Start a conversation →</Link>
          </div>
        </div>
      </section>
      <SiteFooter />
      <RevealInit />
    </>
  );
}
