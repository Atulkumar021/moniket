import { route, readJson, json, HttpError } from "@/lib/server/http";
import { requireSuperadmin } from "@/lib/server/auth";
import { User, ROLES, type Role } from "@/lib/server/models/User";

export const dynamic = "force-dynamic";

type Ctx = { params: { id: string } };

// PATCH /api/auth/users/:id  (superadmin) — update role / active / name
export const PATCH = route(async (req: Request, { params }: Ctx) => {
  await requireSuperadmin(req);
  const user = await User.findById(params.id);
  if (!user) throw new HttpError(404, "User not found");

  const { role, active, name } = await readJson(req);
  if (role) {
    if (!ROLES.includes(role as Role)) throw new HttpError(400, "Invalid role");
    user.role = role as Role;
  }
  if (typeof active === "boolean") user.active = active;
  if (name) user.name = String(name);
  await user.save();
  return json(user.toJSON());
});

// DELETE /api/auth/users/:id  (superadmin)
export const DELETE = route(async (req: Request, { params }: Ctx) => {
  await requireSuperadmin(req);
  await User.findByIdAndDelete(params.id);
  return json({ ok: true });
});
