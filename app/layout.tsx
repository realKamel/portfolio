import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { MotionProvider } from "@/components/motion-provider";
import { ScrollProgress } from "@/components/scroll-progress";
import { TooltipProvider } from "@/components/ui/tooltip";
import { brandColors, profile } from "@/lib/data";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description = `${profile.role} based in ${profile.location}. ${profile.summary}`;

// Resolve the canonical site URL for social/OG images. Prefers an explicit
// override, then the Vercel production URL, then local development.
const metadataBase = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
);

export const metadata: Metadata = {
  metadataBase,
  title: `${profile.name} - ${profile.role}`,
  description,
  keywords: [
    "Abdelrahman Ali Kamel",
    "Full-Stack Developer",
    ".NET Developer",
    "ASP.NET Core",
    "Angular Developer",
    "Clean Architecture",
    "C#",
    "Portfolio",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    title: `${profile.name} - ${profile.role}`,
    description,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} - ${profile.role}`,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: brandColors.background,
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-md focus:border focus:border-border focus:bg-card focus:px-4 focus:py-2 focus:text-sm focus:text-foreground"
        >
          Skip to content
        </a>

        <TooltipProvider>
          <MotionProvider>
            <ScrollProgress />
            {children}
          </MotionProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
