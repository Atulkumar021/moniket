import { route, json, searchParams, HttpError } from "@/lib/server/http";
import { requireEdit } from "@/lib/server/auth";
import { Media } from "@/lib/server/models/Media";
import { isCloudinaryConfigured, uploadBuffer } from "@/lib/server/cloudinary";

export const dynamic = "force-dynamic";

// GET /api/media?folder=&q=  (edit)
export const GET = route(async (req) => {
  await requireEdit(req);
  const sp = searchParams(req);
  const filter: Record<string, unknown> = {};
  const folder = sp.get("folder");
  const q = sp.get("q");
  if (folder) filter.folder = folder;
  if (q) filter.name = { $regex: q, $options: "i" };
  return json(await Media.find(filter).sort({ createdAt: -1 }));
});

// POST /api/media  (edit) — multipart form-data with one or more "files"
export const POST = route(async (req) => {
  const user = await requireEdit(req);
  if (!isCloudinaryConfigured()) {
    throw new HttpError(503, "Cloudinary is not configured — set CLOUDINARY_* env vars");
  }

  const form = await req.formData();
  const folder = String(form.get("folder") || "general");
  const files = form.getAll("files").filter((f): f is File => f instanceof File);
  if (!files.length) throw new HttpError(400, "No files uploaded");

  const docs = [];
  for (const file of files) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploaded = await uploadBuffer(buffer, file.type, folder);
    docs.push({
      name: file.name,
      url: uploaded.url,
      publicId: uploaded.publicId,
      resourceType: uploaded.resourceType,
      format: uploaded.format || (file.name.split(".").pop() || "").toLowerCase(),
      bytes: uploaded.bytes || file.size || 0,
      width: uploaded.width,
      height: uploaded.height,
      folder,
      uploadedBy: user._id,
    });
  }
  const created = await Media.insertMany(docs);
  return json(created, 201);
});
