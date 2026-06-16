import { NextResponse } from "next/server";
import { mutate } from "@/lib/store";
import type { LeadStatus } from "@/lib/types";

export const dynamic = "force-dynamic";

type Ctx = { params: { id: string } };

const STATUSES: LeadStatus[] = ["new", "contacted", "qualified", "won", "lost"];

export async function PATCH(req: Request, { params }: Ctx) {
  const id = Number(params.id);
  const b = await req.json().catch(() => ({}) as Record<string, unknown>);
  const { result } = mutate((s) => {
    const lead = s.leads.find((l) => l.id === id);
    if (lead && typeof b.status === "string" && STATUSES.includes(b.status as LeadStatus)) {
      lead.status = b.status as LeadStatus;
    }
    return lead ?? null;
  });
  if (!result) return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  return NextResponse.json(result);
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const id = Number(params.id);
  mutate((s) => {
    s.leads = s.leads.filter((l) => l.id !== id);
  });
  return NextResponse.json({ ok: true });
}
