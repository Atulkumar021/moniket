import mongoose, { Schema, type Model } from "mongoose";

export interface IPage {
  path: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  canonical: string;
  ogImage: string;
  schema: Record<string, unknown>;
  noindex: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const pageSchema = new Schema(
  {
    path: { type: String, required: true, unique: true, trim: true }, // e.g. "/", "/blog"
    title: { type: String, default: "" },
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    keywords: { type: [String], default: [] },
    canonical: { type: String, default: "" },
    ogImage: { type: String, default: "" },
    schema: { type: Schema.Types.Mixed, default: {} }, // JSON-LD
    noindex: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Page =
  (mongoose.models.Page as Model<IPage>) ||
  (mongoose.model("Page", pageSchema) as unknown as Model<IPage>);
