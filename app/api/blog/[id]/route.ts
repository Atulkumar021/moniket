import { route, readJson, json, HttpError } from "@/lib/server/http";
import { requireEdit } from "@/lib/server/auth";
import { BlogPost } from "@/lib/server/models/BlogPost";
import { calcReadingTime, uniqueSlug } from "@/lib/server/blog";

export const dynamic = "force-dynamic";

type Ctx = { params: { id: string } };

// GET /api/blog/:slug  (public — increments views). The path param is treated
// as a slug here (mirrors the Express `GET /blog/:slug`).
export const GET = route(async (_req: Request, { params }: Ctx) => {
  const post = await BlogPost.findOneAndUpdate(
    { slug: params.id },
    { $inc: { views: 1 } },
    { new: true }
  );
  if (!post) throw new HttpError(404, "Post not found");
  return json(post);
});

// PATCH /api/blog/:id  (edit)
export const PATCH = route(async (req: Request, { params }: Ctx) => {
  await requireEdit(req);
  const post = await BlogPost.findById(params.id);
  if (!post) throw new HttpError(404, "Post not found");

  const b = await readJson(req);
  const editable = [
    "title", "excerpt", "thumbnail", "content", "category", "domain", "tags",
    "seoTitle", "seoDescription", "ogImage", "status", "featured", "author",
  ];
  for (const f of editable) if (b[f] !== undefined) (post as unknown as Record<string, unknown>)[f] = b[f];
  if (b.slug) post.slug = await uniqueSlug(String(b.slug), post._id);
  if (b.content !== undefined || b.excerpt !== undefined) {
    post.readingTime = Number(b.readingTime) || calcReadingTime(post.content, post.excerpt);
  }
  if (b.status === "published" && !post.publishedAt) post.publishedAt = new Date();
  await post.save();
  return json(post);
});

// DELETE /api/blog/:id  (edit)
export const DELETE = route(async (req: Request, { params }: Ctx) => {
  await requireEdit(req);
  await BlogPost.findByIdAndDelete(params.id);
  return json({ ok: true });
});
