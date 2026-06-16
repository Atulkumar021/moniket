import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import RevealInit from "@/components/RevealInit";
import ArticleCard from "@/components/ArticleCard";
import { getPublishedArticles, toCard } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default function TrackPage({ params }: { params: { domain: string } }) {
  const domain = decodeURIComponent(params.domain);
  const items = getPublishedArticles()
    .filter((a) => a.domain === domain)
    .map(toCard);

  return (
    <>
      <SiteHeader />
      <div className="subhero">
        <div className="wrap">
          <Link className="backlink" href="/tracks">
            ← Back to tracks
          </Link>
          <h1 style={{ fontSize: "1.9rem" }}>{domain} — guides</h1>
          <p style={{ color: "var(--muted)", marginTop: 6 }}>
            Every tutorial and blog post in the {domain} track.
          </p>
        </div>
      </div>
      <section>
        <div className="wrap">
          <div className="grid g3">
            {items.length ? (
              items.map((a) => <ArticleCard key={`${a.type}-${a.id}`} a={a} />)
            ) : (
              <p style={{ gridColumn: "1/-1", textAlign: "center", color: "var(--muted)" }}>
                Nothing here yet.
              </p>
            )}
          </div>
        </div>
      </section>
      <SiteFooter />
      <RevealInit />
    </>
  );
}
