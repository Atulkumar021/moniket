import { NextResponse } from "next/server";
import { readStore, mutate, nextId } from "@/lib/store";
import type { Article, Block } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(readStore().articles.filter((a) => a.type === "tutorial"));
}

// POST /api/tutorials — create a tutorial in the flat-file store.
export async function POST(req: Request) {
  const b = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  if (!String(b.title ?? "").trim()) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }
  const { result } = mutate((s) => {
    const article: Article = {
      id: nextId(s),
      type: "tutorial",
      title: String(b.title).trim(),
      category: String(b.category ?? "General").trim() || "General",
      domain: String(b.domain ?? "DevOps").trim() || "DevOps",
      status: b.status === "published" ? "published" : "draft",
      views: 0,
      date: new Date().toISOString().slice(0, 10),
      read: Number(b.read) || 4,
      excerpt: String(b.excerpt ?? "").trim(),
      difficulty: b.difficulty ? String(b.difficulty) : "Beginner",
      tools: Array.isArray(b.tools) ? (b.tools as unknown[]).map(String).filter(Boolean) : [],
      body: Array.isArray(b.body) ? (b.body as Block[]) : [],
    };
    s.articles.unshift(article);
    return article;
  });
  return NextResponse.json(result, { status: 201 });
}
