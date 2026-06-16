import { route, readJson, json } from "@/lib/server/http";
import { requireEdit } from "@/lib/server/auth";
import { NavMenu } from "@/lib/server/models/NavMenu";

export const dynamic = "force-dynamic";

type Ctx = { params: { key: string } };

// GET /api/nav/:key  (public) — key defaults to "main"
export const GET = route(async (_req: Request, { params }: Ctx) => {
  const key = params.key || "main";
  let menu = await NavMenu.findOne({ key });
  if (!menu) menu = await NavMenu.create({ key, items: [] });
  return json(menu);
});

// PUT /api/nav/:key  (edit) — replace items (already ordered/nested by client)
export const PUT = route(async (req: Request, { params }: Ctx) => {
  await requireEdit(req);
  const key = params.key || "main";
  const body = await readJson(req);
  const items = Array.isArray(body.items) ? body.items : [];
  const menu = await NavMenu.findOneAndUpdate({ key }, { key, items }, { new: true, upsert: true });
  return json(menu);
});
