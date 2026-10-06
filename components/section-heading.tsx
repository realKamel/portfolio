import type { ReactNode } from "react";

import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <Reveal className={cn(centered && "text-center", className)}>
      <div
        className={cn(
          "flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground",
          centered && "justify-center",
        )}
      >
        <span className="text-brand">{index}</span>
        <span className="h-px w-8 bg-border" aria-hidden />
        <span>{eyebrow}</span>
      </div>

      <h2
        className={cn(
          "mt-5 max-w-3xl text-3xl font-medium leading-[1.1] tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]",
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
