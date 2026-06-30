import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import RevealInit from "@/components/RevealInit";
import ArticleList from "@/components/ArticleList";
import { getPublishedArticles, toCard } from "@/lib/queries";

export const metadata: Metadata = { title: "Tutorials — Resources | Moniket Technologies" };

export default function ResourcesTutorialsPage() {
  const items = getPublishedArticles("tutorial").map(toCard);
  return (
    <>
      <SiteHeader />
      <div className="subhero">
        <div className="wrap">
          <Link className="backlink" href="/resources/">← Resources</Link>
          <h1>Tutorials</h1>
          <p>Step-by-step, copy-paste-ready guides you can follow along and adapt.</p>
        </div>
      </div>
      <section>
        <div className="wrap">
          <ArticleList items={items} />
        </div>
      </section>
      <SiteFooter />
      <RevealInit />
    </>
  );
}
