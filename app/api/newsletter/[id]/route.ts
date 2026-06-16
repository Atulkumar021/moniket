import { route, json } from "@/lib/server/http";
import { requireEdit } from "@/lib/server/auth";
import { Subscriber } from "@/lib/server/models/Subscriber";

export const dynamic = "force-dynamic";

type Ctx = { params: { id: string } };

// DELETE /api/newsletter/:id  (edit)
export const DELETE = route(async (req: Request, { params }: Ctx) => {
  await requireEdit(req);
  await Subscriber.findByIdAndDelete(params.id);
  return json({ ok: true });
});
