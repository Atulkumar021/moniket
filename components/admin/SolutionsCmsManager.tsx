"use client";

import { useCallback, useEffect, useState } from "react";
import Icon from "@/components/Icon";
import type { SolutionItem } from "@/lib/types";

type Draft = SolutionItem;

const EMPTY: Draft = {
  id: 0, title: "", slug: "", icon: "", excerpt: "", status: "draft", order: 0,
};

const PRESET_ICONS: { label: string; path: string }[] = [
  { label: "Cloud", path: '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/>' },
  { label: "DevOps / Wrench", path: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>' },
  { label: "Security / Shield", path: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>' },
  { label: "Networking", path: '<rect x="2" y="2" width="6" height="6" rx="1"/><rect x="16" y="2" width="6" height="6" rx="1"/><rect x="9" y="16" width="6" height="6" rx="1"/><path d="M5 8v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8"/><line x1="12" y1="14" x2="12" y2="16"/>' },
  { label: "Monitoring / Chart", path: '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>' },
  { label: "Database", path: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>' },
  { label: "Server / Infra", path: '<rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>' },
  { label: "Container / Box", path: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>' },
  { label: "CI/CD / Refresh", path: '<path d="M17 2l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>' },
  { label: "Code / Terminal", path: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>' },
];

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function SolutionsCmsManager({ notify }: { notify: (message: string) => void }) {
  const [items, setItems] = useState<SolutionItem[]>([]);
  const [editing, setEditing] = useState<Draft | null>(null);
  const [error, setError] = useState("");

  const loadAll = useCallback(async () => {
    try {
      const res = await fetch("/api/solutions?all=1");
      if (!res.ok) throw new Error("Unable to load solutions");
      setItems(await res.json());
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to load solutions");
    }
  }, []);

  useEffect(() => { void loadAll(); }, [loadAll]);

  function open(item?: SolutionItem) {
    setEditing(item ? { ...item } : { ...EMPTY, order: items.length });
    setError("");
  }

  async function save(status: "draft" | "published") {
    if (!editing?.title.trim()) { setError("Title is required."); return; }
    const payload = {
      title: editing.title,
      slug: editing.slug || slugify(editing.title),
      icon: editing.icon,
      excerpt: editing.excerpt,
      status,
      order: editing.order,
    };
    try {
      const res = await fetch(editing.id ? `/api/solutions/${editing.id}` : "/api/solutions", {
        method: editing.id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => null))?.error || "Could not save solution");
      setEditing(null);
      await loadAll();
      notify(status === "published" ? "Solution published" : "Solution saved as draft");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save solution");
    }
  }

  async function remove(item: SolutionItem) {
    if (!window.confirm(`Delete "${item.title}"?`)) return;
    await fetch(`/api/solutions/${item.id}`, { method: "DELETE" });
    await loadAll();
    notify("Solution deleted");
  }

  async function toggleVisible(item: SolutionItem) {
    const next = item.status === "published" ? "draft" : "published";
    setItems((list) => list.map((x) => (x.id === item.id ? { ...x, status: next } : x)));
    try {
      const res = await fetch(`/api/solutions/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (!res.ok) throw new Error();
      notify(next === "published" ? "Solution is now visible on the website" : "Solution hidden from the website");
    } catch { await loadAll(); }
  }

  return (
    <>
      <div className="panel cms-panel">
        <div className="cms-header">
          <div className="cms-hdr-left">
            <div className="cms-hdr-icon">
              <Icon path='<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/>' size={20} stroke={1.9} />
            </div>
            <div>
              <small className="cms-eyebrow">Content</small>
              <h3>Solutions</h3>
              <p>Manage the service cards shown on the Solutions page.</p>
            </div>
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => open()}>+ New solution</button>
        </div>
        {error && !editing && <div className="cms-error">{error}</div>}
        {items.length === 0 ? (
          <div className="cms-empty">
            <strong>No solutions yet</strong>
            <span>Add your first service offering to show it on the Solutions page.</span>
          </div>
        ) : (
          <table>
            <thead>
              <tr><th>Icon</th><th>Title</th><th>Slug</th><th>Visible</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {items.map((s) => (
                <tr key={s.id}>
                  <td style={{ width: 44 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--ad-soft)", display: "grid", placeItems: "center", color: "var(--primary)" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: s.icon || '<circle cx="12" cy="12" r="9"/>' }} />
                    </div>
                  </td>
                  <td>
                    <strong>{s.title}</strong>
                    <br /><small style={{ color: "var(--ad-muted)" }}>{s.excerpt.slice(0, 55)}{s.excerpt.length > 55 ? "…" : ""}</small>
                  </td>
                  <td><code style={{ fontSize: ".75rem" }}>/solutions/{s.slug}/</code></td>
                  <td>
                    <div className="tut-vis">
                      <label className="toggle" title={s.status === "published" ? "Hide from website" : "Show on website"}>
                        <input type="checkbox" checked={s.status === "published"} onChange={() => toggleVisible(s)} />
                        <span className="toggle-track" /><span className="toggle-thumb" />
                      </label>
                      <span data-on={s.status === "published"}>{s.status === "published" ? "Live" : "Hidden"}</span>
                    </div>
                  </td>
                  <td className="act">
                    <a className="btn btn-soft btn-sm" href={`/solutions/${s.slug}/`} target="_blank" rel="noreferrer">View</a>
                    <button className="btn btn-soft btn-sm" onClick={() => open(s)}>Edit</button>
                    <button className="icon-btn del" onClick={() => remove(s)} title="Delete">
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
              <div><small>Solutions CMS</small><h2>{editing.id ? "Edit solution" : "New solution"}</h2></div>
              <button className="icon-btn" onClick={() => setEditing(null)}>
                <Icon path='<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>' size={16} stroke={2.2} />
              </button>
            </div>

            <label>Title *</label>
            <input
              value={editing.title}
              onChange={(e) => setEditing({
                ...editing,
                title: e.target.value,
                slug: editing.id ? editing.slug : slugify(e.target.value),
              })}
              placeholder="e.g. Cloud Infrastructure"
            />

            <label>Slug (URL)</label>
            <input
              value={editing.slug}
              onChange={(e) => setEditing({ ...editing, slug: slugify(e.target.value) })}
              placeholder="cloud-infrastructure"
            />
            <small style={{ color: "var(--ad-muted)", fontSize: ".75rem", marginTop: -6 }}>
              Page URL: /solutions/{editing.slug || "slug"}/
            </small>

            <label style={{ marginTop: 8 }}>Icon — choose preset</label>
            <div className="sol-icon-grid">
              {PRESET_ICONS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  title={p.label}
                  className={`sol-icon-btn ${editing.icon === p.path ? "selected" : ""}`}
                  onClick={() => setEditing({ ...editing, icon: p.path })}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: p.path }} />
                </button>
              ))}
            </div>

            <label>Custom SVG path (optional)</label>
            <input
              value={editing.icon}
              onChange={(e) => setEditing({ ...editing, icon: e.target.value })}
              placeholder='<path d="..."/>'
            />

            <label>Description</label>
            <textarea
              rows={3}
              value={editing.excerpt}
              onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
              placeholder="Short description shown on the solutions listing card..."
            />

            <label>Display order</label>
            <input
              type="number"
              min={0}
              value={editing.order}
              onChange={(e) => setEditing({ ...editing, order: Number(e.target.value) })}
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
