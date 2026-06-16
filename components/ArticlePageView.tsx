import Link from "next/link";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import RevealInit from "./RevealInit";
import ArticleBody from "./ArticleBody";
import type { Article } from "@/lib/types";

export default function ArticlePageView({
  article,
  backHref,
  backLabel,
}: {
  article: Article;
  backHref: string;
  backLabel: string;
}) {
  return (
    <>
      <SiteHeader />
      <div className="subhero">
        <div className="wrap">
          <Link className="backlink" href={backHref}>
            {backLabel}
          </Link>
        </div>
      </div>
      <article className="article">
        <div className="a-meta">
          <span className="tagp">{article.domain}</span>
          {article.difficulty ? (
            <>
              <span>{article.difficulty}</span>·
            </>
          ) : null}
          <span>{article.read} min read</span>·<span>{article.date}</span>
        </div>
        <h1>{article.title}</h1>
        <p className="lead-p">{article.excerpt}</p>
        {article.tools && article.tools.length ? (
          <div className="toc-tools">
            <span style={{ fontSize: ".74rem", color: "var(--muted)", alignSelf: "center" }}>Tools used:</span>
            {article.tools.map((t) => (
              <Link key={t} href="/toolbox">
                {t}
              </Link>
            ))}
          </div>
        ) : null}
        <ArticleBody blocks={article.body} />
        <div style={{ marginTop: 34, paddingTop: 22, borderTop: "1px solid var(--line)" }}>
          <p style={{ color: "var(--muted)", fontSize: ".92rem" }}>
            Found this useful? I help teams set this kind of thing up properly.
          </p>
          <Link className="btn btn-primary" href="/contact" style={{ marginTop: 12 }}>
            Get in touch →
          </Link>
        </div>
      </article>
      <SiteFooter />
      <RevealInit />
    </>
  );
}
