import { NextResponse } from "next/server";
import { mutate } from "@/lib/store";

export const dynamic = "force-dynamic";

type Ctx = { params: { id: string } };

export async function GET(_req: Request, { params }: Ctx) {
  const id = Number(params.id);
  const store = (await import("@/lib/store")).readStore();
  const tool = (store.tools || []).find((t) => t.id === id);
  if (!tool) return NextResponse.json({ error: "Tool not found" }, { status: 404 });
  return NextResponse.json(tool);
}

export async function PATCH(req: Request, { params }: Ctx) {
  const id = Number(params.id);
  const b = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const { result } = mutate((s) => {
    if (!s.tools) s.tools = [];
    const t = s.tools.find((x) => x.id === id);
    if (!t) return null;
    if (b.name !== undefined) t.name = String(b.name).trim();
    if (b.category !== undefined) t.category = String(b.category).trim() || "Infrastructure";
    if (b.license !== undefined) t.license = String(b.license).trim();
    if (b.description !== undefined) t.description = String(b.description).trim();
    if (b.link !== undefined) t.link = b.link ? String(b.link).trim() : undefined;
    if (b.status !== undefined) t.status = b.status === "published" ? "published" : "draft";
    return t;
  });
  if (!result) return NextResponse.json({ error: "Tool not found" }, { status: 404 });
  return NextResponse.json(result);
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const id = Number(params.id);
  mutate((s) => {
    if (!s.tools) s.tools = [];
    s.tools = s.tools.filter((t) => t.id !== id);
  });
  return NextResponse.json({ ok: true });
}
