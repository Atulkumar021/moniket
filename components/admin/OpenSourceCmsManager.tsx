"use client";

import { useCallback, useEffect, useState } from "react";
import Icon from "@/components/Icon";
import type { ToolItem } from "@/lib/types";

type Draft = Omit<ToolItem, "id"> & { id: number };

const EMPTY: Draft = {
  id: 0, name: "", category: "Infrastructure", license: "MIT",
  description: "", link: "", status: "draft",
};

const CATEGORIES = [
  "Infrastructure", "Containers & K8s", "CI/CD", "Security",
  "Monitoring & Observability", "Networking", "Databases",
  "Cloud", "DevTools", "Scripting & Automation", "Other",
];

export default function OpenSourceCmsManager({ notify }: { notify: (message: string) => void }) {
  const [items, setItems] = useState<ToolItem[]>([]);
  const [editing, setEditing] = useState<Draft | null>(null);
  const [error, setError] = useState("");

  const loadAll = useCallback(async () => {
    try {
      const res = await fetch("/api/tools?all=1");
      if (!res.ok) throw new Error("Unable to load tools");
      setItems(await res.json());
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to load tools");
    }
  }, []);

  useEffect(() => { void loadAll(); }, [loadAll]);

  function open(tool?: ToolItem) {
    if (tool) setEditing({ ...tool, link: tool.link || "" });
    else setEditing({ ...EMPTY });
    setError("");
  }

  async function save(status: "draft" | "published") {
    if (!editing?.name.trim()) { setError("Name is required."); return; }
    const payload = {
      name: editing.name,
      category: editing.category,
      license: editing.license,
      description: editing.description,
      link: editing.link || undefined,
      status,
    };
    try {
      const res = await fetch(editing.id ? `/api/tools/${editing.id}` : "/api/tools", {
        method: editing.id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => null))?.error || "Could not save tool");
      setEditing(null);
      await loadAll();
      notify(status === "published" ? "Tool published" : "Tool saved as draft");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save tool");
    }
  }

  async function remove(tool: ToolItem) {
    if (!window.confirm(`Delete "${tool.name}"?`)) return;
    await fetch(`/api/tools/${tool.id}`, { method: "DELETE" });
    await loadAll();
    notify("Tool deleted");
  }

  async function toggleVisible(tool: ToolItem) {
    const next = tool.status === "published" ? "draft" : "published";
    setItems((list) => list.map((x) => (x.id === tool.id ? { ...x, status: next } : x)));
    try {
      const res = await fetch(`/api/tools/${tool.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (!res.ok) throw new Error();
      notify(next === "published" ? "Tool is now visible on the website" : "Tool hidden from the website");
    } catch { await loadAll(); }
  }

  return (
    <>
      <div className="panel cms-panel">
        <div className="cms-header">
          <div className="cms-hdr-left">
            <div className="cms-hdr-icon">
              <Icon path='<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>' size={20} stroke={1.9} />
            </div>
            <div>
              <small className="cms-eyebrow">Resources</small>
              <h3>Open-Source Tools</h3>
              <p>Manage the open-source tools shown on your toolbox page.</p>
            </div>
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => open()}>+ Add tool</button>
        </div>
        {error && !editing && <div className="cms-error">{error}</div>}
        {items.length === 0 ? (
          <div className="cms-empty">
            <strong>No custom tools yet</strong>
            <span>Add tools to override the default static toolbox list on your website.</span>
          </div>
        ) : (
          <table>
            <thead>
              <tr><th>Name</th><th>Category</th><th>License</th><th>Visible</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {items.map((t) => (
                <tr key={t.id}>
                  <td>
                    <strong>{t.name}</strong>
                    {t.link && <><br /><small><a href={t.link} target="_blank" rel="noreferrer" style={{ color: "var(--primary)" }}>{t.link}</a></small></>}
                  </td>
                  <td>{t.category}</td>
                  <td><code style={{ fontSize: ".75rem" }}>{t.license}</code></td>
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
              <div><small>Open-Source CMS</small><h2>{editing.id ? "Edit tool" : "Add tool"}</h2></div>
              <button className="icon-btn" onClick={() => setEditing(null)}>
                <Icon path='<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>' size={16} stroke={2.2} />
              </button>
            </div>

            <label>Tool name *</label>
            <input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} placeholder="e.g. Terraform" />

            <div className="cms-field-grid">
              <div>
                <label>Category</label>
                <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label>License</label>
                <input value={editing.license} onChange={(e) => setEditing({ ...editing, license: e.target.value })} placeholder="MIT, Apache 2.0, GPL-3.0…" />
              </div>
            </div>

            <label>Description</label>
            <textarea rows={3} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} placeholder="One-line description of what the tool does..." />

            <label>Link (GitHub / website)</label>
            <input value={editing.link ?? ""} onChange={(e) => setEditing({ ...editing, link: e.target.value })} placeholder="https://github.com/hashicorp/terraform" />

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
