import { route, readJson, json, searchParams } from "@/lib/server/http";
import { requireEdit } from "@/lib/server/auth";
import { Section } from "@/lib/server/models/Section";

export const dynamic = "force-dynamic";

// GET /api/sections?page=home  (public — enabled only, ordered)
export const GET = route(async (req) => {
  const page = searchParams(req).get("page") || "home";
  const sections = await Section.find({ page, enabled: true }).sort({ order: 1 });
  return json(sections);
});

// POST /api/sections  (edit)
export const POST = route(async (req) => {
  await requireEdit(req);
  const { page = "home", type, name = "", data = {}, enabled = true } = await readJson(req);
  const count = await Section.countDocuments({ page });
  const section = await Section.create({ page, type, name, data, enabled, order: count });
  return json(section, 201);
});
