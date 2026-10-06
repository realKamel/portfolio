import { ImageResponse } from "next/og";

import { brandColors, profile } from "@/lib/data";

export const alt = `${profile.name} - ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated OG/Twitter card. Next.js wires this into `og:image` and
 * `twitter:image` automatically, so the `summary_large_image` card configured
 * in `app/layout.tsx` always has an image.
 */
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: brandColors.background,
          color: brandColors.foreground,
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              border: "1px solid rgba(255,255,255,0.14)",
              background: brandColors.card,
              fontSize: "20px",
              fontWeight: 600,
            }}
          >
            {profile.monogram}
          </div>
          <div style={{ fontSize: "22px", color: brandColors.mutedForeground }}>{profile.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 600,
              lineHeight: 1.1,
              maxWidth: "900px",
            }}
          >
            {profile.role}
          </div>
          <div style={{ fontSize: "28px", color: brandColors.mutedForeground, maxWidth: "900px" }}>
            ASP.NET Core · Angular · Clean Architecture
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "24px",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "9999px",
              background: brandColors.brand,
            }}
          />
          <div style={{ color: brandColors.mutedForeground }}>{profile.location}</div>
        </div>
      </div>
    ),
    size,
  );
}
