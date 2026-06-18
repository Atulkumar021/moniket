"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import WebsiteContentManager from "@/components/admin/WebsiteContentManager";
import MarqueeManager from "@/components/admin/MarqueeManager";
import BlogCmsManager from "@/components/admin/BlogCmsManager";
import TutorialCmsManager from "@/components/admin/TutorialCmsManager";
import PageContentManager from "@/components/admin/PageContentManager";
import type { Lead, Settings, Sub } from "@/lib/types";

type Stats = {
  newLeads: number;
  publishedGuides: number;
  totalLeads: number;
  subscribers: number;
  pipeline: { status: string; count: number }[];
  visitors: number[];
  sources: [string, number][];
  topPages: [string, number][];
  recentLeads: Lead[];
};

type ViewId =
  | "dashboard" | "analytics" | "website" | "marquee" | "navigation" | "blogs" | "tutorials"
  | "leads" | "newsletter" | "settings" | "solutions" | "resources";

type NavItem = { label: string; href: string; order: number; enabled: boolean };

const MENU: [string, [ViewId, string, string][]][] = [
  ["MAIN", [
    ["dashboard", "Dashboard", '<rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/>'],
    ["analytics", "Analytics", '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>'],
  ]],
  ["CONTENT", [
    ["website", "Website Content", '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 9v11"/>'],
    ["marquee", "Marquee", '<path d="M17 2l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>'],
    ["navigation", "Navigation", '<path d="M3 12h18M3 6h18M3 18h18"/>'],
    ["blogs", "Blog Posts", '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>'],
    ["tutorials", "Tutorials", '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>'],
    ["solutions", "Solutions Pages", '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/>'],
    ["resources", "Resources Pages", '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>'],
  ]],
  ["CRM", [
    ["leads", "Hire Me", '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>'],
    ["newsletter", "Newsletter", '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>'],
  ]],
  ["SYSTEM", [
    ["settings", "Settings", '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>'],
  ]],
];

const TITLES: Record<ViewId, string> = {
  dashboard: "Dashboard", analytics: "Analytics", website: "Website Content", marquee: "Marquee",
  navigation: "Navigation", blogs: "Blog Posts", tutorials: "Tutorials",
  leads: "Hire Me", newsletter: "Newsletter", settings: "Settings",
  solutions: "Solutions Pages", resources: "Resources Pages",
};

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const LEAD_STATUSES = ["new", "contacted", "qualified", "won", "lost"] as const;
const fmt = (n: number) => n.toLocaleString("en-US");
const ADMIN_TOKEN_KEY = "moniket.cmsToken";
const ADMIN_EMAIL_KEY = "moniket.cmsEmail";

function KpiCard({ label, value, icon }: { label: string; value: number; icon: string }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0, start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / 1400);
      setV(Math.round((1 - Math.pow(1 - t, 3)) * value));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setV(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return (
    <div className="dpanel kpi">
      <div className="kpi-top">
        <div className="kpi-ic"><Icon path={icon} size={20} stroke={1.9} /></div>
      </div>
      <div className="kpi-num">{fmt(v)}</div>
      <div className="kpi-label">{label}</div>
    </div>
  );
}

