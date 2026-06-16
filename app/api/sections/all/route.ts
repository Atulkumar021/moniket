import { route, json, searchParams } from "@/lib/server/http";
import { requireEdit } from "@/lib/server/auth";
import { Section } from "@/lib/server/models/Section";

export const dynamic = "force-dynamic";

// GET /api/sections/all?page=home  (edit — everything, ordered)
export const GET = route(async (req) => {
  await requireEdit(req);
  const page = searchParams(req).get("page") || "home";
  const sections = await Section.find({ page }).sort({ order: 1 });
  return json(sections);
});
