// Static export (GitHub Pages) is opt-in via STATIC_EXPORT=true. The default
// build stays a normal server build (Vercel-capable, with the /api/lead route).
const isExport = process.env.STATIC_EXPORT === "true";
const basePath = process.env.PAGES_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // We type-check via `tsc --noEmit`; don't let a missing ESLint config block builds.
  eslint: { ignoreDuringBuilds: true },
  ...(isExport && {
    output: "export",
    images: { unoptimized: true },
    trailingSlash: true,
    ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  }),
};

export default nextConfig;
