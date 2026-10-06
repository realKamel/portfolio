# Abdelrahman Ali Kamel — Portfolio

A dark, editorial personal portfolio for a full-stack .NET developer, built with
Next.js, Tailwind CSS v4, shadcn/ui, and Framer Motion.

## Stack

- **Next.js 16** (App Router, Turbopack, Cache Components)
- **React 19** with Server Components
- **Tailwind CSS v4** with CSS-first theme tokens
- **shadcn/ui** (base-ui primitives) for components
- **Framer Motion** for animation (`LazyMotion` + `m` for a small bundle)
- **lucide-react** for icons

## Getting Started

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
bun run build   # production build
bun run start   # serve the production build
bun run lint    # eslint
```

## Structure

```
app/
  layout.tsx            # fonts, metadata, providers, skip link
  page.tsx              # composes the sections
  globals.css           # design tokens + utilities (palette, marquee, grid)
components/
  site-header.tsx       # sticky nav with a mobile sheet menu
  hero.tsx              # animated headline + stats counters
  tech-marquee.tsx      # infinite technology marquee
  about.tsx             # bio + quick facts
  projects.tsx          # featured, case-study style project cards
  skills.tsx            # grouped skill cards
  journey.tsx           # experience + education timeline
  contact.tsx           # email CTA, socials, FAQ accordion
  site-footer.tsx
  ui/                   # shadcn/ui primitives
lib/
  data.ts               # ALL content lives here
  motion.ts             # shared animation variants
  get-current-year.ts   # cached helper (Cache Components friendly)
public/
  abdelrahman-ali-kamel-resume.pdf
```

## Editing content

Everything the page renders is defined in **`lib/data.ts`** — profile details,
stats, skills, timeline, projects, and FAQs. Update that file to change copy.

### Placeholder links

The project repository and demo URLs are currently pointed at the GitHub
profile. Search `lib/data.ts` for `TODO` and replace them with the real links.

## Design notes

- **Dark-only palette.** Tokens live in `:root` in `app/globals.css`; the
  `dark` class on `<html>` only declares the colour scheme. The single accent
  (`--brand`, a lime/chartreuse) is used sparingly for highlights and hovers.
- **Motion.** `components/motion-provider.tsx` wraps the app in `LazyMotion`
  with `strict`, so every animated element must use `m` (not `motion`). All
  scroll reveals and hovers collapse gracefully under
  `prefers-reduced-motion`.
- **Accessibility.** Semantic landmarks, a skip link, focus-visible rings,
  labelled icon buttons, and a keyboard-friendly mobile menu.

