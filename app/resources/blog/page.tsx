import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import RevealInit from "@/components/RevealInit";
import ArticleList from "@/components/ArticleList";
import { fetchPublishedBlogCards } from "@/lib/server/blog";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Blog — Resources | Moniket Technologies" };

export default async function ResourcesBlogPage() {
  const items = await fetchPublishedBlogCards();
  return (
    <>
      <SiteHeader />
      <div className="subhero">
        <div className="wrap">
          <Link className="backlink" href="/resources/">← Resources</Link>
          <h1>Blog</h1>
          <p>In-depth write-ups on infrastructure, DevOps, security and open-source tooling.</p>
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
