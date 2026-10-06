import { Download, Mail } from "lucide-react";
import dynamic from "next/dynamic";

import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { CopyEmailButton } from "@/components/copy-email-button";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { profile, socials } from "@/lib/data";

// Split the accordion into its own chunk so base-ui's components stay out of
// the initial bundle; still server-rendered so the FAQ remains in the HTML.
const FaqAccordion = dynamic(() =>
  import("@/components/faq-accordion").then((mod) => mod.FaqAccordion),
);

export function Contact() {
  return (
    <section
      id="contact"
      className="section-cv scroll-mt-24 border-t border-border py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-12">
        <SectionHeading
          title={
            <>
              Let’s build something{" "}
              <span className="text-brand">worth shipping</span>.
            </>
          }
          description="Open to full-stack and backend roles, freelance work, and interesting collaborations. Email is the fastest way to reach me."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <a href={`mailto:${profile.email}`} className="group block rounded-sm focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
              <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                Email
              </p>
              <p className="mt-3 text-2xl font-medium tracking-tight wrap-break-word transition-colors group-hover:text-brand sm:text-3xl">
                {profile.email}
              </p>
            </a>

            <div className="mt-8 flex flex-wrap gap-3">
              <CopyEmailButton email={profile.email} />
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
            </div>

            <div className="mt-10">
              <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                Elsewhere
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {socials.map((social) => (
                  <li key={social.label}>
                    <Button
                      variant="outline"
                      size="sm"
                      render={
                        <a
                          href={social.href}
                          target={social.kind === "mail" ? undefined : "_blank"}
                          rel={
                            social.kind === "mail"
                              ? undefined
                              : "noopener noreferrer"
                          }
                        />
                      }
                    >
                      {social.kind === "github" ? (
                        <GithubIcon className="size-4" />
                      ) : social.kind === "linkedin" ? (
                        <LinkedinIcon className="size-4" />
                      ) : (
                        <Mail />
                      )}
                      {social.label}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
              Good to know
            </p>
            <FaqAccordion />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
