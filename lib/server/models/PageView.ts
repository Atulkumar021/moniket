import mongoose, { Schema, type Model } from "mongoose";

export interface IPageView {
  path: string;
  referrer: string;
  sessionId: string;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

const pageViewSchema = new Schema(
  {
    path: { type: String, required: true, index: true },
    referrer: { type: String, default: "" },
    sessionId: { type: String, default: "", index: true },
    userAgent: { type: String, default: "" },
  },
  { timestamps: true }
);

pageViewSchema.index({ createdAt: -1 });

export const PageView =
  (mongoose.models.PageView as Model<IPageView>) ||
  (mongoose.model("PageView", pageViewSchema) as unknown as Model<IPageView>);
