import { NextResponse } from "next/server";
import { readStore, mutate, nextId } from "@/lib/store";
import type { Article, Block } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const service = url.searchParams.get("service") || "";
  const all = url.searchParams.get("all") === "1";
  const articles = readStore().articles.filter(
    (a) => a.type === "service" && (service ? a.domain === service : true)
  );
  return NextResponse.json(all ? articles : articles.filter((a) => a.status === "published"));
}

export async function POST(req: Request) {
  const b = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  if (!String(b.title ?? "").trim()) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }
  const { result } = mutate((s) => {
    const article: Article = {
      id: nextId(s),
      type: "service",
      title: String(b.title).trim(),
      category: String(b.category ?? "General").trim() || "General",
      domain: String(b.domain ?? "").trim(),
      status: b.status === "published" ? "published" : "draft",
      views: 0,
      date: new Date().toISOString().slice(0, 10),
      read: Number(b.read) || 5,
      excerpt: String(b.excerpt ?? "").trim(),
      tools: Array.isArray(b.tools) ? (b.tools as unknown[]).map(String).filter(Boolean) : [],
      body: Array.isArray(b.body) ? (b.body as Block[]) : [],
    };
    s.articles.unshift(article);
    return article;
  });
  return NextResponse.json(result, { status: 201 });
}
