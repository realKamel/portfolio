"use client";

import { m, useReducedMotion } from "motion/react";
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
}

/**
 * Scroll-triggered fade + rise. Runs through Motion `m` components, so the
 * reveal writes straight to the DOM and never re-renders React. Reduced-motion
 * visitors get a plain fade with no travel.
 */
export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <m.div
      data-reveal=""
      className={cn(className)}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-72px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </m.div>
  );
}
