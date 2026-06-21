"use client";

import { useCallback, useEffect, useState } from "react";
import Icon from "@/components/Icon";
import type { TrustItem } from "@/lib/types";

const EMPTY: Omit<TrustItem, "id" | "order"> = {
  title: "",
  desc: "",
  icon: "",
};

export default function TrustCmsManager({ notify }: { notify: (message: string) => void }) {
  const [items, setItems] = useState<TrustItem[]>([]);
  const [editing, setEditing] = useState<TrustItem | null>(null);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/site-data/trust-items?all=1");
      if (!res.ok) throw new Error("Unable to load trust items");
      setItems(await res.json());
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to load trust items");
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  function open(item?: TrustItem) {
    setEditing(item ? { ...item } : { id: 0, order: 0, ...EMPTY });
    setError("");
  }

  async function save() {
    if (!editing?.title.trim()) { setError("Title is required."); return; }
    try {
      const isNew = !editing.id;
      const res = await fetch(
        isNew ? "/api/site-data/trust-items" : `/api/site-data/trust-items/${editing.id}`,
        {
          method: isNew ? "POST" : "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: editing.title,
            desc: editing.desc,
            icon: editing.icon,
          }),
        }
      );
      if (!res.ok) throw new Error("Could not save trust item");
      setEditing(null);
      await load();
      notify(isNew ? "Trust item created" : "Trust item updated");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save trust item");
    }
  }

  async function remove(item: TrustItem) {
    if (!window.confirm(`Delete "${item.title}"?`)) return;
    await fetch(`/api/site-data/trust-items/${item.id}`, { method: "DELETE" });
    await load();
    notify("Trust item deleted");
  }

  return (
    <>
      <div className="panel">
        <h3>Trust / Values <button className="btn btn-primary btn-sm" onClick={() => open()}>+ New item</button></h3>
        {error && !editing && <div className="cms-error">{error}</div>}
        {items.length === 0 ? (
          <p style={{ color: "var(--ad-muted)", fontSize: ".9rem" }}>No trust items yet. Create your first one.</p>
        ) : (
          <table>
            <thead><tr><th>Title</th><th>Description</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td><strong>{item.title}</strong></td>
                  <td style={{ color: "var(--ad-muted)", fontSize: ".85rem" }}>
                    {item.desc.length > 50 ? item.desc.slice(0, 50) + "…" : item.desc}
                  </td>
                  <td className="act">
                    <button className="btn btn-soft btn-sm" onClick={() => open(item)}>Edit</button>
                    <button className="icon-btn del" onClick={() => remove(item)} title="Delete">
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
              <div><small>Trust CMS</small><h2>{editing.id ? "Edit item" : "Create item"}</h2></div>
              <button className="icon-btn" onClick={() => setEditing(null)}>
                <Icon path='<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>' size={16} stroke={2.2} />
              </button>
            </div>

            <label>Title *</label>
            <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />

            <label>Description</label>
            <textarea rows={3} value={editing.desc} onChange={(e) => setEditing({ ...editing, desc: e.target.value })} />

            <label>Icon (SVG path data)</label>
            <textarea rows={3} value={editing.icon} onChange={(e) => setEditing({ ...editing, icon: e.target.value })} placeholder='e.g. <path d="M12 3..."/>' />

            {error && <div className="cms-error">{error}</div>}

            <div className="cms-editor-actions">
              <button className="btn btn-soft" onClick={() => setEditing(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={save}>Save</button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
