import { route, readJson, json, HttpError } from "@/lib/server/http";
import { requireEdit } from "@/lib/server/auth";
import { Section } from "@/lib/server/models/Section";

export const dynamic = "force-dynamic";

// PUT /api/sections/reorder  body: { ids: [id1, id2, ...] }
export const PUT = route(async (req) => {
  await requireEdit(req);
  const { ids } = await readJson(req);
  if (!Array.isArray(ids)) throw new HttpError(400, "ids array required");
  await Promise.all(ids.map((id, i) => Section.findByIdAndUpdate(id, { order: i })));
  return json({ ok: true });
});
