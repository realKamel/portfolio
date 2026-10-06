"use client";

import { m, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";

import { AnimatedCounter } from "@/components/animated-counter";
import { Magnetic } from "@/components/magnetic";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { profile, stats } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-24 pb-16 sm:pb-20"
    >
      {/* Ambient light only. No decorative grid lines. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-56 left-1/2 h-136 w-136 -translate-x-1/2 rounded-full bg-brand/8 blur-[130px]" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-12">
        <m.div
          variants={staggerContainer(0.09)}
          initial={shouldReduceMotion ? false : "hidden"}
          animate="show"
        >
          <m.div
            variants={fadeUp}
            className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card/60 px-3 py-1.5 font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase backdrop-blur"
          >
            <span aria-hidden className="size-1.5 rounded-full bg-brand" />
            {profile.availability}
          </m.div>

          <m.h1
            variants={fadeUp}
            className="mt-8 max-w-4xl text-4xl leading-[1.05] font-medium tracking-tight text-balance sm:text-6xl lg:text-7xl"
          >
            Building <span className="text-brand">scalable</span>,
            well-architected web applications with .NET&nbsp;&amp;&nbsp;Angular.
          </m.h1>

          <m.p
            variants={fadeUp}
            className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg"
          >
            {profile.summary}
          </m.p>

          <m.div
            variants={fadeUp}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <Button size="lg" render={<a href="#work" />}>
                View selected work
                <ArrowUpRight />
              </Button>
            </Magnetic>
            <Magnetic>
              <Button
                size="lg"
                variant="outline"
                render={
                  <a
                    href={profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                <Download />
                Résumé
              </Button>
            </Magnetic>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}

export function Stats() {
  return (
    <section
      aria-label="Key facts"
      className="border-t border-border py-14 sm:py-16"
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-12">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.06}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block text-3xl font-medium tracking-tight sm:text-4xl">
                  <AnimatedCounter
                    value={stat.value}
                    decimals={stat.decimals}
                    suffix={stat.suffix}
                  />
                </span>
                <span className="mt-2 block text-sm font-medium">
                  {stat.label}
                </span>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  {stat.detail}
                </span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
