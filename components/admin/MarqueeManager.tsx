"use client";

import { useCallback, useEffect, useState } from "react";
import Icon from "@/components/Icon";
import { MARQUEE_TECH } from "@/lib/data/static";

type Section = { _id: string; type: string; enabled: boolean; data: { items?: string[] } };
const API = process.env.NEXT_PUBLIC_CMS_API_URL || "/api";

export default function MarqueeManager({ token, notify }: { token: string; notify: (message: string) => void }) {
  const [id, setId] = useState("");
  const [items, setItems] = useState<string[]>([]);
  const [enabled, setEnabled] = useState(true);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const request = useCallback(async (path: string, init?: RequestInit) => {
    const res = await fetch(`${API}${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, ...init?.headers },
    });
    if (!res.ok) {
      const body = await res.json().catch(() => null);
      throw new Error(body?.error || body?.message || "Marquee request failed");
    }
    return res.json();
  }, [token]);

  const load = useCallback(async () => {
    try {
      const all = (await request("/sections/all?page=home")) as Section[];
      const marquee = all.find((s) => s.type === "marquee");
      if (marquee) {
        setId(marquee._id);
        setItems(Array.isArray(marquee.data?.items) ? marquee.data.items : []);
        setEnabled(marquee.enabled !== false);
      } else {
        // No marquee section yet — seed the editor with the current site defaults.
        setId("");
        setItems([...MARQUEE_TECH]);
        setEnabled(true);
      }
      setDirty(false);
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to load the marquee");
    }
  }, [request]);

  useEffect(() => { void load(); }, [load]);

  function update(next: string[], nextEnabled = enabled) {
    setItems(next);
    setEnabled(nextEnabled);
    setDirty(true);
  }
  const editItem = (i: number, value: string) => update(items.map((it, idx) => (idx === i ? value : it)));
  const addItem = () => update([...items, ""]);
  const removeItem = (i: number) => update(items.filter((_, idx) => idx !== i));
  function moveItem(i: number, dir: -1 | 1) {
    const target = i + dir;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[i], next[target]] = [next[target], next[i]];
    update(next);
  }

  async function save() {
    setSaving(true);
    setError("");
    const cleaned = items.map((i) => i.trim()).filter(Boolean);
    try {
      const body = JSON.stringify({ page: "home", type: "marquee", name: "Marquee", enabled, data: { items: cleaned } });
      if (id) {
        await request(`/sections/${id}`, { method: "PATCH", body });
      } else {
        const created = (await request("/sections", { method: "POST", body })) as Section;
        setId(created._id);
      }
      setItems(cleaned);
      setDirty(false);
      notify(enabled ? "Marquee saved and visible on the site" : "Marquee saved (hidden from the site)");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save the marquee");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="panel cms-panel">
      <div className="cms-header">
        <div>
          <p className="cms-eyebrow">Homepage</p>
          <h3>Marquee strip</h3>
          <p>The scrolling technology list shown under the hero. Add, edit, reorder or remove items, and toggle whether it appears on the site.</p>
        </div>
        <label className="toggle" title={enabled ? "Hide from website" : "Show on website"}>
          <input type="checkbox" checked={enabled} onChange={() => update(items, !enabled)} />
          <span className="toggle-track" />
          <span className="toggle-thumb" />
        </label>
      </div>

      <div className="mq-status">
        <span className="mq-dot" data-on={enabled} />
        {enabled ? "Visible on the homepage" : "Hidden from the homepage"}
        <span className="mq-count">{items.filter((i) => i.trim()).length} items</span>
      </div>

      {error && <div className="cms-error">{error}</div>}

      {items.length === 0 ? (
        <div className="cms-empty"><strong>No items yet</strong><span>Add your first marquee item below.</span></div>
      ) : (
        <div className="mq-list">
          {items.map((item, i) => (
            <div className="mq-row" key={i}>
              <span className="cms-order">{String(i + 1).padStart(2, "0")}</span>
              <input
                value={item}
                placeholder="e.g. Kubernetes"
                onChange={(e) => editItem(i, e.target.value)}
              />
              <div className="act">
                <button className="icon-btn" onClick={() => moveItem(i, -1)} title="Move up" disabled={i === 0}>
                  <Icon path='<path d="m18 15-6-6-6 6"/>' size={15} stroke={2.2} />
                </button>
                <button className="icon-btn" onClick={() => moveItem(i, 1)} title="Move down" disabled={i === items.length - 1}>
                  <Icon path='<path d="m6 9 6 6 6-6"/>' size={15} stroke={2.2} />
                </button>
                <button className="icon-btn del" onClick={() => removeItem(i)} title="Delete">
                  <Icon path='<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>' size={15} stroke={2.2} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mq-actions">
        <button className="btn btn-soft btn-sm" onClick={addItem}>
          <Icon path='<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>' size={15} stroke={2.4} />
          Add item
        </button>
        <button className="btn btn-primary" onClick={save} disabled={!dirty || saving}>
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>
    </div>
  );
}
