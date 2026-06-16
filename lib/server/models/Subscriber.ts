import mongoose, { Schema, type Model } from "mongoose";

export interface ISubscriber {
  email: string;
  source: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const subscriberSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    source: { type: String, default: "website" },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Subscriber =
  (mongoose.models.Subscriber as Model<ISubscriber>) ||
  (mongoose.model("Subscriber", subscriberSchema) as unknown as Model<ISubscriber>);
