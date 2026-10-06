import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `next build` emits HTML/CSS/JS into `out/`.
  output: "export",
  images: {
    // A static export has no Image Optimization server, so images are served
    // as-is. The picsum.photos placeholders (see `lib/data.ts`) load directly.
    unoptimized: true,
  },
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
