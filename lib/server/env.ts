// Centralized server-side configuration. Reads from process.env, which Next.js
// populates from .env automatically at runtime; standalone scripts (e.g. the
// seed) load .env via `dotenv/config` before importing this module.

function list(value: string | undefined, fallback: string): string[] {
  return (value || fallback)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  mongoUri: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/moniket_cms",
  mongoDbName: process.env.MONGO_DB_NAME || "moniket_cms",
  mongodbDnsServers: list(process.env.MONGODB_DNS_SERVERS, "1.1.1.1,8.8.8.8"),
  jwtSecret: process.env.JWT_SECRET || "dev-insecure-secret-change-me",
  jwtExpires: process.env.JWT_EXPIRES || "7d",
  seedAdmin: {
    name: process.env.SEED_ADMIN_NAME || "Admin",
    email: process.env.SEED_ADMIN_EMAIL || "admin@moniket.tech",
    password: process.env.SEED_ADMIN_PASSWORD || "changeme123",
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
    apiKey: process.env.CLOUDINARY_API_KEY || "",
    apiSecret: process.env.CLOUDINARY_API_SECRET || "",
    folder: process.env.CLOUDINARY_FOLDER || "moniket",
  },
};

export const isCloudinaryConfigured = () =>
  Boolean(env.cloudinary.cloudName && env.cloudinary.apiKey && env.cloudinary.apiSecret);
