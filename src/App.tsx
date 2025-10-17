import "./App.css";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { NavBar } from "./components/NavBar";
import { RoutingProvider, useRouting } from "./shared/RoutingProvider";
import { useRef } from "react";
import { IconHome, IconUser } from "@tabler/icons-react";
import type { Route } from "./shared/Route";
import Hero from "./pages/Home/Hero";
import About from "./pages/Home/About";
import Skills from "./pages/Home/Skills";
import TechStack from "./pages/Home/TechStack";
import Projects from "./pages/Home/Projects";
import Experience from "./pages/Home/Experience";
import Contact from "./pages/Home/Contact";
import Footer from "./pages/Home/Footer";
import { ThemeProvider } from "./shared/ThemeProvider";

function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const experienceAndProjectRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const appRoutes: Route[] = [
    {
      RouteName: "Home",
      El: heroRef,
      Icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      RouteName: "About",
      El: aboutRef,
      Icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      RouteName: "Skills",
      El: skillsRef,
      Icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      RouteName: "Projects",
      El: experienceAndProjectRef,
      Icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      RouteName: "Contact",
      El: contactRef,
      Icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
  ];

  return (
    <>
      <ThemeProvider>
        <RoutingProvider initialRoutes={appRoutes}>
          <NavBar />
          {/* <ProgressiveBlur position="bottom" /> */}
          {/* <ScrollArea> */}
          <div ref={heroRef}>
            <Hero />
          </div>
          <div ref={aboutRef}>
            <About />
          </div>
          <div ref={skillsRef}>
            <Skills />
            <TechStack />
          </div>
          <div ref={experienceAndProjectRef}>
            <Projects />
            <Experience />
          </div>
          <div ref={contactRef}>
            <Contact />
            <Footer />
          </div>
          {/* </ScrollArea> */}
        </RoutingProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
