import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import RevealInit from "@/components/RevealInit";
import ArticleList from "@/components/ArticleList";
import { fetchPublishedBlogCards } from "@/lib/server/blog";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const items = await fetchPublishedBlogCards();
  return (
    <>
      <SiteHeader />
      <div className="subhero">
        <div className="wrap">
          <Link className="backlink" href="/">
            ← Back to home
          </Link>
          <h1 style={{ fontSize: "1.9rem" }}>Blog</h1>
          <p style={{ color: "var(--muted)", marginTop: 6 }}>In-depth write-ups across every domain.</p>
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
