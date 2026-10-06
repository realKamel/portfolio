"use client";

import { m, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download, MapPin } from "lucide-react";

import { AnimatedCounter } from "@/components/animated-counter";
import { Magnetic } from "@/components/magnetic";
import { Button } from "@/components/ui/button";
import { profile, stats } from "@/lib/data";
import { EASE, fadeUp, staggerContainer } from "@/lib/motion";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pt-44"
    >
      {/* Background: hairline grid + a single soft brand glow. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-lines absolute inset-0" />
        <div className="absolute -top-56 left-1/2 h-136 w-136 -translate-x-1/2 rounded-full bg-brand/10 blur-[130px]" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-12">
        <m.div variants={staggerContainer(0.09)} initial="hidden" animate="show">
          <m.div
            variants={fadeUp}
            className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card/60 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground backdrop-blur"
          >
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
            </span>
            {profile.availability}
          </m.div>

          <m.h1
            variants={fadeUp}
            className="mt-8 max-w-4xl text-4xl leading-[1.05] font-medium tracking-tight text-balance sm:text-6xl lg:text-7xl"
          >
            Building{" "}
            <span className="font-serif font-normal italic text-brand">
              scalable
            </span>
            , well-architected web applications with .NET&nbsp;&amp;&nbsp;Angular.
          </m.h1>

          <m.p
            variants={fadeUp}
            className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg"
          >
            {profile.summary} {profile.summaryExtended}
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
            <span className="inline-flex items-center gap-2 pl-1 text-sm text-muted-foreground">
              <MapPin className="size-3.5" />
              {profile.location}
            </span>
          </m.div>
        </m.div>

        <m.dl
          variants={staggerContainer(0.08, 0.45)}
          initial="hidden"
          animate="show"
          className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border pt-10 sm:mt-20 sm:grid-cols-4"
        >
          {stats.map((stat) => (
            <m.div key={stat.label} variants={fadeUp}>
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
            </m.div>
          ))}
        </m.dl>
      </div>

      <m.a
        href="#about"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6, ease: EASE }}
        className="mx-auto mt-16 hidden w-fit items-center gap-2 rounded-md font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 lg:flex"
      >
        <m.span
          animate={shouldReduceMotion ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="size-3.5" />
        </m.span>
        Scroll
      </m.a>
    </section>
  );
}
