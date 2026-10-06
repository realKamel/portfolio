"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";

import { useScrolledPast } from "@/lib/motion";

export function BackToTop() {
  const visible = useScrolledPast(800);
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {visible ? (
        <m.button
          type="button"
          onClick={() =>
            window.scrollTo({ top: 0, behavior: shouldReduceMotion ? "auto" : "smooth" })
          }
          initial={{ opacity: 0, scale: 0.9, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 8 }}
          transition={{ duration: 0.25 }}
          className="fixed right-[max(1.25rem,env(safe-area-inset-right))] bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-40 grid size-11 place-items-center rounded-full border border-border bg-card/80 text-foreground backdrop-blur transition-colors hover:border-brand/60 hover:text-brand sm:right-[max(2rem,env(safe-area-inset-right))] sm:bottom-[max(2rem,env(safe-area-inset-bottom))]"
          aria-label="Back to top"
        >
          <ArrowUp className="size-4" />
        </m.button>
      ) : null}
    </AnimatePresence>
  );
}
