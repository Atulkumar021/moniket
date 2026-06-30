import { NextResponse } from "next/server";
import { mutate } from "@/lib/store";

export const dynamic = "force-dynamic";

type Ctx = { params: { id: string } };

export async function PATCH(req: Request, { params }: Ctx) {
  const id = Number(params.id);
  const b = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const { result } = mutate((s) => {
    if (!s.solutions) s.solutions = [];
    const item = s.solutions.find((x) => x.id === id);
    if (!item) return null;
    if (b.title !== undefined) item.title = String(b.title).trim();
    if (b.slug !== undefined) item.slug = String(b.slug).trim();
    if (b.icon !== undefined) item.icon = String(b.icon).trim();
    if (b.excerpt !== undefined) item.excerpt = String(b.excerpt).trim();
    if (b.status !== undefined) item.status = b.status === "published" ? "published" : "draft";
    if (b.order !== undefined) item.order = Number(b.order);
    return item;
  });
  if (!result) return NextResponse.json({ error: "Solution not found" }, { status: 404 });
  return NextResponse.json(result);
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const id = Number(params.id);
  mutate((s) => {
    if (!s.solutions) s.solutions = [];
    s.solutions = s.solutions.filter((x) => x.id !== id);
  });
  return NextResponse.json({ ok: true });
}
