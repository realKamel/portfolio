import { Asterisk } from "lucide-react";

import { marqueeItems } from "@/lib/data";

/** One copy of the loop. Rendered twice so the -50% translation is seamless. */
function MarqueeRow() {
  return (
    <div className="flex shrink-0 items-center" aria-hidden>
      {marqueeItems.map((item) => (
        <div key={item} className="flex items-center">
          <span className="px-6 font-mono text-sm tracking-[0.16em] whitespace-nowrap text-muted-foreground uppercase sm:px-8">
            {item}
          </span>
          <Asterisk className="size-3.5 shrink-0 text-brand/60" />
        </div>
      ))}
    </div>
  );
}

export function TechMarquee() {
  return (
    <section
      aria-label="Technologies I work with"
      className="marquee-paused relative overflow-hidden border-y border-border py-7"
    >
      {/* Expose the technology list to assistive tech; the visual loop is
          decorative and announced only once. */}
      <ul className="sr-only">
        {marqueeItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-background to-transparent sm:w-28"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-background to-transparent sm:w-28"
      />
      <div aria-hidden className="flex w-max animate-marquee">
        <MarqueeRow />
        <MarqueeRow />
      </div>
    </section>
  );
}
