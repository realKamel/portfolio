import { About } from "@/components/about";
import { BackToTop } from "@/components/back-to-top";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { Journey } from "@/components/journey";
import { Projects } from "@/components/projects";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Skills } from "@/components/skills";
import { TechMarquee } from "@/components/tech-marquee";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Hero />
        <TechMarquee />
        <About />
        <Projects />
        <Skills />
        <Journey />
        <Contact />
      </main>
      <SiteFooter />
      <BackToTop />
    </>
  );
}
