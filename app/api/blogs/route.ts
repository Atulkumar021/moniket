import { NextResponse } from "next/server";
import { readStore, mutate, nextId } from "@/lib/store";
import type { Article } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(readStore().articles.filter((a) => a.type === "blog"));
}

export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}) as Record<string, unknown>);
  const title = String(b.title ?? "").trim();
  if (!title) return NextResponse.json({ error: "Title required" }, { status: 400 });
  const { result } = mutate((s) => {
    const domain = String(b.domain ?? "DevOps");
    const excerpt = String(b.excerpt ?? "").trim() || "New post.";
    const article: Article = {
      id: nextId(s),
      type: "blog",
      title,
      domain,
      category: domain,
      excerpt,
      status: b.status === "published" ? "published" : "draft",
      views: 0,
      read: 4,
      date: new Date().toISOString().slice(0, 10),
      body: [{ t: "p", c: excerpt }],
    };
    s.articles.unshift(article);
    return article;
  });
  return NextResponse.json(result, { status: 201 });
}
