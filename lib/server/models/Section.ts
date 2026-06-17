import mongoose, { Schema, type Model } from "mongoose";

// Section types the page builder understands.
export const SECTION_TYPES = [
  "hero",
  "marquee",
  "services",
  "knowledgeHub",
  "toolbox",
  "about",
  "process",
  "statistics",
  "testimonials",
  "blog",
  "faq",
  "contact",
  "footer",
] as const;

export interface ISection {
  page: string;
  type: (typeof SECTION_TYPES)[number];
  name: string;
  order: number;
  enabled: boolean;
  data: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const sectionSchema = new Schema(
  {
    page: { type: String, default: "home", index: true },
    type: { type: String, enum: SECTION_TYPES, required: true },
    name: { type: String, default: "" }, // admin-facing label
    order: { type: Number, default: 0, index: true },
    enabled: { type: Boolean, default: true },
    // Flexible per-section content (fields differ by type — see seed defaults).
    data: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

sectionSchema.index({ page: 1, order: 1 });

export const Section =
  (mongoose.models.Section as Model<ISection>) ||
  (mongoose.model("Section", sectionSchema) as unknown as Model<ISection>);
