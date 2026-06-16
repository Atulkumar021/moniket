"use client";

import { useMemo, useState } from "react";
import ArticleCard from "./ArticleCard";
import type { ArticleCardData } from "@/lib/queries";

export default function ArticleList({ items }: { items: ArticleCardData[] }) {
  const domains = useMemo(() => ["All", ...Array.from(new Set(items.map((a) => a.domain)))], [items]);
  const [domain, setDomain] = useState("All");
  const filtered = domain === "All" ? items : items.filter((a) => a.domain === domain);

  return (
    <>
      <div className="chips" style={{ marginBottom: 24, justifyContent: "flex-start" }}>
        {domains.map((d) => (
          <button key={d} className={`chip ${d === domain ? "active" : ""}`} onClick={() => setDomain(d)}>
            {d}
          </button>
        ))}
      </div>
      <div className="grid g3">
        {filtered.length ? (
          filtered.map((a) => <ArticleCard key={`${a.type}-${a.id}`} a={a} />)
        ) : (
          <p style={{ gridColumn: "1/-1", textAlign: "center", color: "var(--muted)" }}>Nothing here yet.</p>
        )}
      </div>
    </>
  );
}
