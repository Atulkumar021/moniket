import { route, json, searchParams } from "@/lib/server/http";
import { requireEdit } from "@/lib/server/auth";
import { BlogPost } from "@/lib/server/models/BlogPost";

export const dynamic = "force-dynamic";

// GET /api/blog/admin  (edit — all statuses)
export const GET = route(async (req) => {
  await requireEdit(req);
  const sp = searchParams(req);
  const filter: Record<string, unknown> = {};
  const status = sp.get("status");
  const category = sp.get("category");
  const tag = sp.get("tag");
  const q = sp.get("q");
  if (status) filter.status = status;
  if (category) filter.category = category;
  if (tag) filter.tags = tag;
  if (q) filter.$text = { $search: q };

  const page = Number(sp.get("page")) || 1;
  const lim = Math.min(Number(sp.get("limit")) || 50, 100);
  const skip = (Math.max(page, 1) - 1) * lim;
  const [items, total] = await Promise.all([
    BlogPost.find(filter).sort({ featured: -1, publishedAt: -1, createdAt: -1 }).skip(skip).limit(lim),
    BlogPost.countDocuments(filter),
  ]);
  return json({ items, total, page, pages: Math.ceil(total / lim) });
});
