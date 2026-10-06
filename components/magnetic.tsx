"use client";

import { m, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useRef, type PointerEvent, type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** How far the element drifts toward the cursor. 0.35 feels subtle. */
  strength?: number;
}

/**
 * Subtle magnetic pull toward the pointer. Mouse-only and disabled for
 * reduced-motion visitors so it never fights the OS setting.
 */
export function Magnetic({ children, className, strength = 0.35 }: MagneticProps) {
  const shouldReduceMotion = useReducedMotion();
  // Cache the element rect on hover-enter so the pointer-move handler never
  // forces a synchronous layout read on the hot path.
  const rectRef = useRef<DOMRect | null>(null);

  // Motion values drive the transform directly — the spring runs off the React
  // render cycle, so tracking the cursor never triggers a re-render.
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // `restDelta` lets each spring stop once it is within half a pixel of its
  // target rather than running to the default 0.01px.
  const springX = useSpring(x, {
    stiffness: 220,
    damping: 18,
    mass: 0.4,
    restDelta: 0.5,
  });
  const springY = useSpring(y, {
    stiffness: 220,
    damping: 18,
    mass: 0.4,
    restDelta: 0.5,
  });

  function handlePointerEnter(event: PointerEvent<HTMLDivElement>) {
    if (shouldReduceMotion || event.pointerType !== "mouse") return;
    rectRef.current = event.currentTarget.getBoundingClientRect();
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const rect = rectRef.current;
    if (shouldReduceMotion || event.pointerType !== "mouse" || !rect) return;
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function reset() {
    rectRef.current = null;
    x.set(0);
    y.set(0);
  }

  return (
    <m.div
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      style={{ x: springX, y: springY }}
      className={cn("inline-flex", className)}
    >
      {children}
    </m.div>
  );
}
