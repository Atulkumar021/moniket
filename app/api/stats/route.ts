import { NextResponse } from "next/server";
import { readStore } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const s = readStore();
  const newLeads = s.leads.filter((l) => l.status === "new").length;
  const publishedGuides = s.articles.filter((a) => a.status === "published").length;
  const pipeline = (["new", "contacted", "qualified", "won", "lost"] as const).map((status) => ({
    status,
    count: s.leads.filter((l) => l.status === status).length,
  }));
  return NextResponse.json({
    newLeads,
    publishedGuides,
    totalLeads: s.leads.length,
    subscribers: s.subs.length,
    pipeline,
    visitors: s.analytics.visitors,
    sources: s.analytics.sources,
    topPages: s.analytics.topPages,
    recentLeads: s.leads.slice(0, 4),
  });
}
