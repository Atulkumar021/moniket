"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import { TOOLS, TOOL_CATS, CAT_META, TOOL_LOGOS } from "@/lib/data/static";
import type { Tool } from "@/lib/types";

const INITIAL = 16;
const FALLBACK = { label: "Other", color: "#2E90FA", tint: "#EAF4FF", icon: '<circle cx="12" cy="12" r="9"/>' };
const meta = (cat: string) => CAT_META[cat] ?? FALLBACK;

function ToolLogo({ name, icon, color }: { name: string; icon: string; color: string }) {
  const slug = TOOL_LOGOS[name];
  const [err, setErr] = useState(false);
  if (slug && !err) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`https://cdn.simpleicons.org/${slug}`}
        alt={name}
        loading="lazy"
        onError={() => setErr(true)}
      />
    );
  }
  return (
    <span style={{ color, display: "grid", placeItems: "center" }}>
      <Icon path={icon} size={24} stroke={1.7} />
    </span>
  );
}

export default function Toolbox({ tools = TOOLS }: { tools?: Tool[] }) {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [showAll, setShowAll] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const categories = TOOL_CATS.slice(1);
  const counts = useMemo(() => {
    const m: Record<string, number> = {};
    for (const c of categories) m[c] = tools.filter((t) => t[1] === c).length;
    return m;
  }, [categories, tools]);

  const filtered = useMemo(() => {
    const query = q.toLowerCase();
    return tools.filter(
      (t) =>
        (cat === "All" || t[1] === cat) &&
        (t[0].toLowerCase().includes(query) ||
          t[3].toLowerCase().includes(query) ||
          t[1].toLowerCase().includes(query))
    );
  }, [cat, q, tools]);

  const visible = showAll ? filtered : filtered.slice(0, INITIAL);

  function pick(c: string) {
    setCat(c);
    setShowAll(false);
  }

  return (
    <>
      <div className="tb-search2">
        <svg className="si" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          ref={inputRef}
          placeholder="Search tools… (e.g. backup, siem, ingress)"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setShowAll(true);
          }}
        />
        <span className="kbd">⌘K</span>
      </div>

      <div className="tb-chips">
        {TOOL_CATS.map((c) => (
          <button key={c} className={`chip ${c === cat ? "active" : ""}`} onClick={() => pick(c)}>
            {c}
          </button>
        ))}
      </div>

      <div className="tb-layout">
        <aside className="tb-side">
          <div className="tb-side-card tb-total">
            <div className="lbl">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
              </svg>
              Total Tools
            </div>
            <div className="num">{tools.length}</div>
            <div className="sub">Across {categories.length} categories</div>
            <h4>Categories</h4>
            {categories.map((c) => {
              const m = meta(c);
              return (
                <button key={c} className={`tb-cat ${c === cat ? "active" : ""}`} onClick={() => pick(c)}>
                  <span className="ci" style={{ background: m.tint, color: m.color }}>
                    <Icon path={m.icon} size={16} stroke={1.8} />
                  </span>
                  <span className="cn">{m.label}</span>
                  <span className="cc">{counts[c]}</span>
                </button>
              );
            })}
          </div>

          <div className="tb-cta-card">
            <h5>Can&apos;t find a tool?</h5>
            <p>Request a tool or suggest an open-source project.</p>
            <Link className="btn btn-soft btn-sm" href="/contact">
              Suggest Tool →
            </Link>
          </div>
        </aside>

        <div className="tb-main">
          <div className="tb-cards">
            {visible.length ? (
              visible.map((t) => {
                const m = meta(t[1]);
                return (
                  <div className="tb-card2" key={t[0]}>
                    <div className="top">
                      <div className="tb-logo">
                        <ToolLogo name={t[0]} icon={m.icon} color={m.color} />
                      </div>
                      <div className="tb-h">
                        <div className="r1">
                          <h3>{t[0]}</h3>
                          <span className="tb-lic">{t[2]}</span>
                        </div>
                        <span className="tb-catlbl">{t[1]}</span>
                      </div>
                    </div>
                    <p className="desc">{t[3]}</p>
                    <div className="tb-foot2">
                      <span className="tb-guide">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                          <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
                        </svg>
                        1 Guide
                      </span>
                      <span className="tb-arrow2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="tb-empty">No tools match — try another search.</p>
            )}
          </div>

          {filtered.length > INITIAL && (
            <div className="tb-toggle-wrap">
              <button className="tb-toggle" onClick={() => setShowAll((s) => !s)}>
                {showAll ? "Show fewer tools" : `View all ${filtered.length} open-source tools`}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: showAll ? "rotate(180deg)" : "none" }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
