"use client";

import { useCallback, useEffect, useState } from "react";
import Icon from "@/components/Icon";
import type { Article, Block } from "@/lib/types";

type Draft = {
  id: number;
  title: string;
  category: string;
  domain: string;
  read: number;
  tools: string[];
  excerpt: string;
  status: "draft" | "published";
  body: Block[];
};

const EMPTY: Draft = {
  id: 0, title: "", category: "FinTech", domain: "Cloud Migration",
  read: 5, tools: [], excerpt: "", status: "draft", body: [],
};

const INDUSTRIES = ["FinTech", "Healthcare", "E-Commerce", "SaaS", "Media", "Logistics", "Education", "Retail", "Government", "Other"];

const blocksToText = (body: Block[]) =>
  body.map((b) => (Array.isArray(b.c) ? b.c.join("\n") : b.c)).join("\n\n");
const textToBlocks = (text: string): Block[] =>
  text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean).map((c) => ({ t: "p", c }));

export default function CaseStudiesCmsManager({ notify }: { notify: (message: string) => void }) {
  const [items, setItems] = useState<Article[]>([]);
  const [editing, setEditing] = useState<Draft | null>(null);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/case-studies");
      if (!res.ok) throw new Error("Unable to load case studies");
      setItems(await res.json());
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to load case studies");
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  function open(article?: Article) {
    if (article) {
      setEditing({
        id: article.id,
        title: article.title,
        category: article.category,
        domain: article.domain,
        read: article.read,
        tools: article.tools || [],
        excerpt: article.excerpt,
        status: article.status,
        body: article.body || [],
      });
      setContent(blocksToText(article.body || []));
    } else {
      setEditing({ ...EMPTY });
      setContent("");
    }
    setError("");
  }

  async function save(status: "draft" | "published") {
    if (!editing?.title.trim()) { setError("Title is required."); return; }
    const payload = {
      title: editing.title,
      category: editing.category,
      domain: editing.domain,
      read: editing.read,
      tools: editing.tools.filter(Boolean),
      excerpt: editing.excerpt,
      status,
      body: textToBlocks(content),
    };
    try {
      const res = await fetch(editing.id ? `/api/case-studies/${editing.id}` : "/api/case-studies", {
        method: editing.id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => null))?.error || "Could not save case study");
      setEditing(null);
      await load();
      notify(status === "published" ? "Case study published" : "Case study draft saved");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save case study");
    }
  }

  async function remove(article: Article) {
    if (!window.confirm(`Delete "${article.title}"?`)) return;
    await fetch(`/api/case-studies/${article.id}`, { method: "DELETE" });
    await load();
    notify("Case study deleted");
  }

  async function toggleVisible(article: Article) {
    const next = article.status === "published" ? "draft" : "published";
    setItems((list) => list.map((x) => (x.id === article.id ? { ...x, status: next } : x)));
    try {
      const res = await fetch(`/api/case-studies/${article.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (!res.ok) throw new Error();
      notify(next === "published" ? "Case study is now visible on the website" : "Case study hidden from the website");
    } catch {
      await load();
    }
  }

  return (
    <>
      <div className="panel cms-panel">
        <div className="cms-header">
          <div className="cms-hdr-left">
            <div className="cms-hdr-icon">
              <Icon path='<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>' size={20} stroke={1.9} />
            </div>
            <div>
              <small className="cms-eyebrow">Resources</small>
              <h3>Case Studies</h3>
              <p>Publish real-world project outcomes and transformations.</p>
            </div>
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => open()}>+ New case study</button>
        </div>
        {error && !editing && <div className="cms-error">{error}</div>}
        {items.length === 0 ? (
          <div className="cms-empty">
            <strong>No case studies yet</strong>
            <span>Publish your first real-world project outcome.</span>
          </div>
        ) : (
          <table>
            <thead>
              <tr><th>Title</th><th>Industry</th><th>Domain</th><th>Visible</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {items.map((t) => (
                <tr key={t.id}>
                  <td><strong>{t.title}</strong><br /><small>{t.excerpt.slice(0, 60)}{t.excerpt.length > 60 ? "…" : ""}</small></td>
                  <td>{t.category}</td>
                  <td>{t.domain}</td>
                  <td>
                    <div className="tut-vis">
                      <label className="toggle" title={t.status === "published" ? "Hide from website" : "Show on website"}>
                        <input type="checkbox" checked={t.status === "published"} onChange={() => toggleVisible(t)} />
                        <span className="toggle-track" /><span className="toggle-thumb" />
                      </label>
                      <span data-on={t.status === "published"}>{t.status === "published" ? "Live" : "Hidden"}</span>
                    </div>
                  </td>
                  <td className="act">
                    <button className="btn btn-soft btn-sm" onClick={() => open(t)}>Edit</button>
                    <button className="icon-btn del" onClick={() => remove(t)} title="Delete">
                      <Icon path='<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>' size={15} stroke={2.2} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {editing && (
        <div className="cms-editor-bg" onClick={(e) => e.target === e.currentTarget && setEditing(null)}>
          <aside className="cms-editor">
            <div className="cms-editor-head">
              <div><small>Case Studies CMS</small><h2>{editing.id ? "Edit case study" : "New case study"}</h2></div>
              <button className="icon-btn" onClick={() => setEditing(null)}>
                <Icon path='<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>' size={16} stroke={2.2} />
              </button>
            </div>

            <label>Title *</label>
            <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} placeholder="e.g. Zero-Downtime Cloud Migration" />

            <div className="cms-field-grid">
              <div>
                <label>Industry</label>
                <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })}>
                  {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <div>
                <label>Domain / Service</label>
                <input value={editing.domain} onChange={(e) => setEditing({ ...editing, domain: e.target.value })} placeholder="e.g. Cloud Migration" />
              </div>
            </div>

            <div className="cms-field-grid">
              <div>
                <label>Tech stack (comma separated)</label>
                <input value={editing.tools.join(", ")} onChange={(e) => setEditing({ ...editing, tools: e.target.value.split(",").map((s) => s.trim()) })} placeholder="Kubernetes, Terraform, AWS" />
              </div>
              <div>
                <label>Read time (min)</label>
                <input type="number" min={1} value={editing.read} onChange={(e) => setEditing({ ...editing, read: Number(e.target.value) || 1 })} />
              </div>
            </div>

            <label>Excerpt</label>
            <textarea rows={3} value={editing.excerpt} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} placeholder="Short description of the project and challenge..." />

            <label>Full case study content</label>
            <textarea className="cms-richtext" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Separate paragraphs with a blank line. Describe the challenge, solution, and outcomes in detail." />

            {error && <div className="cms-error">{error}</div>}

            <div className="cms-editor-actions">
              <button className="btn btn-soft" onClick={() => save("draft")}>Save draft</button>
              <button className="btn btn-primary" onClick={() => save("published")}>Publish</button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
