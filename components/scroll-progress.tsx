"use client";

import { m, useScroll, useSpring } from "motion/react";

/** Hairline progress bar pinned to the very top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  // `scaleX` is a Motion value written straight to the DOM (and composited), so
  // scroll tracking never re-renders React.
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    // Settle sooner so the spring stops doing work once scrolling stops.
    restDelta: 0.01,
  });

  return (
    <m.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-60 h-0.5 origin-left bg-brand"
    />
  );
}
