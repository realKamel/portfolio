"use client";

import { Menu } from "lucide-react";
import dynamic from "next/dynamic";

import { Button, buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { navLinks, profile } from "@/lib/data";
import { useScrolledPast } from "@/lib/motion";
import { cn } from "@/lib/utils";

// The mobile drawer is interaction-only, so keep base-ui's dialog out of the
// initial bundle. The `loading` fallback is server-rendered, so the menu button
// is present immediately with no layout shift.
const MobileNav = dynamic(
  () => import("@/components/mobile-nav").then((mod) => mod.MobileNav),
  {
    ssr: false,
    loading: () => (
      <button
        type="button"
        aria-label="Open menu"
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon-sm" }),
          "md:hidden",
        )}
      >
        <Menu className="size-4" />
      </button>
    ),
  },
);

export function SiteHeader() {
  const scrolled = useScrolledPast(16);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300 pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]",
        scrolled
          ? "border-b border-border bg-background/75 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-6 sm:px-8 lg:px-12">
        <a
          href="#top"
          className="group flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          aria-label={`${profile.name} - home`}
        >
          <span className="grid size-8 place-items-center rounded-lg border border-border bg-card font-mono text-[11px] font-semibold tracking-tight transition-colors group-hover:border-brand/60 group-hover:text-brand">
            {profile.monogram}
          </span>
          <span className="hidden text-sm font-medium tracking-tight sm:block">
            {profile.name}
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:bg-muted focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:inline-flex"
            render={
              <a href={profile.resume} target="_blank" rel="noopener noreferrer" />
            }
          >
            Résumé
          </Button>
          <Button
            size="sm"
            className="hidden sm:inline-flex"
            render={<a href="#contact" />}
          >
            Get in touch
          </Button>

          <MobileNav />
        </div>
      </div>
    </header>
  );
}
