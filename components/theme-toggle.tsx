"use client";

import { Moon, Sun } from "lucide-react";
import type { MouseEvent } from "react";

import { Button } from "@/components/ui/button";

type ViewTransitionLike = {
  ready: Promise<void>;
  finished: Promise<void>;
  skipTransition: () => void;
};

type DocumentWithViewTransition = Document & {
  startViewTransition?: (callback: () => void) => ViewTransitionLike;
};

const THEME_KEY = "theme";

function applyTheme(next: "dark" | "light") {
  document.documentElement.classList.toggle("dark", next === "dark");
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch {
    // Storage can be unavailable (private mode); the toggle still works.
  }
}

/**
 * Flips the theme. Where the View Transitions API is supported the new theme is
 * revealed by a circle that grows out of the button; everywhere else it simply
 * switches. The sun/moon icons are swapped with CSS `dark:` variants, so there is
 * no client-only state to hydrate and no flash on first paint.
 */
export function ThemeToggle() {
  function toggleTheme(event: MouseEvent<HTMLButtonElement>) {
    const root = document.documentElement;
    const next = root.classList.contains("dark") ? "light" : "dark";

    const doc = document as DocumentWithViewTransition;
    const startViewTransition = doc.startViewTransition;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || typeof startViewTransition !== "function") {
      applyTheme(next);
      return;
    }

    // Grow the circle from the centre of the button, which also works when the
    // toggle is activated with the keyboard.
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = startViewTransition.call(doc, () => applyTheme(next));

    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${radius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 520,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      })
      .catch(() => {
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