import { NextResponse } from "next/server";
import { readStore, mutate, nextId } from "@/lib/store";
import type { SolutionItem } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const all = new URL(req.url).searchParams.get("all") === "1";
  const store = readStore();
  const items = (store.solutions || []).sort((a, b) => a.order - b.order);
  return NextResponse.json(all ? items : items.filter((s) => s.status === "published"));
}

export async function POST(req: Request) {
  const b = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  if (!String(b.title ?? "").trim()) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }
  const { result } = mutate((s) => {
    if (!s.solutions) s.solutions = [];
    const item: SolutionItem = {
      id: nextId(s),
      title: String(b.title).trim(),
      slug: String(b.slug ?? "").trim() || String(b.title).trim().toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      icon: String(b.icon ?? "").trim(),
      excerpt: String(b.excerpt ?? "").trim(),
      status: b.status === "published" ? "published" : "draft",
      order: s.solutions.length,
    };
    s.solutions.push(item);
    return item;
  });
  return NextResponse.json(result, { status: 201 });
}
