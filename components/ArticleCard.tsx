import Link from "next/link";
import type { ArticleCardData } from "@/lib/queries";

export default function ArticleCard({ a }: { a: ArticleCardData }) {
  const href = `/${a.type === "blog" ? "blog" : "tutorials"}/${a.id}`;
  return (
    <Link className="post reveal" href={href}>
      <div className="top">
        <span className="lbl">{a.domain}</span>
        {a.type === "tutorial" && a.difficulty ? <span className="diff">{a.difficulty}</span> : null}
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      </div>
      <div className="pb">
        <h3>{a.title}</h3>
        <div className="ex">{a.excerpt}</div>
        <div className="meta">
          <span>{a.type === "tutorial" ? "Tutorial" : "Blog"}</span>·<span>{a.read} min</span>·
          <span>{a.date}</span>
        </div>
      </div>
    </Link>
  );
}