export default function AdminApp() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [cmsToken, setCmsToken] = useState("");
  const [email, setEmail] = useState("admin@moniket.tech");
  const [pass, setPass] = useState("changeme123");
  const [view, setView] = useState<ViewId>("dashboard");

  const [leads, setLeads] = useState<Lead[]>([]);
  const [subs, setSubs] = useState<Sub[]>([]);
  const [settings, setSettings] = useState<Settings>({ siteTitle: "", tagline: "", email: "" });
  const [stats, setStats] = useState<Stats | null>(null);

  const [navItems, setNavItems] = useState<NavItem[]>([]);

  const [toastMsg, setToastMsg] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteQ, setPaletteQ] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const goTo = useCallback((id: ViewId) => { setView(id); setMobileNavOpen(false); }, []);

  useEffect(() => {
    const savedToken = window.localStorage.getItem(ADMIN_TOKEN_KEY);
    const savedEmail = window.localStorage.getItem(ADMIN_EMAIL_KEY);
    if (savedEmail) setEmail(savedEmail);
    if (savedToken) { setCmsToken(savedToken); setLoggedIn(true); }
    // Match the admin theme to the site-wide theme so the public-site dark
    // mode (html.dark) and the admin's own theme never disagree.
    const storedTheme = window.localStorage.getItem("theme");
    const isDark = storedTheme ? storedTheme === "dark" : document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
    setAuthChecked(true);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setPaletteOpen((o) => !o); }
      if (e.key === "Escape") setPaletteOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toast = useCallback((m: string) => {
    setToastMsg(m);
    window.clearTimeout((toast as unknown as { _t?: number })._t);
    (toast as unknown as { _t?: number })._t = window.setTimeout(() => setToastMsg(""), 2400);
  }, []);

  const loadAll = useCallback(async () => {
    const [l, s, st, sub] = await Promise.all([
      fetch("/api/leads").then((r) => r.json()),
      fetch("/api/settings").then((r) => r.json()),
      fetch("/api/stats").then((r) => r.json()),
      fetch("/api/subscribers").then((r) => r.json()),
    ]);
    setLeads(l); setSettings(s); setStats(st); setSubs(sub);
  }, []);

  useEffect(() => { if (loggedIn) loadAll(); }, [loggedIn, loadAll]);

  const loadNav = useCallback(async () => {
    const res = await fetch("/api/nav/main");
    const menu = await res.json();
    setNavItems(((menu.items || []) as NavItem[]).sort((a, b) => a.order - b.order));
  }, []);

  useEffect(() => {
    if (view === "navigation" && loggedIn) loadNav();
  }, [view, loggedIn, loadNav]);

  async function toggleNavItem(index: number) {
    const updated = navItems.map((item, i) =>
      i === index ? { ...item, enabled: !(item.enabled !== false) } : item
    );
    setNavItems(updated);
    await fetch("/api/nav/main", {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${cmsToken}` },
      body: JSON.stringify({ items: updated }),
    });
    toast(`Navigation updated`);
  }

  async function doLogin() {
    try {
      const api = process.env.NEXT_PUBLIC_CMS_API_URL || "/api";
      const res = await fetch(`${api}/auth/login`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pass }),
      });
      if (!res.ok) throw new Error();
      const result = await res.json();
      setCmsToken(result.token);
      window.localStorage.setItem(ADMIN_TOKEN_KEY, result.token);
      window.localStorage.setItem(ADMIN_EMAIL_KEY, email);
      setLoggedIn(true);
    } catch {
      toast("MongoDB CMS is unavailable or credentials are invalid");
    }
  }

  async function refreshLeads() {
    const [l, st] = await Promise.all([
      fetch("/api/leads").then((r) => r.json()),
      fetch("/api/stats").then((r) => r.json()),
    ]);
    setLeads(l); setStats(st);
  }
  async function setLeadStatus(id: number, status: string) {
    await fetch(`/api/leads/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    await refreshLeads();
    toast("Status updated");
  }
  async function delLead(id: number) {
    await fetch(`/api/leads/${id}`, { method: "DELETE" });
    await refreshLeads();
    toast("Request deleted");
  }
  async function saveSettings() {
    await fetch("/api/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(settings) });
    toast("Settings saved");
  }

  if (!authChecked) return (
    <div className="admin-bg adm"><div className="login"><div className="login-card">
      <div className="logo">M</div><h2>Loading…</h2>
    </div></div></div>
  );

  if (!loggedIn) return (
    <div className="admin-bg">
      <div className="login">
        <div className="login-aurora" aria-hidden>
          <span className="aurora la1" /><span className="aurora la2" />
        </div>
        <form className="login-card glass" onSubmit={(e) => { e.preventDefault(); doLogin(); }}>
          <div className="logo">M</div>
          <p className="login-eyebrow">Moniket Technologies</p>
          <h2>Welcome back</h2>
          <p className="sub">Sign in to the admin dashboard</p>
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@moniket.tech" />
          <label>Password</label>
          <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="••••••••" />
          <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 18 }}>
            Sign in
          </button>
          <div className="demo-note">Sign in with your MongoDB CMS administrator account.</div>
          <div style={{ textAlign: "center", marginTop: 12 }}>
            <Link href="/" style={{ fontSize: ".82rem", color: "var(--muted)" }}>← Back to website</Link>
          </div>
        </form>
      </div>
    </div>
  );

  const ALL_VIEWS = MENU.flatMap(([, items]) => items);
  const paletteItems = ALL_VIEWS.filter(([, label]) => label.toLowerCase().includes(paletteQ.toLowerCase()));

  return (
    <div className={`admin-bg adm ${theme === "dark" ? "dark" : ""}`}>
      <div className="adm-bg" aria-hidden><span className="aurora da1" /><span className="aurora da2" /></div>
      <div className={`adm-navback ${mobileNavOpen ? "show" : ""}`} onClick={() => setMobileNavOpen(false)} aria-hidden />
      <div className="shell">
        <aside className={`sidebar ${mobileNavOpen ? "open" : ""}`}>
          <Link className="brand" href="/">
            <span className="logo">M</span>
            <span>Moniket<small>Admin</small></span>
          </Link>
          <div>
            {MENU.map(([group, items]) => (
              <div key={group}>
                <div className="nav-group">{group}</div>
                {items.map(([id, label, path]) => (
                  <button key={id} className={`nav-item ${view === id ? "active" : ""}`} onClick={() => goTo(id)}>
                    <Icon path={path} size={18} />
                    {label}
                    {id === "leads" && stats ? <span className="badge">{stats.newLeads}</span> : null}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </aside>

        <div className="main">
          <div className="topbar">
            <button className="adm-burger" aria-label="Open menu" onClick={() => setMobileNavOpen(true)}>
              <Icon path='<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>' size={20} stroke={2} />
            </button>
            <h1>{TITLES[view]}</h1>
            <div className="adm-search" onClick={() => setPaletteOpen(true)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
              </svg>
              Search…
              <span className="kbd">⌘K</span>
            </div>
            <div className="adm-actions">
              <button className="adm-ibtn" title="Toggle theme" onClick={() => setTheme((t) => {
                const next = t === "dark" ? "light" : "dark";
                window.localStorage.setItem("theme", next);
                document.documentElement.classList.toggle("dark", next === "dark");
                return next;
              })}>
                {theme === "dark"
                  ? <Icon path='<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/>' size={18} stroke={1.8} />
                  : <Icon path='<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>' size={18} stroke={1.8} />
                }
              </button>
              <div className="who">
                <span className="av">M</span>
                <div>
                  <div>Manish</div>
                  <div style={{ fontSize: ".7rem", color: "var(--ad-muted)", fontWeight: 500 }}>Administrator</div>
                </div>
              </div>
            </div>
          </div>

          {view === "dashboard"   && renderDashboard()}
          {view === "analytics"   && renderAnalytics()}
          {view === "website"     && <WebsiteContentManager token={cmsToken} notify={toast} />}
          {view === "marquee"     && <MarqueeManager token={cmsToken} notify={toast} />}
          {view === "navigation"  && renderNavigation()}
          {view === "leads"      && renderLeads()}
          {view === "blogs"      && <BlogCmsManager token={cmsToken} notify={toast} />}
          {view === "tutorials"  && <TutorialCmsManager notify={toast} />}
          {view === "solutions"  && <PageContentManager token={cmsToken} notify={toast} group="solutions" />}
          {view === "resources"  && <PageContentManager token={cmsToken} notify={toast} group="resources" />}
          {view === "newsletter" && renderNewsletter()}
          {view === "settings"   && renderSettings()}
        </div>
      </div>

      {paletteOpen && (
        <div className="cmdk-bg" onClick={(e) => e.target === e.currentTarget && setPaletteOpen(false)}>
          <div className="cmdk">
            <div className="cmdk-input">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
              </svg>
              <input autoFocus placeholder="Search views…" value={paletteQ} onChange={(e) => setPaletteQ(e.target.value)} />
              <span className="kbd" style={{ fontFamily: "var(--font-code)", fontSize: ".68rem" }}>ESC</span>
            </div>
            <div className="cmdk-list">
              <div className="cmdk-group">Quick create</div>
              <button className="cmdk-item" onClick={() => { setPaletteOpen(false); setView("blogs"); }}>
                <span className="cmdk-ic"><Icon path='<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>' size={16} stroke={2.2} /></span>
                New blog post
              </button>
              <div className="cmdk-group">Navigate</div>
              {paletteItems.map(([id, label, path]) => (
                <button key={id} className="cmdk-item" onClick={() => { setView(id); setPaletteOpen(false); setPaletteQ(""); }}>
                  <span className="cmdk-ic"><Icon path={path} size={16} stroke={1.8} /></span>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className={`toast ${toastMsg ? "show" : ""}`}>{toastMsg}</div>
    </div>
  );

  // ── helpers ──
  function leadsTable(rows: Lead[]) {
    return (
      <table>
        <thead><tr><th>Name</th><th>Email</th><th>Service</th><th>Status</th><th>Date</th><th /></tr></thead>
        <tbody>
          {rows.map((l) => (
            <tr key={l.id}>
              <td><strong>{l.name}</strong></td>
              <td>{l.email}</td>
              <td>{l.service}</td>
              <td>
                <select value={l.status} onChange={(e) => setLeadStatus(l.id, e.target.value)}
                  style={{ padding: ".25rem .5rem", fontSize: ".78rem", width: "auto", borderRadius: 8 }}>
                  {LEAD_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </td>
              <td className="mono" style={{ fontSize: ".78rem" }}>{l.date}</td>
              <td>
                <button className="icon-btn del" onClick={() => delLead(l.id)} title="Delete">
                  <Icon path='<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>' size={14} stroke={2} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  function hbar(label: React.ReactNode, value: React.ReactNode, pct: number, key?: string) {
    return (
      <div className="hbar" key={key}>
        <div className="top"><span>{label}</span><span>{value}</span></div>
        <div className="htrack"><i style={{ width: `${pct}%` }} /></div>
      </div>
    );
  }

  function statCard(label: string, n: React.ReactNode, path: string) {
    return (
      <div className="stat">
        <div className="ic"><Icon path={path} size={20} /></div>
        <div className="n">{n}</div>
        <div className="l">{label}</div>
      </div>
    );
  }

  // ── views ──
  function renderDashboard() {
    if (!stats) return <div className="dpanel">Loading…</div>;
    const KPIS = [
      { label: "New Hire Me", value: stats.newLeads || 0, icon: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>' },
      { label: "Published Articles", value: stats.publishedGuides || 0, icon: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>' },
      { label: "Total Leads", value: stats.totalLeads || 0, icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>' },
      { label: "Subscribers", value: stats.subscribers || 0, icon: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>' },
    ];
    const QUICK = [
      { label: "Create Post", sub: "Write a new blog post", icon: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4z"/>', onClick: () => setView("blogs") },
      { label: "Website Content", sub: "Edit homepage sections", icon: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 9v11"/>', onClick: () => setView("website") },
      { label: "Newsletter", sub: "Manage subscribers", icon: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>', onClick: () => setView("newsletter") },
      { label: "Add Tutorial", sub: "Step-by-step guide", icon: '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>', onClick: () => setView("tutorials") },
    ];
    return (
      <div className="bento">
        {KPIS.map((k) => <KpiCard key={k.label} {...k} />)}

        <div className="dpanel b-4">
          <div className="dpanel-h"><h3>Quick Actions</h3></div>
          <div className="qact">
            {QUICK.map((q) => (
              <button className="qact-card" key={q.label} onClick={q.onClick}>
                <span className="qact-ic"><Icon path={q.icon} size={20} stroke={1.9} /></span>
                <span>{q.label}<small>{q.sub}</small></span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function renderAnalytics() {
    if (!stats) return <div className="panel">Loading…</div>;
    const max = Math.max(...stats.visitors, 1);
    const smax = Math.max(...stats.sources.map((s) => s[1]), 1);
    const pmax = Math.max(...stats.topPages.map((p) => p[1]), 1);
    return (
      <>
        <div className="stat-grid">
          {statCard("Page views (30d)", fmt(stats.visitors.reduce((a, v) => a + v, 0)), '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>')}
          {statCard("Published articles", fmt(stats.publishedGuides), '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>')}
          {statCard("Hire Me requests", fmt(stats.totalLeads), '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>')}
          {statCard("Subscribers", fmt(stats.subscribers), '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>')}
        </div>
        <div className="row2">
          <div className="panel">
            <h3>Traffic — last 7 days</h3>
            <div className="chart">
              {stats.visitors.map((v, i) => (
                <div className="col" key={i}>
                  <i style={{ height: `${(v / max) * 130}px` }} />
                  <small>{DAYS[i]}</small>
                </div>
              ))}
            </div>
          </div>
          <div className="panel">
            <h3>Traffic sources</h3>
            {stats.sources.map((s) => hbar(s[0], `${s[1]}%`, (s[1] / smax) * 100, s[0]))}
          </div>
        </div>
        <div className="panel">
          <h3>Top pages</h3>
          <table>
            <thead><tr><th>Page</th><th>Views</th><th>Share</th></tr></thead>
            <tbody>
              {stats.topPages.map((p) => (
                <tr key={p[0]}>
                  <td className="mono" style={{ fontSize: ".82rem" }}>{p[0]}</td>
                  <td>{p[1].toLocaleString()}</td>
                  <td style={{ width: "40%" }}><div className="htrack"><i style={{ width: `${(p[1] / pmax) * 100}%` }} /></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }

  function renderLeads() {
    return (
      <div className="panel">
        <h3>All Hire Me Requests</h3>
        {leads.length === 0
          ? <p style={{ color: "var(--muted)", fontSize: ".9rem" }}>No requests yet.</p>
          : leadsTable(leads)
        }
      </div>
    );
  }


  function renderNewsletter() {
    return (
      <div className="panel">
        <h3>Subscribers <span className="mono" style={{ fontSize: ".78rem", color: "var(--muted)" }}>{subs.length}</span></h3>
        {subs.length === 0
          ? <p style={{ color: "var(--muted)", fontSize: ".9rem" }}>No subscribers yet.</p>
          : (
            <table>
              <thead><tr><th>Email</th><th>Subscribed</th></tr></thead>
              <tbody>
                {subs.map((s) => (
                  <tr key={s.email}><td>{s.email}</td><td>{s.date}</td></tr>
                ))}
              </tbody>
            </table>
          )
        }
      </div>
    );
  }

  function renderNavigation() {
    return (
      <div className="panel" style={{ maxWidth: 680 }}>
        <h3>Header Navigation</h3>
        <p style={{ color: "var(--muted)", fontSize: ".88rem", marginBottom: 20 }}>
          Toggle items to instantly show or hide them in the site header. Changes take effect immediately.
        </p>

        {navItems.length === 0 ? (
          <p style={{ color: "var(--muted)", fontSize: ".9rem" }}>
            No nav items found. Seed the database or add items via the CMS.
          </p>
        ) : (
          navItems.map((item, i) => {
            const visible = item.enabled !== false;
            return (
              <div key={`${item.href}-${i}`} className="nav-row">
                <div className="nav-row-info">
                  <div>
                    <span className="nav-row-label">{item.label}</span>
                    <span className="nav-row-href" style={{ marginLeft: 10 }}>{item.href}</span>
                  </div>
                  <span style={{
                    fontSize: ".72rem", fontWeight: 700, padding: ".2rem .55rem",
                    borderRadius: 99, background: visible ? "#EAF8EF" : "#F1F5F9",
                    color: visible ? "#1F9254" : "#64748B", marginLeft: 8,
                  }}>
                    {visible ? "Visible" : "Hidden"}
                  </span>
                </div>
                <label className="toggle" title={visible ? "Hide from header" : "Show in header"}>
                  <input type="checkbox" checked={visible} onChange={() => toggleNavItem(i)} />
                  <span className="toggle-track" />
                  <span className="toggle-thumb" />
                </label>
              </div>
            );
          })
        )}
      </div>
    );
  }

  function renderSettings() {
    return (
      <div className="panel" style={{ maxWidth: 560 }}>
        <h3>Site settings</h3>
        <label style={{ fontSize: ".8rem", fontWeight: 600, color: "var(--ink)" }}>Site title</label>
        <input value={settings.siteTitle} onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })} style={{ margin: ".3rem 0 .9rem" }} />
        <label style={{ fontSize: ".8rem", fontWeight: 600, color: "var(--ink)" }}>Tagline</label>
        <input value={settings.tagline} onChange={(e) => setSettings({ ...settings, tagline: e.target.value })} style={{ margin: ".3rem 0 .9rem" }} />
        <label style={{ fontSize: ".8rem", fontWeight: 600, color: "var(--ink)" }}>Contact email</label>
        <input value={settings.email} onChange={(e) => setSettings({ ...settings, email: e.target.value })} style={{ margin: ".3rem 0 1rem" }} />

        <div className="nav-row" style={{ borderTop: "1px solid var(--ad-line)", borderBottom: "none", marginTop: 4, paddingTop: 16 }}>
          <div className="nav-row-info">
            <div>
              <span className="nav-row-label">&quot;Hire Me&quot; button</span>
              <span className="nav-row-href" style={{ marginLeft: 0, display: "block", marginTop: 2 }}>
                Shows the Hire Me CTA in the website header
              </span>
            </div>
          </div>
          <label className="toggle" title={settings.hireMe !== false ? "Hide from header" : "Show in header"}>
            <input type="checkbox" checked={settings.hireMe !== false} onChange={(e) => setSettings({ ...settings, hireMe: e.target.checked })} />
            <span className="toggle-track" /><span className="toggle-thumb" />
          </label>
        </div>

        <button className="btn btn-primary" style={{ marginTop: 18 }} onClick={saveSettings}>Save changes</button>
      </div>
    );
  }
}
