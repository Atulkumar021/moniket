import jwt from "jsonwebtoken";
import { env } from "./env";
import { HttpError } from "./http";
import { User, type Role, type UserDocument } from "./models/User";

export function signToken(user: { _id: { toString(): string }; role: string }): string {
  return jwt.sign({ id: user._id.toString(), role: user.role }, env.jwtSecret, {
    expiresIn: env.jwtExpires,
  } as jwt.SignOptions);
}

export function verifyToken(token: string): { id: string; role: string } {
  return jwt.verify(token, env.jwtSecret) as { id: string; role: string };
}

// Verify the Bearer token and return the active user, or throw 401.
export async function requireAuth(req: Request): Promise<UserDocument> {
  const header = req.headers.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) throw new HttpError(401, "Not authorized — no token");

  let decoded: { id: string };
  try {
    decoded = verifyToken(token);
  } catch {
    throw new HttpError(401, "Not authorized — invalid token");
  }

  const user = await User.findById(decoded.id);
  if (!user || !user.active) throw new HttpError(401, "Not authorized — user not found");
  return user;
}

// Role-based access control. superadmin is always allowed.
export async function requireRole(req: Request, ...roles: Role[]): Promise<UserDocument> {
  const user = await requireAuth(req);
  if (user.role === "superadmin" || roles.includes(user.role)) return user;
  throw new HttpError(403, "Forbidden — insufficient role");
}

// Convenience: anyone who can edit content (editor/content, plus superadmin).
export function requireEdit(req: Request): Promise<UserDocument> {
  return requireRole(req, "editor", "content");
}

// Super-admin only (matches Express `authorize()` with no roles passed).
export function requireSuperadmin(req: Request): Promise<UserDocument> {
  return requireRole(req);
}
