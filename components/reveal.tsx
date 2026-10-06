"use client";

import { m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before animating in. */
  delay?: number;
  /** Vertical travel distance in pixels. */
  y?: number;
  once?: boolean;
}

/**
 * Scroll-triggered fade + rise. Collapses to a plain fade when the visitor
 * prefers reduced motion, so the content never moves unexpectedly.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  once = true,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <m.div
      className={cn(className)}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-72px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </m.div>
  );
}
