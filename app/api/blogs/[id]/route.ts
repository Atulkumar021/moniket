import { NextResponse } from "next/server";
import { mutate } from "@/lib/store";

export const dynamic = "force-dynamic";

type Ctx = { params: { id: string } };

export async function PATCH(req: Request, { params }: Ctx) {
  const id = Number(params.id);
  const b = await req.json().catch(() => ({}) as Record<string, unknown>);
  const { result } = mutate((s) => {
    const a = s.articles.find((x) => x.id === id && x.type === "blog");
    if (!a) return null;
    if (b.toggle === true) {
      a.status = a.status === "published" ? "draft" : "published";
    } else {
      if (typeof b.title === "string" && b.title.trim()) a.title = b.title.trim();
      if (typeof b.domain === "string") {
        a.domain = b.domain;
        a.category = b.domain;
      }
      if (typeof b.excerpt === "string") a.excerpt = b.excerpt;
      if (b.status === "published" || b.status === "draft") a.status = b.status;
    }
    return a;
  });
  if (!result) return NextResponse.json({ error: "Post not found" }, { status: 404 });
  return NextResponse.json(result);
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const id = Number(params.id);
  mutate((s) => {
    s.articles = s.articles.filter((x) => !(x.id === id && x.type === "blog"));
  });
  return NextResponse.json({ ok: true });
}
