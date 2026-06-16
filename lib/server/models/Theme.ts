import mongoose, { Schema, type Model } from "mongoose";

// Singleton document (key: "default") that drives global CSS variables.
export interface ITheme {
  key: string;
  primary: string;
  secondary: string;
  accent: string;
  ink: string;
  fontFamily: string;
  monoFamily: string;
  radius: number;
  shadow: "none" | "soft" | "medium" | "strong";
  buttonStyle: "rounded" | "pill" | "square";
  containerWidth: number;
  mode: "light" | "dark";
  createdAt: Date;
  updatedAt: Date;
}

const themeSchema = new Schema(
  {
    key: { type: String, default: "default", unique: true },
    primary: { type: String, default: "#2563EB" },
    secondary: { type: String, default: "#60A5FA" },
    accent: { type: String, default: "#5CC1F5" },
    ink: { type: String, default: "#16263B" },
    fontFamily: { type: String, default: "Plus Jakarta Sans" },
    monoFamily: { type: String, default: "JetBrains Mono" },
    radius: { type: Number, default: 16 }, // px
    shadow: { type: String, enum: ["none", "soft", "medium", "strong"], default: "soft" },
    buttonStyle: { type: String, enum: ["rounded", "pill", "square"], default: "rounded" },
    containerWidth: { type: Number, default: 1240 }, // px
    mode: { type: String, enum: ["light", "dark"], default: "light" },
  },
  { timestamps: true }
);

export const Theme =
  (mongoose.models.Theme as Model<ITheme>) ||
  (mongoose.model("Theme", themeSchema) as unknown as Model<ITheme>);
