import slugify from "slugify";
import type { Types } from "mongoose";
import { BlogPost, type ContentBlock } from "./models/BlogPost";

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
