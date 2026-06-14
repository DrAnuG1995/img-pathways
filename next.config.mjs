/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // We type-check via `tsc --noEmit`; don't let a missing ESLint config block builds.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
