"use client";

import { useCallback, useEffect, useState } from "react";
import Icon from "@/components/Icon";
import type { SiteStatItem } from "@/lib/types";

const EMPTY: Omit<SiteStatItem, "id" | "order"> = {
  value: 0,
  suffix: "",
  label: "",
  desc: "",
  icon: "",
};

export default function StatsCmsManager({ notify }: { notify: (message: string) => void }) {
  const [items, setItems] = useState<SiteStatItem[]>([]);
  const [editing, setEditing] = useState<SiteStatItem | null>(null);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/site-data/site-stats?all=1");
      if (!res.ok) throw new Error("Unable to load stats");
      setItems(await res.json());
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to load stats");
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  function open(item?: SiteStatItem) {
    setEditing(item ? { ...item } : { id: 0, order: 0, ...EMPTY });
    setError("");
  }

  async function save() {
    if (!editing?.label.trim()) { setError("Label is required."); return; }
    try {
      const isNew = !editing.id;
      const res = await fetch(
        isNew ? "/api/site-data/site-stats" : `/api/site-data/site-stats/${editing.id}`,
        {
          method: isNew ? "POST" : "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            value: editing.value,
            suffix: editing.suffix,
            label: editing.label,
            desc: editing.desc,
            icon: editing.icon,
          }),
        }
      );
      if (!res.ok) throw new Error("Could not save stat");
      setEditing(null);
      await load();
      notify(isNew ? "Stat created" : "Stat updated");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save stat");
    }
  }

  async function remove(item: SiteStatItem) {
    if (!window.confirm(`Delete "${item.label}"?`)) return;
    await fetch(`/api/site-data/site-stats/${item.id}`, { method: "DELETE" });
    await load();
    notify("Stat deleted");
  }

  return (
    <>
      <div className="panel">
        <h3>Stats Band <button className="btn btn-primary btn-sm" onClick={() => open()}>+ New stat</button></h3>
        {error && !editing && <div className="cms-error">{error}</div>}
        {items.length === 0 ? (
          <p style={{ color: "var(--ad-muted)", fontSize: ".9rem" }}>No stats yet. Create your first one.</p>
        ) : (
          <table>
            <thead><tr><th>Value</th><th>Label</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td><strong>{item.value}{item.suffix}</strong></td>
                  <td>{item.label}</td>
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
              <div><small>Stats CMS</small><h2>{editing.id ? "Edit stat" : "Create stat"}</h2></div>
              <button className="icon-btn" onClick={() => setEditing(null)}>
                <Icon path='<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>' size={16} stroke={2.2} />
              </button>
            </div>

            <div className="cms-field-grid">
              <div>
                <label>Value (number)</label>
                <input type="number" value={editing.value} onChange={(e) => setEditing({ ...editing, value: Number(e.target.value) || 0 })} />
              </div>
              <div>
                <label>Suffix (e.g. &quot;+&quot;)</label>
                <input value={editing.suffix} onChange={(e) => setEditing({ ...editing, suffix: e.target.value })} />
              </div>
            </div>

            <label>Label *</label>
            <input value={editing.label} onChange={(e) => setEditing({ ...editing, label: e.target.value })} />

            <label>Description</label>
            <input value={editing.desc} onChange={(e) => setEditing({ ...editing, desc: e.target.value })} />

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
