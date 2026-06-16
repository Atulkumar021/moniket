import { route, readJson, json, HttpError } from "@/lib/server/http";
import { requireSuperadmin } from "@/lib/server/auth";
import { User, ROLES, type Role } from "@/lib/server/models/User";

export const dynamic = "force-dynamic";

// GET /api/auth/users  (superadmin)
export const GET = route(async (req) => {
  await requireSuperadmin(req);
  const users = await User.find().sort({ createdAt: -1 });
  return json(users);
});

// POST /api/auth/users  (superadmin) — create a team member
export const POST = route(async (req) => {
  await requireSuperadmin(req);
  const { name, email, password, role } = await readJson(req);
  if (!name || !email || !password) {
    throw new HttpError(400, "name, email and password are required");
  }
  if (role && !ROLES.includes(role as Role)) throw new HttpError(400, "Invalid role");
  const passwordHash = await User.hashPassword(String(password));
  const user = await User.create({ name, email, passwordHash, role: (role as Role) || "viewer" });
  return json(user.toJSON(), 201);
});
