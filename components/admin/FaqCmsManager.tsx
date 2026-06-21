"use client";

import { useCallback, useEffect, useState } from "react";
import Icon from "@/components/Icon";
import type { FaqItem } from "@/lib/types";

const EMPTY: Omit<FaqItem, "id" | "order"> = {
  question: "",
  answer: "",
  status: "published",
};

export default function FaqCmsManager({ notify }: { notify: (message: string) => void }) {
  const [items, setItems] = useState<FaqItem[]>([]);
  const [editing, setEditing] = useState<FaqItem | null>(null);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/site-data/faqs?all=1");
      if (!res.ok) throw new Error("Unable to load FAQs");
      setItems(await res.json());
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to load FAQs");
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  function open(item?: FaqItem) {
    setEditing(item ? { ...item } : { id: 0, order: 0, ...EMPTY });
    setError("");
  }

  async function save() {
    if (!editing?.question.trim()) { setError("Question is required."); return; }
    try {
      const isNew = !editing.id;
      const res = await fetch(
        isNew ? "/api/site-data/faqs" : `/api/site-data/faqs/${editing.id}`,
        {
          method: isNew ? "POST" : "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: editing.question,
            answer: editing.answer,
            status: editing.status,
          }),
        }
      );
      if (!res.ok) throw new Error("Could not save FAQ");
      setEditing(null);
      await load();
      notify(isNew ? "FAQ created" : "FAQ updated");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save FAQ");
    }
  }

  async function remove(item: FaqItem) {
    if (!window.confirm(`Delete "${item.question}"?`)) return;
    await fetch(`/api/site-data/faqs/${item.id}`, { method: "DELETE" });
    await load();
    notify("FAQ deleted");
  }

  async function toggleStatus(item: FaqItem) {
    const next = item.status === "published" ? "draft" : "published";
    setItems((list) => list.map((x) => (x.id === item.id ? { ...x, status: next } : x)));
    try {
      await fetch(`/api/site-data/faqs/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      notify(next === "published" ? "FAQ is now visible" : "FAQ hidden");
    } catch {
      await load();
    }
  }

  return (
    <>
      <div className="panel">
        <h3>FAQs <button className="btn btn-primary btn-sm" onClick={() => open()}>+ New FAQ</button></h3>
        {error && !editing && <div className="cms-error">{error}</div>}
        {items.length === 0 ? (
          <p style={{ color: "var(--ad-muted)", fontSize: ".9rem" }}>No FAQs yet. Create your first one.</p>
        ) : (
          <table>
            <thead><tr><th>Question</th><th>Visible</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td><strong>{item.question.length > 60 ? item.question.slice(0, 60) + "…" : item.question}</strong></td>
                  <td>
                    <div className="tut-vis">
                      <label className="toggle" title={item.status === "published" ? "Hide FAQ" : "Show FAQ"}>
                        <input type="checkbox" checked={item.status === "published"} onChange={() => toggleStatus(item)} />
                        <span className="toggle-track" /><span className="toggle-thumb" />
                      </label>
                      <span data-on={item.status === "published"}>{item.status === "published" ? "Live" : "Hidden"}</span>
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
              <div><small>FAQ CMS</small><h2>{editing.id ? "Edit FAQ" : "Create FAQ"}</h2></div>
              <button className="icon-btn" onClick={() => setEditing(null)}>
                <Icon path='<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>' size={16} stroke={2.2} />
              </button>
            </div>

            <label>Question *</label>
            <input value={editing.question} onChange={(e) => setEditing({ ...editing, question: e.target.value })} />

            <label>Answer</label>
            <textarea rows={5} value={editing.answer} onChange={(e) => setEditing({ ...editing, answer: e.target.value })} />

            <label>Status</label>
            <select value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value as "published" | "draft" })}>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>

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
