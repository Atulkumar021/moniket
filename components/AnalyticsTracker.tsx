"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const api = process.env.NEXT_PUBLIC_CMS_API_URL || "/api";
    const key = "moniket-session";
    const sessionId = sessionStorage.getItem(key) || crypto.randomUUID();
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
