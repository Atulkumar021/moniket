import mongoose, { Schema, type Model } from "mongoose";

// Recursive menu item (supports one level of nesting via `children`).
const itemSchema = new Schema(
  {
    label: { type: String, required: true },
    href: { type: String, default: "#" },
    order: { type: Number, default: 0 },
    enabled: { type: Boolean, default: true },
    external: { type: Boolean, default: false },
    children: { type: [Schema.Types.Mixed], default: [] },
  },
  { _id: false }
);

export interface INavMenu {
  key: string;
  items: {
    label: string;
    href: string;
    order: number;
    enabled: boolean;
    external: boolean;
    children: unknown[];
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const navMenuSchema = new Schema(
  {
    key: { type: String, default: "main", unique: true }, // main | footer
    items: { type: [itemSchema], default: [] },
  },
  { timestamps: true }
);

export const NavMenu =
  (mongoose.models.NavMenu as Model<INavMenu>) ||
  (mongoose.model("NavMenu", navMenuSchema) as unknown as Model<INavMenu>);
