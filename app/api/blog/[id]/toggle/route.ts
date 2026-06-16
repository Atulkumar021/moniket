import { route, json, HttpError } from "@/lib/server/http";
import { requireEdit } from "@/lib/server/auth";
import { BlogPost } from "@/lib/server/models/BlogPost";

export const dynamic = "force-dynamic";

type Ctx = { params: { id: string } };

// POST /api/blog/:id/toggle  (edit)
export const POST = route(async (req: Request, { params }: Ctx) => {
  await requireEdit(req);
  const post = await BlogPost.findById(params.id);
  if (!post) throw new HttpError(404, "Post not found");
  post.status = post.status === "published" ? "draft" : "published";
  if (post.status === "published" && !post.publishedAt) post.publishedAt = new Date();
  await post.save();
  return json(post);
});
