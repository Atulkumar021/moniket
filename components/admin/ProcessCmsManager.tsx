"use client";

import { useCallback, useEffect, useState } from "react";
import Icon from "@/components/Icon";
import type { ProcessStep } from "@/lib/types";

const EMPTY: Omit<ProcessStep, "id" | "order"> = {
  num: "01",
  title: "",
  desc: "",
  icon: "",
};

export default function ProcessCmsManager({ notify }: { notify: (message: string) => void }) {
  const [items, setItems] = useState<ProcessStep[]>([]);
  const [editing, setEditing] = useState<ProcessStep | null>(null);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/site-data/process-steps?all=1");
      if (!res.ok) throw new Error("Unable to load process steps");
      setItems(await res.json());
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to load process steps");
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  function open(item?: ProcessStep) {
    setEditing(item ? { ...item } : { id: 0, order: 0, ...EMPTY });
    setError("");
  }

  async function save() {
    if (!editing?.title.trim()) { setError("Title is required."); return; }
    try {
      const isNew = !editing.id;
      const res = await fetch(
        isNew ? "/api/site-data/process-steps" : `/api/site-data/process-steps/${editing.id}`,
        {
          method: isNew ? "POST" : "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            num: editing.num,
            title: editing.title,
            desc: editing.desc,
            icon: editing.icon,
          }),
        }
      );
      if (!res.ok) throw new Error("Could not save step");
      setEditing(null);
      await load();
      notify(isNew ? "Process step created" : "Process step updated");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save step");
    }
  }

  async function remove(item: ProcessStep) {
    if (!window.confirm(`Delete step "${item.num} ${item.title}"?`)) return;
    await fetch(`/api/site-data/process-steps/${item.id}`, { method: "DELETE" });
    await load();
    notify("Process step deleted");
  }

  return (
    <>
      <div className="panel">
        <h3>Process Steps <button className="btn btn-primary btn-sm" onClick={() => open()}>+ New step</button></h3>
        {error && !editing && <div className="cms-error">{error}</div>}
        {items.length === 0 ? (
          <p style={{ color: "var(--ad-muted)", fontSize: ".9rem" }}>No steps yet. Create your first one.</p>
        ) : (
          <table>
            <thead><tr><th>Step</th><th>Title</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td><strong style={{ fontFamily: "var(--font-code)", fontSize: ".85rem" }}>{item.num}</strong></td>
                  <td>{item.title}</td>
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
              <div><small>Process CMS</small><h2>{editing.id ? "Edit step" : "Create step"}</h2></div>
              <button className="icon-btn" onClick={() => setEditing(null)}>
                <Icon path='<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>' size={16} stroke={2.2} />
              </button>
            </div>

            <div className="cms-field-grid">
              <div>
                <label>Step number (e.g. &quot;01&quot;)</label>
                <input value={editing.num} onChange={(e) => setEditing({ ...editing, num: e.target.value })} />
              </div>
              <div>
                <label>Title *</label>
                <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
              </div>
            </div>

            <label>Description</label>
            <textarea rows={4} value={editing.desc} onChange={(e) => setEditing({ ...editing, desc: e.target.value })} />

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
