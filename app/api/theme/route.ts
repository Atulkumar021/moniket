import { route, readJson, json } from "@/lib/server/http";
import { requireEdit } from "@/lib/server/auth";
import { Theme } from "@/lib/server/models/Theme";

export const dynamic = "force-dynamic";

async function getOrCreate() {
  let theme = await Theme.findOne({ key: "default" });
  if (!theme) theme = await Theme.create({ key: "default" });
  return theme;
}

// GET /api/theme  (public)
export const GET = route(async () => {
  return json(await getOrCreate());
});

// PUT /api/theme  (edit)
export const PUT = route(async (req) => {
  await requireEdit(req);
  const theme = await getOrCreate();
  const body = await readJson(req);
  const fields = [
    "primary", "secondary", "accent", "ink", "fontFamily", "monoFamily",
    "radius", "shadow", "buttonStyle", "containerWidth", "mode",
  ] as const;
  for (const f of fields) {
    if (body[f] !== undefined) (theme as unknown as Record<string, unknown>)[f] = body[f];
  }
  await theme.save();
  return json(theme);
});
