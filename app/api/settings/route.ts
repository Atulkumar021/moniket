import { NextResponse } from "next/server";
import { readStore, mutate } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(readStore().settings);
}

export async function PUT(req: Request) {
  const b = await req.json().catch(() => ({}) as Record<string, unknown>);
  const { result } = mutate((s) => {
    if (typeof b.siteTitle === "string") s.settings.siteTitle = b.siteTitle;
    if (typeof b.tagline === "string") s.settings.tagline = b.tagline;
    if (typeof b.email === "string") s.settings.email = b.email;
    if (typeof b.hireMe === "boolean") s.settings.hireMe = b.hireMe;
    return s.settings;
  });
  return NextResponse.json(result);
}
