import { route, json, HttpError } from "@/lib/server/http";
import { requireEdit } from "@/lib/server/auth";
import { Section } from "@/lib/server/models/Section";

export const dynamic = "force-dynamic";

type Ctx = { params: { id: string } };

// POST /api/sections/:id/duplicate  (edit)
export const POST = route(async (req: Request, { params }: Ctx) => {
  await requireEdit(req);
  const src = await Section.findById(params.id);
  if (!src) throw new HttpError(404, "Section not found");

  const count = await Section.countDocuments({ page: src.page });
  const copy = await Section.create({
    page: src.page,
    type: src.type,
    name: `${src.name || src.type} (copy)`,
    data: src.data,
    enabled: src.enabled,
    order: count,
  });
  return json(copy, 201);
});
