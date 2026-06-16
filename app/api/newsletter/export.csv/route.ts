import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/server/db";
import { errorResponse } from "@/lib/server/http";
import { requireEdit } from "@/lib/server/auth";
import { Subscriber } from "@/lib/server/models/Subscriber";

export const dynamic = "force-dynamic";

// GET /api/newsletter/export.csv  (edit)
export async function GET(req: Request) {
  try {
    await connectToDatabase();
    await requireEdit(req);
    const subs = await Subscriber.find().sort({ createdAt: -1 });
    const rows: string[][] = [["email", "source", "subscribed_at"]];
    for (const s of subs) rows.push([s.email, s.source, s.createdAt.toISOString()]);
    const csv = rows
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": 'attachment; filename="subscribers.csv"',
      },
    });
  } catch (err) {
    return errorResponse(err);
  }
}
