"use client";

import { useCallback, useEffect, useState } from "react";
import Icon from "@/components/Icon";
import type { SkillItem } from "@/lib/types";

const LEVELS = ["Expert", "Advanced", "Intermediate", "Beginner"] as const;

const EMPTY: Omit<SkillItem, "id" | "order"> = {
  name: "",
  level: "Intermediate",
  pct: 50,
  icon: "",
};

export default function SkillsCmsManager({ notify }: { notify: (message: string) => void }) {
  const [items, setItems] = useState<SkillItem[]>([]);
  const [editing, setEditing] = useState<SkillItem | null>(null);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/site-data/skills?all=1");
      if (!res.ok) throw new Error("Unable to load skills");
      setItems(await res.json());
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to load skills");
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  function open(item?: SkillItem) {
    setEditing(item ? { ...item } : { id: 0, order: 0, ...EMPTY });
    setError("");
  }

  async function save() {
    if (!editing?.name.trim()) { setError("Name is required."); return; }
    try {
      const isNew = !editing.id;
      const res = await fetch(
        isNew ? "/api/site-data/skills" : `/api/site-data/skills/${editing.id}`,
        {
          method: isNew ? "POST" : "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: editing.name,
            level: editing.level,
            pct: editing.pct,
            icon: editing.icon,
          }),
        }
      );
      if (!res.ok) throw new Error("Could not save skill");
      setEditing(null);
      await load();
      notify(isNew ? "Skill created" : "Skill updated");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save skill");
    }
  }

  async function remove(item: SkillItem) {
    if (!window.confirm(`Delete "${item.name}"?`)) return;
    await fetch(`/api/site-data/skills/${item.id}`, { method: "DELETE" });
    await load();
    notify("Skill deleted");
  }

  return (
    <>
      <div className="panel">
        <h3>Skills <button className="btn btn-primary btn-sm" onClick={() => open()}>+ New skill</button></h3>
        {error && !editing && <div className="cms-error">{error}</div>}
        {items.length === 0 ? (
          <p style={{ color: "var(--ad-muted)", fontSize: ".9rem" }}>No skills yet. Create your first one.</p>
        ) : (
          <table>
            <thead><tr><th>Name</th><th>Level</th><th>Proficiency</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td><strong>{item.name}</strong></td>
                  <td>{item.level}</td>
                  <td style={{ width: 160 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ flex: 1, height: 6, background: "var(--ad-line)", borderRadius: 99, overflow: "hidden" }}>
                        <div style={{ width: `${item.pct}%`, height: "100%", background: "var(--ad-accent)", borderRadius: 99 }} />
                      </div>
                      <span style={{ fontSize: ".75rem", color: "var(--ad-muted)", minWidth: 30 }}>{item.pct}%</span>
                    </div>
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
              <div><small>Skills CMS</small><h2>{editing.id ? "Edit skill" : "Create skill"}</h2></div>
              <button className="icon-btn" onClick={() => setEditing(null)}>
                <Icon path='<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>' size={16} stroke={2.2} />
              </button>
            </div>

            <label>Name *</label>
            <input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />

            <div className="cms-field-grid">
              <div>
                <label>Level</label>
                <select value={editing.level} onChange={(e) => setEditing({ ...editing, level: e.target.value })}>
                  {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label>Percentage (0–100)</label>
                <input type="number" min={0} max={100} value={editing.pct} onChange={(e) => setEditing({ ...editing, pct: Math.min(100, Math.max(0, Number(e.target.value) || 0)) })} />
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
