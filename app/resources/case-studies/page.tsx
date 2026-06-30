import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import RevealInit from "@/components/RevealInit";
import ArticleList from "@/components/ArticleList";
import { getPublishedArticles, toCard } from "@/lib/queries";

export const metadata: Metadata = { title: "Case Studies — Resources | Moniket Technologies" };

export default function CaseStudiesPage() {
  const items = getPublishedArticles("case-study").map(toCard);
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
          {items.length > 0 ? (
            <ArticleList items={items} />
          ) : (
            <div className="cs-empty-state reveal">
              <div className="cs-empty-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 11l3 3L22 4"/>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                </svg>
              </div>
              <h3>Case studies coming soon</h3>
              <p>Real-world project outcomes are being prepared. Check back soon or reach out to discuss your specific challenges.</p>
              <Link className="btn btn-primary" href="/contact">Start a conversation →</Link>
            </div>
          )}
        </div>
      </section>
      {items.length > 0 && (
        <section className="alt">
          <div className="wrap">
            <div className="cta reveal">
              <h2>Want to be our next case study?</h2>
              <p>Every engagement is a potential success story — let&apos;s solve something together.</p>
              <Link className="btn btn-primary" href="/contact">Start a conversation →</Link>
            </div>
          </div>
        </section>
      )}
      <SiteFooter />
      <RevealInit />
    </>
  );
}
