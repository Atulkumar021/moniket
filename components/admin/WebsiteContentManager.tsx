"use client";

import { useCallback, useEffect, useState } from "react";
import Icon from "@/components/Icon";

type Section = {
  _id: string;
  page: string;
  type: string;
  name: string;
  order: number;
  enabled: boolean;
  data: Record<string, unknown>;
};

const TYPES = ["hero", "marquee", "services", "knowledgeHub", "toolbox", "about", "process", "statistics", "footer"];
const API = process.env.NEXT_PUBLIC_CMS_API_URL || "/api";
const TYPE_LABELS: Record<string, string> = {
  hero: "Hero",
  marquee: "Marquee",
  services: "Services",
  knowledgeHub: "Knowledge Hub",
  toolbox: "Open-Source Toolbox",
  about: "About Me",
  process: "How I Work",
  statistics: "Statistics",
  footer: "Footer",
};
const sectionLabel = (type: string) => TYPE_LABELS[type] || type;

// Toggling a section's visibility also shows/hides its matching header nav link.
// Section types without an entry here only affect the homepage, not the navbar.
const SECTION_NAV_HREF: Record<string, string> = {
  services: "/services",
  knowledgeHub: "/tracks",
  toolbox: "/toolbox",
  about: "/about",
  contact: "/contact",
};

