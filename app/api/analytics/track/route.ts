import { route, readJson, json } from "@/lib/server/http";
import { PageView } from "@/lib/server/models/PageView";

export const dynamic = "force-dynamic";

// POST /api/analytics/track  (public)
export const POST = route(async (req) => {
  const { path = "/", referrer = "", sessionId = "" } = await readJson(req);
  await PageView.create({
    path,
    referrer,
    sessionId,
    userAgent: req.headers.get("user-agent") || "",
  });
  return json({ ok: true }, 201);
});
