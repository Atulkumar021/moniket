import { route, readJson, json, HttpError } from "@/lib/server/http";
import { requireEdit } from "@/lib/server/auth";
import { Subscriber } from "@/lib/server/models/Subscriber";

export const dynamic = "force-dynamic";

// GET /api/newsletter  (edit)
export const GET = route(async (req) => {
  await requireEdit(req);
  return json(await Subscriber.find().sort({ createdAt: -1 }));
});

// POST /api/newsletter  (public — subscribe)
export const POST = route(async (req) => {
  const body = await readJson(req);
  const email = String(body.email || "").toLowerCase().trim();
  if (!email) throw new HttpError(400, "email is required");
  const existing = await Subscriber.findOne({ email });
  if (existing) return json({ ok: true, added: false });
  await Subscriber.create({ email, source: body.source || "website" });
  return json({ ok: true, added: true }, 201);
});
