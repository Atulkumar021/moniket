import { NextResponse } from "next/server";
import { readStore, mutate, nextId } from "@/lib/store";
import type {
  FaqItem, SiteStatItem, SkillItem, ProcessStep,
  TrustItem, ServiceCard, TrackItem,
} from "@/lib/types";

export const dynamic = "force-dynamic";

type Ctx = { params: { section: string } };

type SectionKey = "faqs" | "siteStats" | "skills" | "processSteps" | "trustItems" | "serviceCards" | "tracks";

const SECTION_MAP: Record<string, SectionKey> = {
  "faqs": "faqs",
  "site-stats": "siteStats",
  "skills": "skills",
  "process-steps": "processSteps",
  "trust-items": "trustItems",
  "service-cards": "serviceCards",
  "tracks": "tracks",
};

function getKey(section: string): SectionKey | null {
  return SECTION_MAP[section] ?? null;
}

export async function GET(req: Request, { params }: Ctx) {
  const key = getKey(params.section);
  if (!key) return NextResponse.json({ error: "Unknown section" }, { status: 404 });

  const store = readStore();
  const items = (store[key] as unknown[]) || [];

  // For faqs: filter by status=published unless ?all=1
  const url = new URL(req.url);
  const all = url.searchParams.get("all") === "1";
  if (key === "faqs" && !all) {
    return NextResponse.json((items as FaqItem[]).filter((f) => f.status === "published"));
  }

  return NextResponse.json(items);
}

export async function POST(req: Request, { params }: Ctx) {
  const key = getKey(params.section);
  if (!key) return NextResponse.json({ error: "Unknown section" }, { status: 404 });

  const b = (await req.json().catch(() => ({}))) as Record<string, unknown>;

  const { result } = mutate((store) => {
    const arr = ((store[key] as unknown[]) || []) as Record<string, unknown>[];
    const maxOrder = arr.length > 0 ? Math.max(...arr.map((x) => Number(x.order) || 0)) : 0;
    const item: Record<string, unknown> = {
      id: nextId(store),
      order: maxOrder + 1,
      ...Object.fromEntries(
        Object.entries(b).filter(([k]) => k !== "id")
      ),
    };

    // Defaults per section type
    if (key === "faqs") {
      const faq = item as Partial<FaqItem>;
      faq.question = String(b.question ?? "").trim();
      faq.answer = String(b.answer ?? "").trim();
      faq.status = b.status === "published" ? "published" : "draft";
    } else if (key === "siteStats") {
      const stat = item as Partial<SiteStatItem>;
      stat.value = Number(b.value) || 0;
      stat.suffix = String(b.suffix ?? "");
      stat.label = String(b.label ?? "").trim();
      stat.desc = String(b.desc ?? "").trim();
      stat.icon = String(b.icon ?? "");
    } else if (key === "skills") {
      const skill = item as Partial<SkillItem>;
      skill.name = String(b.name ?? "").trim();
      skill.level = String(b.level ?? "Intermediate");
      skill.pct = Math.min(100, Math.max(0, Number(b.pct) || 0));
      skill.icon = String(b.icon ?? "");
    } else if (key === "processSteps") {
      const step = item as Partial<ProcessStep>;
      step.num = String(b.num ?? "01");
      step.title = String(b.title ?? "").trim();
      step.desc = String(b.desc ?? "").trim();
      step.icon = String(b.icon ?? "");
    } else if (key === "trustItems") {
      const trust = item as Partial<TrustItem>;
      trust.title = String(b.title ?? "").trim();
      trust.desc = String(b.desc ?? "").trim();
      trust.icon = String(b.icon ?? "");
    } else if (key === "serviceCards") {
      const card = item as Partial<ServiceCard>;
      card.title = String(b.title ?? "").trim();
      card.desc = String(b.desc ?? "").trim();
      card.icon = String(b.icon ?? "");
    } else if (key === "tracks") {
      const track = item as Partial<TrackItem>;
      track.name = String(b.name ?? "").trim();
      track.desc = String(b.desc ?? "").trim();
      track.guides = Number(b.guides) || 0;
      track.hours = Number(b.hours) || 0;
      track.color = String(b.color ?? "#334155");
      track.tint = String(b.tint ?? "#EEF2F7");
      track.icon = String(b.icon ?? "");
    }

    arr.push(item);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (store as any)[key] = arr;
    return item;
  });

  return NextResponse.json(result, { status: 201 });
}
