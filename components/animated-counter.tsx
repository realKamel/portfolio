"use client";

import {
  animate,
  m,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useMemo, useRef, useSyncExternalStore } from "react";

import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onStoreChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onStoreChange);
  return () => query.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

// Kept `false` on the server so SSR and hydration agree; the real value is read
// on the post-hydration render.
function getReducedMotionServerSnapshot() {
  return false;
}

interface AnimatedCounterProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

/** Counts up to `value` the first time it scrolls into view. */
export function AnimatedCounter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.6,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  // `useSyncExternalStore` uses the server snapshot during hydration and only
  // applies the real media-query value afterwards, so there is no mismatch.
  const shouldReduceMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
  // Intl keeps number formatting locale-aware instead of hand-rolled.
  const formatter = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }),
    [decimals],
  );

  // The count runs on a Motion value, so animating it never re-renders React.
  const count = useMotionValue(0);
  const display = useTransform(count, (latest) => formatter.format(latest));

  useEffect(() => {
    if (!inView || shouldReduceMotion) return;

    const controls = animate(count, value, { duration, ease: EASE });
    return () => controls.stop();
  }, [inView, shouldReduceMotion, value, duration, count]);

  // Reduced motion renders the final value directly, with no animation.
  if (shouldReduceMotion) {
    return (
      <span ref={ref} className={cn("tabular-nums", className)}>
        {prefix}
        {formatter.format(value)}
        {suffix}
      </span>
    );
  }

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      <m.span>{display}</m.span>
      {suffix}
    </span>
  );
}
