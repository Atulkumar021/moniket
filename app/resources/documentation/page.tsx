import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import RevealInit from "@/components/RevealInit";

export const metadata: Metadata = { title: "Documentation — Moniket Technologies" };

export default function DocumentationPage() {
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
          <div className="head reveal">
            <h2>Coming soon</h2>
            <p>Documentation is being organized and published. In the meantime, explore the blog and tutorials for in-depth technical content.</p>
          </div>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}>
            <Link className="btn btn-soft" href="/blog/">Browse Blog →</Link>
            <Link className="btn btn-primary" href="/tutorials/">Browse Tutorials →</Link>
          </div>
        </div>
      </section>
      <SiteFooter />
      <RevealInit />
    </>
  );
}
