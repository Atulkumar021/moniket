import { json } from "@/lib/server/http";
import { isDBConnected } from "@/lib/server/db";

export const dynamic = "force-dynamic";

export function GET() {
  return json({ ok: true, db: isDBConnected(), ts: Date.now() });
}
