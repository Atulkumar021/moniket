import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import RevealInit from "@/components/RevealInit";
import ArticleList from "@/components/ArticleList";
import { getPublishedArticles, toCard } from "@/lib/queries";

export const metadata: Metadata = { title: "Documentation — Resources | Moniket Technologies" };

export default function DocumentationPage() {
  const items = getPublishedArticles("documentation").map(toCard);
  return (
    <>
      <SiteHeader />
      <div className="subhero">
        <div className="wrap">
          <Link className="backlink" href="/resources/">← Resources</Link>
          <h1>Documentation</h1>
          <p>Reference docs, configuration templates and best-practice guides for infrastructure and DevOps.</p>
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
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
              </div>
              <h3>Documentation coming soon</h3>
              <p>Reference guides and templates are being organised. In the meantime, explore the blog and tutorials for technical content.</p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <Link className="btn btn-soft" href="/resources/blog/">Browse Blog →</Link>
                <Link className="btn btn-primary" href="/resources/tutorials/">Browse Tutorials →</Link>
              </div>
            </div>
          )}
        </div>
      </section>
      {items.length > 0 && (
        <section className="alt">
          <div className="wrap">
            <div className="cta reveal">
              <h2>Can&apos;t find what you need?</h2>
              <p>Reach out — I&apos;m always adding new content based on what the community asks for.</p>
              <Link className="btn btn-primary" href="/contact">Request documentation →</Link>
            </div>
          </div>
        </section>
      )}
      <SiteFooter />
      <RevealInit />
    </>
  );
}
