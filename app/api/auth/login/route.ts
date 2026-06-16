import { route, readJson, json, HttpError } from "@/lib/server/http";
import { signToken } from "@/lib/server/auth";
import { User } from "@/lib/server/models/User";

export const dynamic = "force-dynamic";

// POST /api/auth/login
export const POST = route(async (req) => {
  const { email, password } = await readJson(req);
  const user = await User.findOne({ email: String(email || "").toLowerCase() }).select("+passwordHash");
  if (!user || !(await user.matchPassword(String(password || "")))) {
    throw new HttpError(401, "Invalid email or password");
  }
  if (!user.active) throw new HttpError(403, "Account disabled");
  return json({ token: signToken(user), user: user.toJSON() });
});
