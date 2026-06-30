"use client";

import { useCallback, useEffect, useState } from "react";
import Icon from "@/components/Icon";
import type { Article, Block } from "@/lib/types";

type Draft = {
  id: number;
  title: string;
  category: string;
  read: number;
  tools: string[];
  excerpt: string;
  status: "draft" | "published";
  body: Block[];
};

const EMPTY: Draft = {
  id: 0, title: "", category: "General", read: 5, tools: [], excerpt: "", status: "draft", body: [],
};

const CATEGORIES = ["General", "Tutorial", "Best Practice", "Case Study", "Architecture", "How-To", "Deep Dive", "News & Updates"];

const blocksToText = (body: Block[]) =>
  body.map((b) => (Array.isArray(b.c) ? b.c.join("\n") : b.c)).join("\n\n");
const textToBlocks = (text: string): Block[] =>
  text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean).map((c) => ({ t: "p", c }));

type Props = {
  service: string;
  serviceLabel: string;
  icon: string;
  notify: (message: string) => void;
};

export default function ServiceCmsManager({ service, serviceLabel, icon, notify }: Props) {
  const [items, setItems] = useState<Article[]>([]);
  const [editing, setEditing] = useState<Draft | null>(null);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const loadAll = useCallback(async () => {
    try {
      const res = await fetch(`/api/service-articles?service=${encodeURIComponent(service)}&all=1`);
      if (!res.ok) throw new Error("Unable to load articles");
      setItems(await res.json());
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to load articles");
    }
  }, [service]);

  useEffect(() => { void loadAll(); }, [loadAll]);

  function open(article?: Article) {
    if (article) {
      setEditing({
        id: article.id,
        title: article.title,
        category: article.category,
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
      domain: service,
      read: editing.read,
      tools: editing.tools.filter(Boolean),
      excerpt: editing.excerpt,
      status,
      body: textToBlocks(content),
    };
    try {
      const res = await fetch(
        editing.id ? `/api/service-articles/${editing.id}` : "/api/service-articles",
        {
          method: editing.id ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) throw new Error((await res.json().catch(() => null))?.error || "Could not save article");
      setEditing(null);
      await loadAll();
      notify(status === "published" ? `${serviceLabel} article published` : "Article saved as draft");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save article");
    }
  }

  async function remove(article: Article) {
    if (!window.confirm(`Delete "${article.title}"?`)) return;
    await fetch(`/api/service-articles/${article.id}`, { method: "DELETE" });
    await loadAll();
    notify("Article deleted");
  }

  async function toggleVisible(article: Article) {
    const next = article.status === "published" ? "draft" : "published";
    setItems((list) => list.map((x) => (x.id === article.id ? { ...x, status: next } : x)));
    try {
      const res = await fetch(`/api/service-articles/${article.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (!res.ok) throw new Error();
      notify(next === "published" ? "Article is now visible on the website" : "Article hidden from the website");
    } catch {
      await loadAll();
    }
  }

  return (
    <>
      <div className="panel cms-panel">
        <div className="cms-header">
          <div className="cms-hdr-left">
            <div className="cms-hdr-icon">
              <Icon path={icon} size={20} stroke={1.9} />
            </div>
            <div>
              <small className="cms-eyebrow">Services</small>
              <h3>{serviceLabel}</h3>
              <p>Manage articles and guides published under the {serviceLabel} service page.</p>
            </div>
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => open()}>+ New article</button>
        </div>

        {error && !editing && <div className="cms-error">{error}</div>}

        {items.length === 0 ? (
          <div className="cms-empty">
            <strong>No articles yet</strong>
            <span>Publish your first article for the {serviceLabel} service.</span>
          </div>
        ) : (
          <table>
            <thead>
              <tr><th>Title</th><th>Category</th><th>Read time</th><th>Visible</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {items.map((a) => (
                <tr key={a.id}>
                  <td>
                    <strong>{a.title}</strong>
                    <br /><small style={{ color: "var(--ad-muted)" }}>{a.excerpt.slice(0, 60)}{a.excerpt.length > 60 ? "…" : ""}</small>
                  </td>
                  <td>{a.category}</td>
                  <td>{a.read} min</td>
                  <td>
                    <div className="tut-vis">
                      <label className="toggle" title={a.status === "published" ? "Hide from website" : "Show on website"}>
                        <input type="checkbox" checked={a.status === "published"} onChange={() => toggleVisible(a)} />
                        <span className="toggle-track" /><span className="toggle-thumb" />
                      </label>
                      <span data-on={a.status === "published"}>{a.status === "published" ? "Live" : "Hidden"}</span>
                    </div>
                  </td>
                  <td className="act">
                    <button className="btn btn-soft btn-sm" onClick={() => open(a)}>Edit</button>
                    <button className="icon-btn del" onClick={() => remove(a)} title="Delete">
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
              <div>
                <small>{serviceLabel} CMS</small>
                <h2>{editing.id ? "Edit article" : "New article"}</h2>
              </div>
              <button className="icon-btn" onClick={() => setEditing(null)}>
                <Icon path='<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>' size={16} stroke={2.2} />
              </button>
            </div>

            <label>Title *</label>
            <input
              value={editing.title}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              placeholder={`e.g. Getting started with ${serviceLabel}`}
            />

            <div className="cms-field-grid">
              <div>
                <label>Category</label>
                <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label>Read time (min)</label>
                <input type="number" min={1} value={editing.read} onChange={(e) => setEditing({ ...editing, read: Number(e.target.value) || 1 })} />
              </div>
            </div>

            <label>Related tools / tech (comma separated)</label>
            <input
              value={editing.tools.join(", ")}
              onChange={(e) => setEditing({ ...editing, tools: e.target.value.split(",").map((s) => s.trim()) })}
              placeholder="Terraform, AWS, Kubernetes"
            />

            <label>Excerpt</label>
            <textarea
              rows={3}
              value={editing.excerpt}
              onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
              placeholder="Short description shown in article listings..."
            />

            <label>Full article content</label>
            <textarea
              className="cms-richtext"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write the full article here. Separate paragraphs with a blank line."
            />

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
