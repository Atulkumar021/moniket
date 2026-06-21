import { NextResponse } from "next/server";
import { mutate } from "@/lib/store";

export const dynamic = "force-dynamic";

type Ctx = { params: { section: string; id: string } };

const SECTION_MAP: Record<string, string> = {
  "faqs": "faqs",
  "site-stats": "siteStats",
  "skills": "skills",
  "process-steps": "processSteps",
  "trust-items": "trustItems",
  "service-cards": "serviceCards",
  "tracks": "tracks",
};

export async function PATCH(req: Request, { params }: Ctx) {
  const key = SECTION_MAP[params.section];
  if (!key) return NextResponse.json({ error: "Unknown section" }, { status: 404 });

  const id = Number(params.id);
  const b = (await req.json().catch(() => ({}))) as Record<string, unknown>;

  const { result } = mutate((store) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const arr = ((store as any)[key] as Record<string, unknown>[]) || [];
    const item = arr.find((x) => x.id === id);
    if (!item) return null;

    // Apply all fields except id
    for (const [field, val] of Object.entries(b)) {
      if (field === "id") continue;
      item[field] = val;
    }
    return item;
  });

  if (!result) return NextResponse.json({ error: "Item not found" }, { status: 404 });
  return NextResponse.json(result);
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const key = SECTION_MAP[params.section];
  if (!key) return NextResponse.json({ error: "Unknown section" }, { status: 404 });

  const id = Number(params.id);

  mutate((store) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (store as any)[key] = (((store as any)[key] as Record<string, unknown>[]) || []).filter(
      (x) => x.id !== id
    );
  });

  return NextResponse.json({ ok: true });
}
