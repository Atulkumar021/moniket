import mongoose, { Schema, type Model, type HydratedDocument } from "mongoose";
import bcrypt from "bcryptjs";

export const ROLES = ["superadmin", "editor", "content", "viewer"] as const;
export type Role = (typeof ROLES)[number];

export interface IUser {
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
  avatar: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserMethods {
  matchPassword(plain: string): Promise<boolean>;
  toJSON(): Record<string, unknown>;
}

export interface UserModel extends Model<IUser, Record<string, never>, IUserMethods> {
  hashPassword(plain: string): Promise<string>;
}

export type UserDocument = HydratedDocument<IUser, IUserMethods>;

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ROLES, default: "viewer" },
    avatar: { type: String, default: "" },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = function (plain: string) {
  return bcrypt.compare(plain, (this as { passwordHash: string }).passwordHash);
};

userSchema.statics.hashPassword = function (plain: string) {
  return bcrypt.hash(plain, 10);
};

userSchema.set("toJSON", {
  transform: (_doc, ret) => {
    delete (ret as Record<string, unknown>).passwordHash;
    return ret;
  },
});

export const User =
  (mongoose.models.User as UserModel) ||
  (mongoose.model("User", userSchema) as unknown as UserModel);
