import { route, json } from "@/lib/server/http";
import { requireEdit } from "@/lib/server/auth";
import { Page } from "@/lib/server/models/Page";

export const dynamic = "force-dynamic";

type Ctx = { params: { id: string } };

// DELETE /api/pages/:id  (edit)
export const DELETE = route(async (req: Request, { params }: Ctx) => {
  await requireEdit(req);
  await Page.findByIdAndDelete(params.id);
  return json({ ok: true });
});
