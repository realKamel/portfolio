"use client";

import { useScroll } from "framer-motion";
import { useCallback, useSyncExternalStore } from "react";

/** Soft "easeOutExpo"-style curve that reads as premium rather than bouncy. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * True once the page is scrolled past `offset`px. Uses Motion's rAF-batched
 * scroll subscription instead of a raw `window.addEventListener("scroll")`, so
 * the check stays off the critical scroll path.
 */
export function useScrolledPast(offset: number) {
  const { scrollY } = useScroll();

  const subscribe = useCallback(
    (onStoreChange: () => void) => scrollY.on("change", onStoreChange),
    [scrollY],
  );
  const getSnapshot = useCallback(
    () => scrollY.get() > offset,
    [scrollY, offset],
  );

  // Server snapshot is always false; the real value is read on hydration.
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
