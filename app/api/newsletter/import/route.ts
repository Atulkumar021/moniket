import { route, readJson, json } from "@/lib/server/http";
import { requireEdit } from "@/lib/server/auth";
import { Subscriber } from "@/lib/server/models/Subscriber";

export const dynamic = "force-dynamic";

// POST /api/newsletter/import  (edit) — body: { emails: ["a@b.com", ...] }
export const POST = route(async (req) => {
  await requireEdit(req);
  const body = await readJson(req);
  const emails = Array.isArray(body.emails) ? body.emails : [];
  let added = 0;
  for (const raw of emails) {
    const email = String(raw).toLowerCase().trim();
    if (!email) continue;
    const exists = await Subscriber.findOne({ email });
    if (!exists) {
      await Subscriber.create({ email, source: "import" });
      added++;
    }
  }
  return json({ ok: true, added, total: emails.length });
});
