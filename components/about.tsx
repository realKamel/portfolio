import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { profile } from "@/lib/data";
import { cn } from "@/lib/utils";

const facts: { label: string; value: string; highlight?: boolean }[] = [
  { label: "Based in", value: profile.location },
  { label: "Focus", value: "Backend & Clean Architecture" },
  { label: "Languages", value: "Arabic (native) · English (professional)" },
  { label: "Availability", value: profile.availability, highlight: true },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-12">
        <SectionHeading
          title={
            <>
              A computer-science graduate who cares about the{" "}
              <span className="text-brand">architecture</span> behind the
              interface.
            </>
          }
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
              <p>{profile.bio}</p>
              <p>
                {profile.summary} {profile.summaryExtended}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <dl className="overflow-hidden rounded-2xl border border-border bg-card/40">
              {facts.map((fact, index) => (
                <div
                  key={fact.label}
                  className={cn(
                    "flex items-start justify-between gap-6 px-5 py-4",
                    index !== 0 && "border-t border-border",
                  )}
                >
                  <dt className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                    {fact.label}
                  </dt>
                  <dd className="max-w-[62%] text-right text-sm font-medium">
                    {fact.highlight ? (
                      <span className="text-brand">{fact.value}</span>
                    ) : (
                      fact.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
