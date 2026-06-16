import mongoose, { Schema, type Model } from "mongoose";

export const LEAD_STATUSES = ["new", "contacted", "qualified", "won", "lost"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

const noteSchema = new Schema(
  {
    text: { type: String, required: true },
    by: { type: String, default: "" },
    at: { type: Date, default: Date.now },
  },
  { _id: true }
);

export interface ILead {
  name: string;
  email: string;
  service: string;
  message: string;
  source: string;
  status: LeadStatus;
  notes: { text: string; by: string; at: Date }[];
  createdAt: Date;
  updatedAt: Date;
}

const leadSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    service: { type: String, default: "General enquiry" },
    message: { type: String, default: "" },
    source: { type: String, default: "website" },
    status: { type: String, enum: LEAD_STATUSES, default: "new", index: true },
    notes: { type: [noteSchema], default: [] },
  },
  { timestamps: true }
);

export const Lead =
  (mongoose.models.Lead as Model<ILead>) ||
  (mongoose.model("Lead", leadSchema) as unknown as Model<ILead>);
