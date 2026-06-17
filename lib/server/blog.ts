import slugify from "slugify";
import type { Types } from "mongoose";
import { BlogPost, type ContentBlock } from "./models/BlogPost";
import { connectToDatabase } from "./db";
import type { Article, Block } from "@/lib/types";
import type { ArticleCardData } from "@/lib/queries";

const toDateStr = (d?: Date) => (d ? new Date(d).toISOString().slice(0, 10) : "");

// Published blog posts from MongoDB, mapped to the card shape the public
// blog list/preview components render. Optional limit for the homepage preview.
export async function fetchPublishedBlogCards(limit = 0): Promise<ArticleCardData[]> {
  try {
    await connectToDatabase();
    const query = BlogPost.find({ status: "published" }).sort({ featured: -1, publishedAt: -1, createdAt: -1 });
    if (limit) query.limit(limit);
    const docs = await query.lean();
    return docs.map((d) => ({
      id: 0,
      type: "blog" as const,
      title: d.title,
      category: d.category || "General",
      domain: d.domain || "DevOps",
      status: "published" as const,
      views: d.views || 0,
      date: toDateStr(d.publishedAt || d.createdAt),
      read: d.readingTime || 4,
      excerpt: d.excerpt || "",
      slug: d.slug,
    }));
  } catch {
    return [];
  }
}

// A single published blog post by slug, mapped to the Article view shape.
export async function fetchBlogBySlug(slug: string): Promise<Article | null> {
  try {
    await connectToDatabase();
    const d = await BlogPost.findOne({ slug, status: "published" }).lean();
    if (!d) return null;
    return {
      id: 0,
      type: "blog",
      title: d.title,
      category: d.category || "General",
      domain: d.domain || "DevOps",
      status: "published",
      views: d.views || 0,
      date: toDateStr(d.publishedAt || d.createdAt),
      read: d.readingTime || 4,
      excerpt: d.excerpt || "",
      body: ((d.content as ContentBlock[]) || []) as unknown as Block[],
    };
  } catch {
    return null;
  }
}

export function calcReadingTime(content: ContentBlock[] = [], excerpt = ""): number {
  const text =
    excerpt +
    " " +
    content.map((b) => (Array.isArray(b?.c) ? b.c.join(" ") : b?.c || "")).join(" ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export async function uniqueSlug(base: string, ignoreId?: Types.ObjectId): Promise<string> {
  let slug = slugify(base || "post", { lower: true, strict: true }) || "post";
  let n = 1;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const existing = await BlogPost.findOne({ slug });
    if (!existing || (ignoreId && existing._id.equals(ignoreId))) break;
    slug = `${slugify(base, { lower: true, strict: true })}-${++n}`;
  }
  return slug;
}
