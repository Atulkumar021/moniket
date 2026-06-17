"use client";

import { useCallback, useEffect, useState } from "react";
import Icon from "@/components/Icon";
import type { Article, Block } from "@/lib/types";

type Draft = {
  id: number;
  title: string;
  category: string;
  domain: string;
  difficulty: string;
  read: number;
  tools: string[];
  excerpt: string;
  status: "draft" | "published";
  body: Block[];
};

const EMPTY: Draft = {
  id: 0, title: "", category: "General", domain: "DevOps", difficulty: "Beginner",
  read: 4, tools: [], excerpt: "", status: "draft", body: [],
};
const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"];

const blocksToText = (body: Block[]) =>
  body.map((block) => (Array.isArray(block.c) ? block.c.join("\n") : block.c)).join("\n\n");
const textToBlocks = (text: string): Block[] =>
  text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean).map((c) => ({ t: "p", c }));

export default function TutorialCmsManager({ notify }: { notify: (message: string) => void }) {
  const [items, setItems] = useState<Article[]>([]);
  const [editing, setEditing] = useState<Draft | null>(null);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/tutorials");
      if (!res.ok) throw new Error("Unable to load tutorials");
      setItems(await res.json());
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to load tutorials");
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
        difficulty: article.difficulty || "Beginner",
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
      difficulty: editing.difficulty,
      read: editing.read,
      tools: editing.tools.filter(Boolean),
      excerpt: editing.excerpt,
      status,
      body: textToBlocks(content),
    };
    try {
      const res = await fetch(editing.id ? `/api/tutorials/${editing.id}` : "/api/tutorials", {
        method: editing.id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => null))?.error || "Could not save tutorial");
      setEditing(null);
      await load();
      notify(status === "published" ? "Tutorial published" : "Tutorial draft saved");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save tutorial");
    }
  }

  async function remove(article: Article) {
    if (!window.confirm(`Delete "${article.title}"?`)) return;
    await fetch(`/api/tutorials/${article.id}`, { method: "DELETE" });
    await load();
    notify("Tutorial deleted");
  }

  // Enable/disable a tutorial. Disabled (draft) tutorials are hidden from the website.
  async function toggleVisible(article: Article) {
    const next = article.status === "published" ? "draft" : "published";
    setItems((list) => list.map((x) => (x.id === article.id ? { ...x, status: next } : x)));
    try {
      const res = await fetch(`/api/tutorials/${article.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (!res.ok) throw new Error();
      notify(next === "published" ? "Tutorial is now visible on the website" : "Tutorial hidden from the website");
    } catch {
      await load();
    }
  }

  return (
    <>
      <div className="panel">
        <h3>Tutorials <button className="btn btn-primary btn-sm" onClick={() => open()}>+ New tutorial</button></h3>
        {error && !editing && <div className="cms-error">{error}</div>}
        {items.length === 0 ? (
          <p style={{ color: "var(--ad-muted)", fontSize: ".9rem" }}>No tutorials yet. Create your first one.</p>
        ) : (
          <table>
            <thead><tr><th>Title</th><th>Domain</th><th>Difficulty</th><th>Visible</th><th>Views</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map((t) => (
                <tr key={t.id}>
                  <td><strong>{t.title}</strong><br /><small>{t.category}</small></td>
                  <td>{t.domain}</td>
                  <td>{t.difficulty || "—"}</td>
                  <td>
                    <div className="tut-vis">
                      <label className="toggle" title={t.status === "published" ? "Hide from website" : "Show on website"}>
                        <input type="checkbox" checked={t.status === "published"} onChange={() => toggleVisible(t)} />
                        <span className="toggle-track" /><span className="toggle-thumb" />
                      </label>
                      <span data-on={t.status === "published"}>{t.status === "published" ? "Live" : "Hidden"}</span>
                    </div>
                  </td>
                  <td>{t.views}</td>
                  <td className="act">
                    <a className="btn btn-soft btn-sm" href={`/tutorials/${t.id}`} target="_blank" rel="noreferrer">View</a>
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
              <div><small>Tutorial CMS</small><h2>{editing.id ? "Edit tutorial" : "Create tutorial"}</h2></div>
              <button className="icon-btn" onClick={() => setEditing(null)}>
                <Icon path='<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>' size={16} stroke={2.2} />
              </button>
            </div>

            <label>Title *</label>
            <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />

            <div className="cms-field-grid">
              <div><label>Category</label><input value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} /></div>
              <div><label>Domain</label><input value={editing.domain} onChange={(e) => setEditing({ ...editing, domain: e.target.value })} /></div>
            </div>

            <div className="cms-field-grid">
              <div>
                <label>Difficulty</label>
                <select value={editing.difficulty} onChange={(e) => setEditing({ ...editing, difficulty: e.target.value })}>
                  {DIFFICULTIES.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div><label>Reading time (min)</label><input type="number" min={1} value={editing.read} onChange={(e) => setEditing({ ...editing, read: Number(e.target.value) || 1 })} /></div>
            </div>

            <label>Tools (comma separated)</label>
            <input value={editing.tools.join(", ")} onChange={(e) => setEditing({ ...editing, tools: e.target.value.split(",").map((s) => s.trim()) })} />

            <label>Excerpt</label>
            <textarea rows={3} value={editing.excerpt} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} />

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
