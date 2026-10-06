"use client";

import { LazyMotion, domAnimation } from "motion/react";
import type { ReactNode } from "react";

/**
 * Loads only the animation features we use (`domAnimation`) instead of the full
 * bundle. `strict` enforces that every animated element goes through `m` (not
 * `motion`), keeping the bundle honest.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
