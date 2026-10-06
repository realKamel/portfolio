import { Mail } from "lucide-react";

import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { navLinks, profile, socials } from "@/lib/data";
import { getCurrentYear } from "@/lib/get-current-year";

export function SiteFooter() {
  const year = getCurrentYear();

  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div>
            <a href="#top" className="group inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
              <span className="grid size-8 place-items-center rounded-lg border border-border bg-card font-mono text-[11px] font-semibold transition-colors group-hover:border-brand/60 group-hover:text-brand">
                {profile.monogram}
              </span>
              <span className="text-sm font-medium">{profile.name}</span>
            </a>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              {profile.role} · {profile.location}
            </p>
          </div>

          <nav className="flex flex-col gap-2.5" aria-label="Footer">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <ul className="flex gap-2">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target={social.kind === "mail" ? undefined : "_blank"}
                  rel={social.kind === "mail" ? undefined : "noopener noreferrer"}
                  className="grid size-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-brand/60 hover:text-brand focus-visible:border-brand/60 focus-visible:text-brand focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <span className="sr-only">{social.label}</span>
                  {social.kind === "github" ? (
                    <GithubIcon className="size-4" />
                  ) : social.kind === "linkedin" ? (
                    <LinkedinIcon className="size-4" />
                  ) : (
                    <Mail className="size-4" />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name}. All rights reserved.
          </p>
          <p className="font-mono">
            Built with Next.js, Tailwind CSS &amp; Framer Motion.
          </p>
        </div>
      </div>
    </footer>
  );
}
