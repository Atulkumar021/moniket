/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep mongoose out of the bundler so its dynamic requires work at runtime.
  experimental: {
    serverComponentsExternalPackages: ["mongoose", "bcryptjs"],
  },
};

export default nextConfig;
