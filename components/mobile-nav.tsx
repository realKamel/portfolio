"use client";

import { Menu } from "lucide-react";
import { useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks, profile } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * Mobile-only navigation drawer. Imported lazily from `site-header.tsx` so
 * base-ui's dialog stays out of the initial bundle on every viewport.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon-sm" }),
          "md:hidden",
        )}
        aria-label="Open menu"
      >
        <Menu className="size-4" />
      </SheetTrigger>
      <SheetContent side="right" className="w-72 gap-0">
        <SheetHeader>
          <SheetTitle className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
            Navigation
          </SheetTitle>
          <SheetDescription className="sr-only">Site navigation</SheetDescription>
        </SheetHeader>

        <nav className="flex flex-col px-4 pb-4" aria-label="Mobile">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-base text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:bg-muted focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-2 border-t border-border p-4">
          <Button render={<a href="#contact" onClick={() => setOpen(false)} />}>
            Get in touch
          </Button>
          <Button
            variant="outline"
            render={
              <a href={profile.resume} target="_blank" rel="noopener noreferrer" />
            }
          >
            View résumé
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
