import mongoose, { Schema, type Model } from "mongoose";

export type ContentBlock = { t: string; c: string | string[] };

export interface IBlogPost {
  title: string;
  slug: string;
  excerpt: string;
  thumbnail: string;
  content: ContentBlock[];
  category: string;
  domain: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  ogImage: string;
  status: "draft" | "published";
  featured: boolean;
  readingTime: number;
  author: string;
  views: number;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    excerpt: { type: String, default: "" },
    thumbnail: { type: String, default: "" },
    content: { type: [Schema.Types.Mixed], default: [] },
    category: { type: String, default: "General" },
    domain: { type: String, default: "DevOps" },
    tags: { type: [String], default: [] },
    seoTitle: { type: String, default: "" },
    seoDescription: { type: String, default: "" },
    ogImage: { type: String, default: "" },
    status: { type: String, enum: ["draft", "published"], default: "draft", index: true },
    featured: { type: Boolean, default: false },
    readingTime: { type: Number, default: 4 },
    author: { type: String, default: "Manish" },
    views: { type: Number, default: 0 },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

blogSchema.index({ title: "text", excerpt: "text", tags: "text" });

export const BlogPost =
  (mongoose.models.BlogPost as Model<IBlogPost>) ||
  (mongoose.model("BlogPost", blogSchema) as unknown as Model<IBlogPost>);
