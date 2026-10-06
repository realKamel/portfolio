"use client";

import { ArrowUp } from "lucide-react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Back-to-top affordance. Visibility is derived from the scroll Motion value and
 * written straight to the DOM, so showing/hiding costs no React re-render and no
 * `AnimatePresence` mount/unmount cycle.
 */
export function BackToTop() {
  const shouldReduceMotion = useReducedMotion();

  const { scrollY } = useScroll();
  const progress = useTransform(scrollY, [760, 860], [0, 1], { clamp: true });
  const opacity = progress;
  const scale = useTransform(progress, [0, 1], [0.85, 1]);
  const y = useTransform(progress, [0, 1], [8, 0]);
  // `visibility: hidden` also removes the element from the tab order and the
  // accessibility tree, so no manual `inert`/`tabIndex` juggling is needed.
  const visibility = useTransform(progress, (latest): "visible" | "hidden" =>
    latest > 0 ? "visible" : "hidden",
  );

  return (
    <m.button
      type="button"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: shouldReduceMotion ? "auto" : "smooth",
        })
      }
      style={{ opacity, scale, y, visibility }}
      className="fixed right-[max(1.25rem,env(safe-area-inset-right))] bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-40 grid size-11 place-items-center rounded-full border border-border bg-card/80 text-foreground backdrop-blur transition-colors hover:border-brand/60 hover:text-brand sm:right-[max(2rem,env(safe-area-inset-right))] sm:bottom-[max(2rem,env(safe-area-inset-bottom))]"
      aria-label="Back to top"
    >
      <ArrowUp className="size-4" />
    </m.button>
  );
}
