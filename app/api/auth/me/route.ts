import { route, json } from "@/lib/server/http";
import { requireAuth } from "@/lib/server/auth";

export const dynamic = "force-dynamic";

// GET /api/auth/me
export const GET = route(async (req) => {
  const user = await requireAuth(req);
  return json(user.toJSON());
});
