import { route, readJson, json, searchParams, HttpError } from "@/lib/server/http";
import { requireEdit } from "@/lib/server/auth";
import { BlogPost } from "@/lib/server/models/BlogPost";
import { calcReadingTime, uniqueSlug } from "@/lib/server/blog";

export const dynamic = "force-dynamic";

// GET /api/blog  (public — defaults to published only)
export const GET = route(async (req) => {
  const sp = searchParams(req);
  const status = sp.get("status") || "published";
  const filter: Record<string, unknown> = { status };
  const category = sp.get("category");
  const tag = sp.get("tag");
  const q = sp.get("q");
  const featured = sp.get("featured");
  if (category) filter.category = category;
  if (tag) filter.tags = tag;
  if (featured) filter.featured = featured === "true";
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

// POST /api/blog  (edit)
export const POST = route(async (req) => {
  await requireEdit(req);
  const b = await readJson(req);
  if (!b.title) throw new HttpError(400, "title is required");
  const slug = await uniqueSlug(String(b.slug || b.title));
  const post = await BlogPost.create({
    ...b,
    slug,
    readingTime: b.readingTime || calcReadingTime(b.content as never, String(b.excerpt || "")),
    publishedAt: b.status === "published" ? new Date() : undefined,
  });
  return json(post, 201);
});
