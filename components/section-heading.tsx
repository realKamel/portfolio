import type { ReactNode } from "react";

import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Optional plain-language label. Use sparingly (max 1 per 3 sections). */
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <Reveal className={cn(centered && "text-center", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase",
            centered && "text-center",
          )}
        >
          {eyebrow}
        </p>
      ) : null}

      <h2
        className={cn(
          "max-w-3xl text-3xl font-medium leading-[1.1] tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]",
          eyebrow ? "mt-5" : undefined,
          centered && "mx-auto",
        )}
      >
        {title}
      </h2>

      {description ? (
        <p
          className={cn(
            "mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg",
            centered && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
