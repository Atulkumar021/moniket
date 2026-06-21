"use client";

import { useCallback, useEffect, useState } from "react";
import Icon from "@/components/Icon";
import type { TrackItem } from "@/lib/types";

const EMPTY: Omit<TrackItem, "id" | "order"> = {
  name: "",
  desc: "",
  guides: 0,
  hours: 0,
  color: "#334155",
  tint: "#EEF2F7",
  icon: "",
};

export default function TracksCmsManager({ notify }: { notify: (message: string) => void }) {
  const [items, setItems] = useState<TrackItem[]>([]);
  const [editing, setEditing] = useState<TrackItem | null>(null);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/site-data/tracks?all=1");
      if (!res.ok) throw new Error("Unable to load tracks");
      setItems(await res.json());
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to load tracks");
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  function open(item?: TrackItem) {
    setEditing(item ? { ...item } : { id: 0, order: 0, ...EMPTY });
    setError("");
  }

  async function save() {
    if (!editing?.name.trim()) { setError("Name is required."); return; }
    try {
      const isNew = !editing.id;
      const res = await fetch(
        isNew ? "/api/site-data/tracks" : `/api/site-data/tracks/${editing.id}`,
        {
          method: isNew ? "POST" : "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: editing.name,
            desc: editing.desc,
            guides: editing.guides,
            hours: editing.hours,
            color: editing.color,
            tint: editing.tint,
            icon: editing.icon,
          }),
        }
      );
      if (!res.ok) throw new Error("Could not save track");
      setEditing(null);
      await load();
      notify(isNew ? "Track created" : "Track updated");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save track");
    }
  }

  async function remove(item: TrackItem) {
    if (!window.confirm(`Delete track "${item.name}"?`)) return;
    await fetch(`/api/site-data/tracks/${item.id}`, { method: "DELETE" });
    await load();
    notify("Track deleted");
  }

  return (
    <>
      <div className="panel">
        <h3>Learning Tracks <button className="btn btn-primary btn-sm" onClick={() => open()}>+ New track</button></h3>
        {error && !editing && <div className="cms-error">{error}</div>}
        {items.length === 0 ? (
          <p style={{ color: "var(--ad-muted)", fontSize: ".9rem" }}>No tracks yet. Create your first one.</p>
        ) : (
          <table>
            <thead><tr><th>Name</th><th>Guides</th><th>Hours</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: item.color, flexShrink: 0 }} />
                      <strong>{item.name}</strong>
                    </div>
                  </td>
                  <td>{item.guides}</td>
                  <td>{item.hours}h</td>
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
              <div><small>Tracks CMS</small><h2>{editing.id ? "Edit track" : "Create track"}</h2></div>
              <button className="icon-btn" onClick={() => setEditing(null)}>
                <Icon path='<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>' size={16} stroke={2.2} />
              </button>
            </div>

            <label>Name *</label>
            <input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />

            <label>Description</label>
            <textarea rows={3} value={editing.desc} onChange={(e) => setEditing({ ...editing, desc: e.target.value })} />

            <div className="cms-field-grid">
              <div>
                <label>Guides (count)</label>
                <input type="number" min={0} value={editing.guides} onChange={(e) => setEditing({ ...editing, guides: Number(e.target.value) || 0 })} />
              </div>
              <div>
                <label>Hours (reading time)</label>
                <input type="number" min={0} value={editing.hours} onChange={(e) => setEditing({ ...editing, hours: Number(e.target.value) || 0 })} />
              </div>
            </div>

            <div className="cms-field-grid">
              <div>
                <label>Color (hex)</label>
                <input value={editing.color} onChange={(e) => setEditing({ ...editing, color: e.target.value })} placeholder="#334155" />
              </div>
              <div>
                <label>Tint (hex)</label>
                <input value={editing.tint} onChange={(e) => setEditing({ ...editing, tint: e.target.value })} placeholder="#EEF2F7" />
              </div>
            </div>

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
