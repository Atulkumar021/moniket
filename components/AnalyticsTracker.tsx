"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function generateSessionId() {
  // crypto.randomUUID is only available in secure contexts (HTTPS/localhost),
  // so fall back when the app is served over plain HTTP (e.g. a LAN IP).
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const api = process.env.NEXT_PUBLIC_CMS_API_URL || "/api";
    const key = "moniket-session";
    const sessionId = sessionStorage.getItem(key) || generateSessionId();
    sessionStorage.setItem(key, sessionId);
    void fetch(`${api}/analytics/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname, referrer: document.referrer, sessionId }),
      keepalive: true,
    }).catch(() => undefined);
  }, [pathname]);

  return null;
}
