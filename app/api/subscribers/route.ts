import { NextResponse } from "next/server";
import { readStore, mutate } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(readStore().subs);
}

export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}) as Record<string, unknown>);
  const email = String(b.email ?? "").trim();
  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });
  const { result } = mutate((s) => {
    if (s.subs.some((x) => x.email === email)) return { added: false };
    s.subs.unshift({ email, date: new Date().toISOString().slice(0, 10) });
    return { added: true };
  });
  return NextResponse.json(result, { status: 201 });
}
