import { route, readJson, json, HttpError } from "@/lib/server/http";
import { requireEdit } from "@/lib/server/auth";
import { Page } from "@/lib/server/models/Page";

export const dynamic = "force-dynamic";

// GET /api/pages  (edit) — all SEO records
export const GET = route(async (req) => {
  await requireEdit(req);
  return json(await Page.find().sort({ path: 1 }));
});

// PUT /api/pages  (edit) — upsert by path
export const PUT = route(async (req) => {
  await requireEdit(req);
  const body = await readJson(req);
  const path = body.path;
  if (!path) throw new HttpError(400, "path is required");
  const allowed = ["title", "metaTitle", "metaDescription", "keywords", "canonical", "ogImage", "schema", "noindex"];
  const update: Record<string, unknown> = {};
  for (const f of allowed) if (body[f] !== undefined) update[f] = body[f];
  const page = await Page.findOneAndUpdate({ path }, { path, ...update }, { new: true, upsert: true });
  return json(page);
});
