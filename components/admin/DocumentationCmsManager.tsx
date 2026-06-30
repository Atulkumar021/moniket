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
  id: 0, title: "", category: "Infrastructure as Code", domain: "Infrastructure",
  read: 3, tools: [], excerpt: "", status: "draft", body: [],
};

const DOC_CATEGORIES = [
  "Infrastructure as Code",
  "Security & Compliance",
  "Kubernetes & Containers",
  "Monitoring & Observability",
  "CI/CD Pipelines",
  "Cloud Networking",
  "AWS Reference",
  "Developer Tooling",
  "Configuration Templates",
  "General",
];

const blocksToText = (body: Block[]) =>
  body.map((b) => (Array.isArray(b.c) ? b.c.join("\n") : b.c)).join("\n\n");
const textToBlocks = (text: string): Block[] =>
  text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean).map((c) => ({ t: "p", c }));

export default function DocumentationCmsManager({ notify }: { notify: (message: string) => void }) {
  const [items, setItems] = useState<Article[]>([]);
  const [editing, setEditing] = useState<Draft | null>(null);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/documentation");
      if (!res.ok) throw new Error("Unable to load documentation");
      setItems(await res.json());
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to load documentation");
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
      const res = await fetch(editing.id ? `/api/documentation/${editing.id}` : "/api/documentation", {
        method: editing.id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => null))?.error || "Could not save documentation");
      setEditing(null);
      await load();
      notify(status === "published" ? "Documentation published" : "Documentation draft saved");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save documentation");
    }
  }

  async function remove(article: Article) {
    if (!window.confirm(`Delete "${article.title}"?`)) return;
    await fetch(`/api/documentation/${article.id}`, { method: "DELETE" });
    await load();
    notify("Documentation deleted");
  }

  async function toggleVisible(article: Article) {
    const next = article.status === "published" ? "draft" : "published";
    setItems((list) => list.map((x) => (x.id === article.id ? { ...x, status: next } : x)));
    try {
      const res = await fetch(`/api/documentation/${article.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (!res.ok) throw new Error();
      notify(next === "published" ? "Documentation is now visible on the website" : "Documentation hidden from the website");
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
              <Icon path='<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>' size={20} stroke={1.9} />
            </div>
            <div>
              <small className="cms-eyebrow">Resources</small>
              <h3>Documentation</h3>
              <p>Write and publish reference guides, runbooks and best-practice docs.</p>
            </div>
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => open()}>+ New doc</button>
        </div>
        {error && !editing && <div className="cms-error">{error}</div>}
        {items.length === 0 ? (
          <div className="cms-empty">
            <strong>No documentation yet</strong>
            <span>Write your first reference guide or runbook.</span>
          </div>
        ) : (
          <table>
            <thead>
              <tr><th>Title</th><th>Category</th><th>Visible</th><th>Read</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {items.map((t) => (
                <tr key={t.id}>
                  <td><strong>{t.title}</strong><br /><small>{t.excerpt.slice(0, 60)}{t.excerpt.length > 60 ? "…" : ""}</small></td>
                  <td>{t.category}</td>
                  <td>
                    <div className="tut-vis">
                      <label className="toggle" title={t.status === "published" ? "Hide from website" : "Show on website"}>
                        <input type="checkbox" checked={t.status === "published"} onChange={() => toggleVisible(t)} />
                        <span className="toggle-track" /><span className="toggle-thumb" />
                      </label>
                      <span data-on={t.status === "published"}>{t.status === "published" ? "Live" : "Hidden"}</span>
                    </div>
                  </td>
                  <td>{t.read} min</td>
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
              <div><small>Documentation CMS</small><h2>{editing.id ? "Edit doc" : "New doc"}</h2></div>
              <button className="icon-btn" onClick={() => setEditing(null)}>
                <Icon path='<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>' size={16} stroke={2.2} />
              </button>
            </div>

            <label>Title *</label>
            <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} placeholder="e.g. Terraform Module Best Practices" />

            <div className="cms-field-grid">
              <div>
                <label>Category</label>
                <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })}>
                  {DOC_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label>Domain</label>
                <input value={editing.domain} onChange={(e) => setEditing({ ...editing, domain: e.target.value })} placeholder="e.g. Infrastructure" />
              </div>
            </div>

            <div className="cms-field-grid">
              <div>
                <label>Related tools (comma separated)</label>
                <input value={editing.tools.join(", ")} onChange={(e) => setEditing({ ...editing, tools: e.target.value.split(",").map((s) => s.trim()) })} placeholder="Terraform, AWS, Ansible" />
              </div>
              <div>
                <label>Read time (min)</label>
                <input type="number" min={1} value={editing.read} onChange={(e) => setEditing({ ...editing, read: Number(e.target.value) || 1 })} />
              </div>
            </div>

            <label>Excerpt</label>
            <textarea rows={3} value={editing.excerpt} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} placeholder="One-line summary of what this doc covers..." />

            <label>Content</label>
            <textarea className="cms-richtext" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Separate paragraphs with a blank line." />

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
