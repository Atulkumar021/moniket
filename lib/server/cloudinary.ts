import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";
import { env, isCloudinaryConfigured } from "./env";

let configured = false;
function ensureConfig() {
  if (!configured && isCloudinaryConfigured()) {
    cloudinary.config({
      cloud_name: env.cloudinary.cloudName,
      api_key: env.cloudinary.apiKey,
      api_secret: env.cloudinary.apiSecret,
      secure: true,
    });
    configured = true;
  }
}

export type UploadResult = {
  url: string;
  publicId: string;
  resourceType: "image" | "video" | "raw";
  format: string;
  bytes: number;
  width: number;
  height: number;
};

// Upload a single in-memory file buffer to Cloudinary.
export async function uploadBuffer(
  buffer: Buffer,
  mimetype: string,
  folder: string
): Promise<UploadResult> {
  ensureConfig();
  const resourceType: "image" | "video" | "raw" = mimetype.startsWith("image/")
    ? "image"
    : mimetype.startsWith("video/")
    ? "video"
    : "raw";

  const result = await new Promise<UploadApiResponse>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: `${env.cloudinary.folder}/${folder || "general"}`, resource_type: resourceType },
      (error, uploaded) => {
        if (error || !uploaded) return reject(error || new Error("Cloudinary upload failed"));
        resolve(uploaded);
      }
    );
    stream.end(buffer);
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
    resourceType,
    format: result.format || "",
    bytes: result.bytes || 0,
    width: result.width || 0,
    height: result.height || 0,
  };
}

export async function destroyAsset(publicId: string, resourceType: string) {
  ensureConfig();
  return cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
}

export { isCloudinaryConfigured };
