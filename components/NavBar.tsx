"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CmsNavItem } from "@/lib/cms";
import ThemeToggle from "@/components/ThemeToggle";
import Icon from "@/components/Icon";

type NavBarProps = {
  items: CmsNavItem[];
  showHireMe: boolean;
};

const NAV_ICONS: Record<string, string> = {
  "/":           '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  "/solutions/": '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  "/resources/": '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  "/about/":     '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  "/contact/":   '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
};

export default function NavBar({ items, showHireMe }: NavBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
    setOpenKey(null);
  }, [pathname]);

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  function openDrop(href: string) {
    if (timerRef.current) clearTimeout(timerRef.current);
    setOpenKey(href);
  }
  function closeDrop() {
    timerRef.current = setTimeout(() => setOpenKey(null), 140);
  }
  function toggleDrop(href: string) {
    setOpenKey((k) => (k === href ? null : href));
  }

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href.replace(/\/$/, "") + "/");
  }

  function closeAll() {
    setMobileOpen(false);
    setOpenKey(null);
  }

  return (
    <>
      {/* ── Desktop nav + mobile full-screen overlay ── */}
      <div className={`navlinks${mobileOpen ? " nav-mobile-open" : ""}`}>

        {/* Mobile-only drawer header */}
        <div className="nav-drawer-head">
          <span className="nav-drawer-title">Navigation</span>
          <button className="nav-drawer-close" onClick={closeAll} aria-label="Close menu">
            <Icon path='<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>' size={18} stroke={2.2} />
          </button>
        </div>

        {/* Home */}
        <Link
          href="/"
          className={`nav-plain-link${isActive("/") ? " active" : ""}`}
          onClick={closeAll}
        >
          <span className="nav-item-icon">
            <Icon path={NAV_ICONS["/"]} size={17} stroke={2} />
          </span>
          <span>Home</span>
        </Link>

        {/* CMS items */}
        {items.map((item) => {
          const hasDrop = !!(item.children && item.children.length > 0);
          const active = isActive(item.href);
          const icon = NAV_ICONS[item.href];

          return hasDrop ? (
            <div
              key={item.href}
              className={`nav-drop-wrap${openKey === item.href ? " drop-open" : ""}${active ? " nav-item-active" : ""}`}
              onMouseEnter={() => openDrop(item.href)}
              onMouseLeave={closeDrop}
            >
              <div className="nav-drop-row">
                <Link
                  href={item.href}
                  className={`nav-drop-label${active ? " active" : ""}`}
                  onClick={closeAll}
                >
                  {icon && (
                    <span className="nav-item-icon">
                      <Icon path={icon} size={17} stroke={2} />
                    </span>
                  )}
                  {item.label}
                </Link>
                <button
                  className="nav-drop-btn"
                  onClick={() => toggleDrop(item.href)}
                  aria-expanded={openKey === item.href}
                  aria-label={`Toggle ${item.label} menu`}
                >
                  <svg className="nav-caret" width="11" height="7" viewBox="0 0 11 7" aria-hidden>
                    <path d="M1 1l4.5 4.5L10 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                </button>
              </div>

              <div className="nav-dropdown" role="menu">
                <div className="nav-dropdown-inner">
                  {item.children!.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`nav-dropdown-item${pathname === child.href ? " active" : ""}`}
                      onClick={closeAll}
                      role="menuitem"
                    >
                      <span className="ndi-dot" aria-hidden />
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-plain-link${active ? " active" : ""}`}
              onClick={closeAll}
            >
              {icon && (
                <span className="nav-item-icon">
                  <Icon path={icon} size={17} stroke={2} />
                </span>
              )}
              <span>{item.label}</span>
            </Link>
          );
        })}

        {/* Mobile-only CTA */}
        {showHireMe && (
          <div className="nav-drawer-cta">
            <Link className="btn btn-primary" href="/contact" onClick={closeAll} style={{ width: "100%", justifyContent: "center" }}>
              Get in touch →
            </Link>
          </div>
        )}
      </div>

      {/* ── Right side: theme toggle + hire me + burger ── */}
      <div className="nav-right">
        <ThemeToggle />
        {showHireMe && (
          <Link className="btn btn-primary btn-sm nav-hireme-desktop" href="/contact">
            Hire Me
          </Link>
        )}
        <button
          className={`nav-burger${mobileOpen ? " is-open" : ""}`}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => { setMobileOpen((o) => !o); if (mobileOpen) setOpenKey(null); }}
        >
          <span /><span /><span />
        </button>
      </div>
    </>
  );
}
