import { Code, Database, Layers, Monitor, Server, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { skillGroups, type SkillGroup } from "@/lib/data";

const icons: Record<SkillGroup["icon"], LucideIcon> = {
  code: Code,
  server: Server,
  monitor: Monitor,
  layers: Layers,
  database: Database,
  tools: Wrench,
};

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 border-t border-border py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-12">
        <SectionHeading
          index="03"
          eyebrow="Toolkit"
          title={
            <>
              The stack I reach for when a project has to{" "}
              <span className="font-serif font-normal italic text-brand">
                hold up
              </span>
              .
            </>
          }
          description="Grouped by where each piece lives in the stack — from the language I write to the tools I ship with."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => {
            const Icon = icons[group.icon];
            return (
              <Reveal key={group.key} delay={index * 0.05}>
                <Card className="h-full bg-card/40 transition-colors duration-300 hover:ring-brand/40">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <span className="grid size-9 place-items-center rounded-lg border border-border bg-background text-brand">
                        <Icon className="size-4" />
                      </span>
                      <span className="font-mono text-[11px] text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <CardTitle className="mt-4 text-lg">{group.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <li key={item}>
                          <Badge
                            variant="outline"
                            className="bg-background/60 font-normal"
                          >
                            {item}
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