export default function WebsiteContentManager({ token, notify }: { token: string; notify: (message: string) => void }) {
  const [sections, setSections] = useState<Section[]>([]);
  const [editing, setEditing] = useState<Section | null>(null);
  const [json, setJson] = useState("{}");
  const [error, setError] = useState("");

  const request = useCallback(async (path: string, init?: RequestInit) => {
    const response = await fetch(`${API}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...init?.headers,
      },
    });
    if (!response.ok) {
      const body = await response.json().catch(() => null);
      throw new Error(body?.error || body?.message || "CMS request failed");
    }
    return response.json();
  }, [token]);

  const load = useCallback(async () => {
    try {
      setSections(await request("/sections/all?page=home"));
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to load CMS sections");
    }
  }, [request]);

  useEffect(() => {
    void load();
  }, [load]);

  function open(section?: Section) {
    const next = section ?? {
      _id: "",
      page: "home",
      type: "hero",
      name: "New section",
      order: sections.length,
      enabled: false,
      data: {},
    };
    setEditing(next);
    setJson(JSON.stringify(next.data, null, 2));
    setError("");
  }

  async function save(enabled = editing?.enabled ?? false) {
    if (!editing) return;
    try {
      const data = JSON.parse(json) as Record<string, unknown>;
      const body = JSON.stringify({ page: "home", type: editing.type, name: editing.name, enabled, data });
      await request(editing._id ? `/sections/${editing._id}` : "/sections", {
        method: editing._id ? "PATCH" : "POST",
        body,
      });
      setEditing(null);
      await load();
      notify(enabled ? "Section published to the website" : "Section saved as draft");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save section");
    }
  }

  async function remove(section: Section) {
    if (!window.confirm(`Delete ${section.name}?`)) return;
    await request(`/sections/${section._id}`, { method: "DELETE" });
    await load();
    notify("Section deleted");
  }

  // Keep the matching header nav link in sync with the section's visibility.
  async function syncNavLink(type: string, enabled: boolean) {
    const href = SECTION_NAV_HREF[type];
    if (!href) return;
    try {
      const menu = await request("/nav/main");
      const items = (menu.items || []) as { href: string; enabled?: boolean }[];
      let changed = false;
      const updated = items.map((item) => {
        if (item.href !== href) return item;
        changed = true;
        return { ...item, enabled };
      });
      if (changed) await request("/nav/main", { method: "PUT", body: JSON.stringify({ items: updated }) });
    } catch {
      // Nav sync is best-effort; the section toggle itself already succeeded.
    }
  }

  async function quickToggle(section: Section) {
    const next = !section.enabled;
    setSections(sections.map((s) => s._id === section._id ? { ...s, enabled: next } : s));
    try {
      await request(`/sections/${section._id}`, { method: "PATCH", body: JSON.stringify({ enabled: next }) });
      await syncNavLink(section.type, next);
      notify(next ? `"${section.name}" is now visible on the site` : `"${section.name}" is now hidden from the site`);
    } catch {
      await load();
    }
  }

  async function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= sections.length) return;
    const next = [...sections];
    [next[index], next[target]] = [next[target], next[index]];
    setSections(next);
    await request("/sections/reorder", { method: "PUT", body: JSON.stringify({ ids: next.map((item) => item._id) }) });
    notify("Website section order updated");
  }

  return (
    <>
      <div className="panel cms-panel">
        <div className="cms-header">
          <div className="cms-hdr-left">
            <div className="cms-hdr-icon"><Icon path='<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 9v11"/>' size={20} stroke={1.9} /></div>
            <div>
              <small className="cms-eyebrow">Homepage builder</small>
              <h3>Website Content</h3>
              <p>Toggle sections on or off, reorder them, or edit their content for the live homepage.</p>
            </div>
          </div>
          <button className="btn btn-soft btn-sm" onClick={() => open()}>+ Add section</button>
        </div>

        {error && <div className="cms-error">{error}</div>}

        <div className="cms-section-list">
          {sections.length === 0 && (
            <div className="cms-empty">
              <strong>No homepage sections yet</strong>
              <span>Run the CMS seed script to add the default homepage sections.</span>
            </div>
          )}

          {sections.map((section, index) => (
            <div className="cms-section-row" key={section._id}>
              <div className="cms-section-main">
                <span className="cms-order">{String(index + 1).padStart(2, "0")}</span>
                <div className="cms-section-icon">
                  <Icon path='<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h10M7 12h6M7 16h8"/>' size={18} stroke={1.8} />
                </div>
                <div>
                  <strong>{section.name || sectionLabel(section.type)}</strong>
                  <small>{sectionLabel(section.type)} module - {Object.keys(section.data || {}).length} fields</small>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: ".76rem", color: section.enabled ? "var(--ok)" : "var(--muted)", fontWeight: 600 }}>
                  {section.enabled ? "Visible" : "Hidden"}
                </span>
                <label className="toggle" title={section.enabled ? "Hide from website" : "Show on website"}>
                  <input type="checkbox" checked={section.enabled} onChange={() => quickToggle(section)} />
                  <span className="toggle-track" />
                  <span className="toggle-thumb" />
                </label>
              </div>

              <div className="act">
                <button className="icon-btn" onClick={() => move(index, -1)} title="Move up" disabled={index === 0}>
                  <Icon path='<path d="m18 15-6-6-6 6"/>' size={15} stroke={2.2} />
                </button>
                <button className="icon-btn" onClick={() => move(index, 1)} title="Move down" disabled={index === sections.length - 1}>
                  <Icon path='<path d="m6 9 6 6 6-6"/>' size={15} stroke={2.2} />
                </button>
                <button className="btn btn-soft btn-sm" onClick={() => open(section)}>Edit</button>
                <button className="icon-btn del" onClick={() => remove(section)} title="Delete">
                  <Icon path='<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>' size={15} stroke={2.2} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editing && (
        <div className="cms-editor-bg" onClick={(event) => event.target === event.currentTarget && setEditing(null)}>
          <aside className="cms-editor">
            <div className="cms-editor-head">
              <div><small>Website editor</small><h2>{editing._id ? "Edit section" : "Create section"}</h2></div>
              <button className="icon-btn" onClick={() => setEditing(null)}>
                <Icon path='<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>' size={16} stroke={2.2} />
              </button>
            </div>
            <label>Section name</label>
            <input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
            <label>Module</label>
            <select value={editing.type} onChange={(e) => setEditing({ ...editing, type: e.target.value })}>
              {TYPES.map((type) => <option key={type} value={type}>{sectionLabel(type)}</option>)}
            </select>
            <label>Content fields</label>
            <textarea className="cms-json" value={json} onChange={(e) => setJson(e.target.value)} spellCheck={false} />
            {error && <div className="cms-error">{error}</div>}
            <div className="cms-editor-actions">
              <button className="btn btn-soft" onClick={() => save(false)}>Save draft</button>
              <button className="btn btn-primary" onClick={() => save(true)}>Publish</button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
