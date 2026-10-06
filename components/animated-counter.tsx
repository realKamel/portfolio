"use client";

import { animate, m, useInView, useMotionValue, useTransform } from "motion/react";
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

  // Count only while in view and when motion is allowed. `inView` is an external
  // subscription, so this stays render-derived rather than set in an effect.
  const shouldAnimate = inView && !shouldReduceMotion;

  // Animating a Motion value writes straight to the DOM, so the count-up never
  // re-renders React per frame.
  const count = useMotionValue(0);
  const display = useTransform(count, (latest) => formatter.format(latest));

  useEffect(() => {
    if (!shouldAnimate) return;

    const controls = animate(count, value, { duration, ease: EASE });
    return () => controls.stop();
  }, [shouldAnimate, value, duration, count]);

  // Before the count-up runs (and for reduced-motion visitors) render the real
  // figure, so the served HTML shows the value instead of "0".
  if (!shouldAnimate) {
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
