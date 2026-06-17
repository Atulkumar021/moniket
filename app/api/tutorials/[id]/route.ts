import { NextResponse } from "next/server";
import { mutate } from "@/lib/store";
import type { Block, PublishStatus } from "@/lib/types";

export const dynamic = "force-dynamic";

type Ctx = { params: { id: string } };

// PATCH /api/tutorials/:id — update a tutorial in the flat-file store.
export async function PATCH(req: Request, { params }: Ctx) {
  const id = Number(params.id);
  const b = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const { result } = mutate((s) => {
    const a = s.articles.find((x) => x.type === "tutorial" && x.id === id);
    if (!a) return null;
    if (b.title !== undefined) a.title = String(b.title).trim();
    if (b.category !== undefined) a.category = String(b.category).trim() || "General";
    if (b.domain !== undefined) a.domain = String(b.domain).trim() || "DevOps";
    if (b.difficulty !== undefined) a.difficulty = String(b.difficulty);
    if (b.excerpt !== undefined) a.excerpt = String(b.excerpt).trim();
    if (b.read !== undefined) a.read = Number(b.read) || a.read;
    if (b.status !== undefined) a.status = (b.status === "published" ? "published" : "draft") as PublishStatus;
    if (b.tools !== undefined) a.tools = Array.isArray(b.tools) ? (b.tools as unknown[]).map(String).filter(Boolean) : [];
    if (b.body !== undefined) a.body = Array.isArray(b.body) ? (b.body as Block[]) : a.body;
    return a;
  });
  if (!result) return NextResponse.json({ error: "Tutorial not found" }, { status: 404 });
  return NextResponse.json(result);
}

// DELETE /api/tutorials/:id
export async function DELETE(_req: Request, { params }: Ctx) {
  const id = Number(params.id);
  mutate((s) => {
    s.articles = s.articles.filter((a) => !(a.type === "tutorial" && a.id === id));
  });
  return NextResponse.json({ ok: true });
}
