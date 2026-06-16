import { route, json, searchParams } from "@/lib/server/http";
import { Page } from "@/lib/server/models/Page";

export const dynamic = "force-dynamic";

// GET /api/pages/seo?path=/  (public) — SEO for a single path
export const GET = route(async (req) => {
  const path = searchParams(req).get("path") || "/";
  const page = await Page.findOne({ path });
  return json(page || { path, title: "", metaTitle: "", metaDescription: "", keywords: [] });
});
