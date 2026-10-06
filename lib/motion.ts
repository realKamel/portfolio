import type { Variants } from "framer-motion";

/** Soft "easeOutExpo"-style curve that reads as premium rather than bouncy. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: EASE } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
};

/** Parent variant that staggers its children on reveal. */
export const staggerContainer = (
  staggerChildren = 0.08,
  delayChildren = 0,
): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});
