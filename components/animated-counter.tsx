"use client";

import { animate, inView, m, useMotionValue, useTransform } from "motion/react";
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

  // Seeded with the real value so the prerendered HTML (and reduced-motion
  // visitors) show the figure; the count-up resets it to 0 on first view.
  const count = useMotionValue(value);
  const display = useTransform(count, (latest) => formatter.format(latest));

  useEffect(() => {
    const element = ref.current;
    if (!element || shouldReduceMotion) return;

    let started = false;
    // `inView` is Motion's imperative viewport API: it fires a callback instead
    // of driving React state, so entering the viewport never re-renders. The
    // count animates a Motion value, which writes straight to the DOM.
    return inView(
      element,
      () => {
        if (started) return;
        started = true;
        count.set(0);
        animate(count, value, { duration, ease: EASE });
      },
      { margin: "0px 0px -40px 0px" },
    );
  }, [shouldReduceMotion, value, duration, count]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      <m.span>{display}</m.span>
      {suffix}
    </span>
  );
}
