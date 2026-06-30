import { NextResponse } from "next/server";
import { readStore, mutate, nextId } from "@/lib/store";
import type { ToolItem } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const all = new URL(req.url).searchParams.get("all") === "1";
  const store = readStore();
  const tools = store.tools || [];
  return NextResponse.json(all ? tools : tools.filter((t) => t.status === "published"));
}

export async function POST(req: Request) {
  const b = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  if (!String(b.name ?? "").trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  const { result } = mutate((s) => {
    if (!s.tools) s.tools = [];
    const tool: ToolItem = {
      id: nextId(s),
      name: String(b.name).trim(),
      category: String(b.category ?? "Infrastructure").trim() || "Infrastructure",
      license: String(b.license ?? "Open Source").trim() || "Open Source",
      description: String(b.description ?? "").trim(),
      link: b.link ? String(b.link).trim() : undefined,
      status: b.status === "published" ? "published" : "draft",
    };
    s.tools.unshift(tool);
    return tool;
  });
  return NextResponse.json(result, { status: 201 });
}
