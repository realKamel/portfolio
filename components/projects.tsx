import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { GithubIcon } from "@/components/brand-icons";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects, type Project } from "@/lib/data";

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-border bg-card/40 p-6 transition-colors duration-500 hover:border-brand/40 sm:p-8 lg:p-10">
      {/* Hover glow - invisible until the card is hovered. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-brand/0 blur-3xl transition-colors duration-500 group-hover:bg-brand/10"
      />
      {/* Decorative placeholder visual. Replace with a real project screenshot. */}
      <div className="relative -mx-6 -mt-6 mb-8 aspect-video overflow-hidden sm:-mx-8 sm:-mt-8 lg:-mx-10 lg:-mt-10">
        <Image
          src={project.image}
          alt=""
          width={1600}
          height={900}
          sizes="(min-width: 1024px) 1024px, 100vw"
          className="h-full w-full object-cover grayscale transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-card via-card/40 to-transparent"
        />
      </div>

      <div className="relative flex flex-wrap items-center gap-3 font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
        <span>{project.year}</span>
        {project.status ? (
          <Badge
            variant="secondary"
            className="font-mono text-[10px] tracking-[0.14em] uppercase"
          >
            {project.status}
          </Badge>
        ) : null}
      </div>

      <div className="relative mt-6 grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <h3 className="text-2xl font-medium tracking-tight sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-2 text-base text-muted-foreground">
            {project.subtitle}
          </p>

          <ul className="mt-6 space-y-3">
            {project.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
              >
                <span className="mt-1.75 size-1 shrink-0 rounded-full bg-brand" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-8 lg:col-span-5">
          <div>
            <p className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
              Stack
            </p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
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

          <div className="flex flex-wrap gap-2 lg:mt-auto">
            {project.links.map((link) => (
              <Button
                key={link.label}
                variant="outline"
                size="sm"
                render={
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} - ${link.label}`}
                  />
                }
              >
                {link.kind === "github" ? (
                  <GithubIcon className="size-4" />
                ) : (
                  <ArrowUpRight />
                )}
                {link.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section id="work" className="scroll-mt-24 border-t border-border py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Selected work"
          title={
            <>
              Projects where the{" "}
              <span className="text-brand">architecture</span>{" "}
              carries the product.
            </>
          }
          description="A few builds that show how I think about systems: from domain modelling and API design to the frontend that consumes them."
        />

        <div className="mt-14 flex flex-col gap-6">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.05}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
