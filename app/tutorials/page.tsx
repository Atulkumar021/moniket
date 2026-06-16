import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import RevealInit from "@/components/RevealInit";
import ArticleList from "@/components/ArticleList";
import { getPublishedArticles, toCard } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default function TutorialsPage() {
  const items = getPublishedArticles("tutorial").map(toCard);
  return (
    <>
      <SiteHeader />
      <div className="subhero">
        <div className="wrap">
          <Link className="backlink" href="/">
            ← Back to home
          </Link>
          <h1 style={{ fontSize: "1.9rem" }}>Tutorials</h1>
          <p style={{ color: "var(--muted)", marginTop: 6 }}>Follow-along, copy-paste-ready guides.</p>
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
