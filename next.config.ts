import type { NextConfig } from "next";

// next-pwa Next.js 16 (Turbopack) bilan to'liq mos emas,
// shuning uchun PWA ni custom service worker orqali qilamiz
const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {},
};

export default nextConfig;
