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

const API = process.env.NEXT_PUBLIC_CMS_API_URL || "/api";

const PAGE_GROUPS = {
  solutions: [
    { value: "solutions", label: "Solutions Overview" },
    { value: "solutions/cloud-infrastructure", label: "Cloud Infrastructure" },
    { value: "solutions/devops-automation", label: "DevOps Automation" },
    { value: "solutions/security", label: "Security & SecOps" },
    { value: "solutions/networking", label: "Networking" },
    { value: "solutions/monitoring-observability", label: "Monitoring & Observability" },
  ],
  resources: [
    { value: "resources", label: "Resources Overview" },
    { value: "resources/case-studies", label: "Case Studies" },
    { value: "resources/documentation", label: "Documentation" },
    { value: "resources/open-source", label: "Open-Source" },
  ],
};

const SECTION_TYPES = ["hero", "content", "features", "cta", "faq", "custom"];
const TYPE_LABELS: Record<string, string> = {
  hero: "Hero Banner",
  content: "Content Block",
  features: "Features Grid",
  cta: "Call to Action",
  faq: "FAQ",
  custom: "Custom",
};

export default function PageContentManager({
  token,
  notify,
  group,
}: {
  token: string;
  notify: (m: string) => void;
  group: "solutions" | "resources";
}) {
  const pages = PAGE_GROUPS[group];
  const [selectedPage, setSelectedPage] = useState(pages[0].value);
  const [sections, setSections] = useState<Section[]>([]);
  const [editing, setEditing] = useState<Section | null>(null);
  const [json, setJson] = useState("{}");
  const [error, setError] = useState("");

  const request = useCallback(
    async (path: string, init?: RequestInit) => {
      const res = await fetch(`${API}${path}`, {
        ...init,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...init?.headers,
        },
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Request failed");
      }
      return res.json();
    },
    [token]
  );

  const load = useCallback(async () => {
    try {
      setSections(await request(`/sections/all?page=${encodeURIComponent(selectedPage)}`));
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load sections");
    }
  }, [request, selectedPage]);

  useEffect(() => { void load(); }, [load]);

  function open(section?: Section) {
    const next = section ?? {
      _id: "",
      page: selectedPage,
      type: "content",
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
      const body = JSON.stringify({
        page: selectedPage,
        type: editing.type,
        name: editing.name,
        enabled,
        data,
      });
      await request(editing._id ? `/sections/${editing._id}` : "/sections", {
        method: editing._id ? "PATCH" : "POST",
        body,
      });
      setEditing(null);
      await load();
      notify(enabled ? "Section published" : "Section saved as draft");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save section");
    }
  }

  async function remove(section: Section) {
    if (!window.confirm(`Delete "${section.name}"?`)) return;
    await request(`/sections/${section._id}`, { method: "DELETE" });
    await load();
    notify("Section deleted");
  }

  async function quickToggle(section: Section) {
    const next = !section.enabled;
    setSections(sections.map((s) => (s._id === section._id ? { ...s, enabled: next } : s)));
    try {
      await request(`/sections/${section._id}`, {
        method: "PATCH",
        body: JSON.stringify({ enabled: next }),
      });
      notify(next ? `"${section.name}" is now visible` : `"${section.name}" is now hidden`);
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
    await request("/sections/reorder", {
      method: "PUT",
      body: JSON.stringify({ ids: next.map((s) => s._id) }),
    });
    notify("Section order updated");
  }

  const groupTitle = group === "solutions" ? "Solutions" : "Resources";

  return (
    <>
      <div className="panel cms-panel">
        <div className="cms-header">
          <div>
            <p className="cms-eyebrow">{groupTitle} page builder</p>
            <h3>{groupTitle} pages</h3>
            <p>Select a page below, then manage its content sections.</p>
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: ".8rem", fontWeight: 600, color: "var(--ad-ink, var(--ink))", display: "block", marginBottom: 6 }}>
            Page
          </label>
          <select
            value={selectedPage}
            onChange={(e) => setSelectedPage(e.target.value)}
            style={{ minWidth: 280 }}
          >
            {pages.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>

        {error && <div className="cms-error">{error}</div>}

        <div className="cms-section-list">
          {sections.length === 0 && (
            <div className="cms-empty">
              <strong>No sections yet for this page</strong>
              <span>Add the first section using the button below.</span>
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
                  <strong>{section.name || TYPE_LABELS[section.type] || section.type}</strong>
                  <small>{TYPE_LABELS[section.type] || section.type} — {Object.keys(section.data || {}).length} fields</small>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: ".76rem", color: section.enabled ? "var(--ok)" : "var(--muted)", fontWeight: 600 }}>
                  {section.enabled ? "Visible" : "Hidden"}
                </span>
                <label className="toggle" title={section.enabled ? "Hide" : "Show"}>
                  <input type="checkbox" checked={section.enabled} onChange={() => quickToggle(section)} />
                  <span className="toggle-track" />
                  <span className="toggle-thumb" />
                </label>
              </div>
              <div className="act">
                <button className="icon-btn" onClick={() => move(index, -1)} disabled={index === 0} title="Move up">
                  <Icon path='<path d="m18 15-6-6-6 6"/>' size={15} stroke={2.2} />
                </button>
                <button className="icon-btn" onClick={() => move(index, 1)} disabled={index === sections.length - 1} title="Move down">
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

        <div style={{ marginTop: 16 }}>
          <button className="btn btn-soft btn-sm" onClick={() => open()}>
            + Add section
          </button>
        </div>
      </div>

      {editing && (
        <div className="cms-editor-bg" onClick={(e) => e.target === e.currentTarget && setEditing(null)}>
          <aside className="cms-editor">
            <div className="cms-editor-head">
              <div>
                <small>Page editor</small>
                <h2>{editing._id ? "Edit section" : "Add section"}</h2>
              </div>
              <button className="icon-btn" onClick={() => setEditing(null)}>
                <Icon path='<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>' size={16} stroke={2.2} />
              </button>
            </div>
            <label>Section name</label>
            <input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
            <label>Section type</label>
            <select value={editing.type} onChange={(e) => setEditing({ ...editing, type: e.target.value })}>
              {SECTION_TYPES.map((t) => (
                <option key={t} value={t}>{TYPE_LABELS[t] || t}</option>
              ))}
            </select>
            <label>Content (JSON)</label>
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
