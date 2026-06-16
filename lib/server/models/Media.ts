import mongoose, { Schema, type Model } from "mongoose";

export interface IMedia {
  name: string;
  url: string;
  publicId: string;
  resourceType: "image" | "video" | "raw";
  format: string;
  bytes: number;
  width: number;
  height: number;
  folder: string;
  uploadedBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const mediaSchema = new Schema(
  {
    name: { type: String, default: "" },
    url: { type: String, required: true },
    publicId: { type: String, default: "" },
    resourceType: { type: String, enum: ["image", "video", "raw"], default: "image" },
    format: { type: String, default: "" },
    bytes: { type: Number, default: 0 },
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
    folder: { type: String, default: "general", index: true },
    uploadedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Media =
  (mongoose.models.Media as Model<IMedia>) ||
  (mongoose.model("Media", mediaSchema) as unknown as Model<IMedia>);
