"use client";

import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

type ViewTransitionLike = {
  ready: Promise<void>;
  finished: Promise<void>;
  skipTransition: () => void;
};

type DocumentWithViewTransition = Document & {
  startViewTransition?: (callback: () => void) => ViewTransitionLike;
};

// Versioned so a future schema change can migrate instead of colliding.
const THEME_KEY = "theme:v1";

// Handle for the rAF that re-enables transitions after a theme switch.
let pendingFrame = 0;

function applyTheme(next: "dark" | "light") {
  const root = document.documentElement;
  // Suppress CSS transitions for the switch so the browser does one clean
  // repaint instead of animating colours on every element for ~500ms (the main
  // cause of a janky toggle on mobile).
  root.classList.add("theme-switching");
  root.classList.toggle("dark", next === "dark");
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch {
    // Storage can be unavailable (private mode); the toggle still works.
  }
  // Re-enable transitions once the new theme has been painted.
  cancelAnimationFrame(pendingFrame);
  pendingFrame = requestAnimationFrame(() => {
    pendingFrame = requestAnimationFrame(() => {
      root.classList.remove("theme-switching");
    });
  });
}

type ViewTransitionStarter = (callback: () => void) => ViewTransitionLike;

/**
 * Returns the View Transitions entry point, but only when the circular reveal is
 * actually affordable. It snapshots the whole page and animates a full-viewport
 * `clip-path`, which is far too heavy on touch devices and small screens (the
 * snapshot also forces every `content-visibility` section to render). There we
 * skip it and switch the theme instantly instead.
 */
function getViewTransitionStarter(): ViewTransitionStarter | null {
  const start = (document as DocumentWithViewTransition).startViewTransition;
  if (typeof start !== "function") return null;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;
  // Only reveal on a real fine-pointer device (desktop mouse/trackpad). Touch
  // phones and tablets get the instant path — the full-page snapshot plus a
  // full-viewport clip animation is far too heavy for them.
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return null;
  return start;
}

/**
 * Flips the theme. On desktop the change is revealed by a composited opacity
 * cross-fade (see the `::view-transition-*` rules in globals.css); everywhere
 * else it switches instantly. The sun/moon icons are swapped with CSS `dark:`
 * variants, so there is no client-only state to hydrate and no flash on first
 * paint.
 */
export function ThemeToggle() {
  function toggleTheme() {
    const next = document.documentElement.classList.contains("dark")
      ? "light"
      : "dark";

    const doc = document as DocumentWithViewTransition;
    const startViewTransition = getViewTransitionStarter();

    if (!startViewTransition) {
      applyTheme(next);
      return;
    }

    // No JS animation here — the cross-fade is entirely CSS and runs on the
    // compositor, so nothing executes per frame on the main thread.
    startViewTransition.call(doc, () => applyTheme(next)).finished.catch(() => {
      // A transition can be skipped; the theme has still been applied.
    });
  }

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
    >
      <Sun className="hidden dark:block" />
      <Moon className="dark:hidden" />
    </Button>
  );
}