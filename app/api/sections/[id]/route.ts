import { route, readJson, json, HttpError } from "@/lib/server/http";
import { requireEdit } from "@/lib/server/auth";
import { Section } from "@/lib/server/models/Section";

export const dynamic = "force-dynamic";

type Ctx = { params: { id: string } };

// GET /api/sections/:id  (edit)
export const GET = route(async (req: Request, { params }: Ctx) => {
  await requireEdit(req);
  const section = await Section.findById(params.id);
  if (!section) throw new HttpError(404, "Section not found");
  return json(section);
});

// PATCH /api/sections/:id  (edit)
export const PATCH = route(async (req: Request, { params }: Ctx) => {
  await requireEdit(req);
  const section = await Section.findById(params.id);
  if (!section) throw new HttpError(404, "Section not found");

  const { name, data, enabled, type } = await readJson(req);
  if (name !== undefined) section.name = String(name);
  if (type !== undefined) section.type = type as typeof section.type;
  if (enabled !== undefined) section.enabled = Boolean(enabled);
  if (data !== undefined) {
    section.data = { ...section.data, ...(data as Record<string, unknown>) };
  }
  await section.save();
  return json(section);
});

// DELETE /api/sections/:id  (edit)
export const DELETE = route(async (req: Request, { params }: Ctx) => {
  await requireEdit(req);
  await Section.findByIdAndDelete(params.id);
  return json({ ok: true });
});
