// Static export (GitHub Pages) is opt-in via STATIC_EXPORT=true. The site has no
// server routes now (lead capture posts client-side to Formspree), so the default
// build is also fully static-exportable and works on any host.
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
