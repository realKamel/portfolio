import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { timeline } from "@/lib/data";

export function Journey() {
  return (
    <section
      id="journey"
      className="section-cv scroll-mt-24 border-t border-border py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-12">
        <SectionHeading
          title={
            <>
              Training and{" "}
              <span className="text-brand">education</span> that shaped how I
              build.
            </>
          }
        />

        <div className="mt-14 border-t border-border">
          {timeline.map((entry, index) => (
            <Reveal key={entry.title} delay={index * 0.08}>
              <article className="grid gap-4 border-b border-border py-10 sm:grid-cols-12 sm:gap-10">
                <div className="sm:col-span-3">
                  <span className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
                    {entry.period}
                  </span>
                </div>

                <div className="sm:col-span-9">
                  <h3 className="text-xl font-medium tracking-tight text-balance sm:text-2xl">
                    {entry.title}
                  </h3>
                  <p className="mt-1.5 text-sm font-medium text-brand">{entry.org}</p>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    {entry.meta}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {entry.description}
                  </p>

                  <ul className="mt-4 space-y-2">
                    {entry.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-brand" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {entry.tags.map((tag) => (
                      <li key={tag}>
                        <Badge
                          variant="outline"
                          className="bg-background/60 font-normal"
                        >
                          {tag}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
