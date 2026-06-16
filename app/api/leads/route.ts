import { NextResponse } from "next/server";
import { readStore, mutate, nextId } from "@/lib/store";
import type { Lead } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(readStore().leads);
}

export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}) as Record<string, unknown>);
  const { result } = mutate((s) => {
    const lead: Lead = {
      id: nextId(s),
      name: String(b.name ?? "").trim(),
      email: String(b.email ?? "").trim(),
      service: String(b.service ?? "").trim() || "General enquiry",
      status: "new",
      date: new Date().toISOString().slice(0, 10),
    };
    s.leads.unshift(lead);
    return lead;
  });
  return NextResponse.json(result, { status: 201 });
}
