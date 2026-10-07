import type { NextConfig } from "next";
const isProd = process.env.NODE_ENV === "production";
const nextConfig: NextConfig = {
  // Fully static site: `next build` emits HTML/CSS/JS into `out/`.
  output: "export",
  images: {
    // A static export has no Image Optimization server, so images are served
    // as-is. The picsum.photos placeholders (see `lib/data.ts`) load directly.
    unoptimized: true,
  },
  basePath: isProd ? "/portfolio" : "",
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
