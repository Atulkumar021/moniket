import { route, json, HttpError } from "@/lib/server/http";
import { requireEdit } from "@/lib/server/auth";
import { Media } from "@/lib/server/models/Media";
import { destroyAsset, isCloudinaryConfigured } from "@/lib/server/cloudinary";

export const dynamic = "force-dynamic";

type Ctx = { params: { id: string } };

// DELETE /api/media/:id  (edit)
export const DELETE = route(async (req: Request, { params }: Ctx) => {
  await requireEdit(req);
  const item = await Media.findById(params.id);
  if (!item) throw new HttpError(404, "Media not found");
  if (item.publicId && isCloudinaryConfigured()) {
    try {
      await destroyAsset(item.publicId, item.resourceType);
    } catch {
      // ignore cloudinary delete errors so the DB record can still be removed
    }
  }
  await item.deleteOne();
  return json({ ok: true });
});
