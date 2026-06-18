"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import type { CmsNavItem } from "@/lib/cms";
import ThemeToggle from "@/components/ThemeToggle";

type NavBarProps = {
  items: CmsNavItem[];
  showHireMe: boolean;
};

export default function NavBar({ items, showHireMe }: NavBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  function openDrop(href: string) {
    if (timerRef.current) clearTimeout(timerRef.current);
    setOpenKey(href);
  }
  function closeDrop() {
    timerRef.current = setTimeout(() => setOpenKey(null), 120);
  }

  return (
    <>
      {mobileOpen && (
        <div className="nav-backdrop" onClick={() => setMobileOpen(false)} aria-hidden />
      )}

      <div className={`navlinks ${mobileOpen ? "nav-mobile-open" : ""}`}>
        {items.map((item) => {
          const hasDrop = !!(item.children && item.children.length > 0);
          return hasDrop ? (
            <div
              key={item.href}
              className={`nav-drop-wrap ${openKey === item.href ? "drop-open" : ""}`}
              onMouseEnter={() => openDrop(item.href)}
              onMouseLeave={closeDrop}
            >
              <Link href={item.href} className="nav-drop-trigger" onClick={() => setMobileOpen(false)}>
                {item.label}
                <svg className="nav-caret" width="10" height="6" viewBox="0 0 10 6" aria-hidden>
                  <path d="M0 0l5 6 5-6z" fill="currentColor" />
                </svg>
              </Link>
              <div className="nav-dropdown">
                {item.children!.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="nav-dropdown-item"
                    onClick={() => { setMobileOpen(false); setOpenKey(null); }}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="nav-right">
        <ThemeToggle />
        {showHireMe && (
          <Link className="btn btn-primary btn-sm" href="/contact">
            Hire Me
          </Link>
        )}
        <button
          className="nav-burger"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((o) => !o)}
        >
          <span className={mobileOpen ? "open" : ""} />
          <span className={mobileOpen ? "open" : ""} />
          <span className={mobileOpen ? "open" : ""} />
        </button>
      </div>
    </>
  );
}
