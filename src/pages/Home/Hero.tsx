import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { RippleButton } from "@/components/ui/ripple-button";
import { useRouting } from "@/shared/RoutingProvider";

export function Hero() {
  const { findRoute } = useRouting();
  const [windowSize, setWindowSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    const handelResize = () => {
      setWindowSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };
    window.addEventListener("reset", handelResize);
    handelResize();
    return () => window.removeEventListener("resize", handelResize);
  }, []);

  const contactLink = findRoute("contact");
  return (
    <>
      <BackgroundRippleEffect
        rows={Math.ceil(windowSize.height / 56)}
        cols={Math.ceil(windowSize.width / 56)}
        cellSize={56}
      />
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative z-50 flex h-dvh flex-col items-center justify-center gap-4 px-4">
        <div className="w-full">
          <h2 className="font-handwritten relative z-10 mx-auto max-w-4xl text-center text-5xl font-bold text-neutral-800 md:text-4xl lg:text-8xl dark:text-neutral-100">
            Hi, I'm Abdelrahman
          </h2>
          <div className="relative z-10 mx-auto mt-4 max-w-4xl text-center text-neutral-800 dark:text-neutral-100">
            <div>
              <p className="mt-4 flex flex-wrap items-center justify-center gap-1 text-center text-base text-neutral-600 dark:text-neutral-400">
                <span className="w-full">
                  Full Stack Web Developer, I craft fast, accessible, elegant, scalable web
                  experiences
                </span>
                <span className="flex items-center justify-center gap-1">
                  using
                  <span className="inline-flex items-center justify-center gap-0.5">
                    <img
                      className="size-5"
                      src="/src/assets/logos/angular_logo.svg"
                      alt="Angular Icon"
                    />
                    <span>Angular</span>
                  </span>{" "}
                  <span className="inline-flex items-center justify-center gap-0.5">
                    <img
                      className="size-5"
                      src="/src/assets/logos/react_logo.svg"
                      alt="React Icon"
                    />
                    <span>React</span>
                  </span>{" "}
                  and{" "}
                  <span className="relative inline-flex items-end justify-center">
                    <img
                      className="size-6"
                      src="src/assets/logos/dotnet_logo.svg"
                      alt="dotNet Icon"
                    />
                  </span>
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="CTAs flex items-center justify-center gap-x-1">
          <RippleButton
            rippleColor="#B3B3B3"
            type="button"
            className="w-fit rounded-full bg-black px-4 py-2 text-white dark:bg-white dark:text-black">
            Projects
          </RippleButton>

          <a
            download={console.log("Download Logic")}
            className="w-fit rounded-full bg-black px-4 py-2 text-white dark:bg-white dark:text-black">
            Download CV
          </a>
          <RippleButton
            onClick={() => {
              contactLink?.El.current?.scrollIntoView({ behavior: "smooth" });
            }}
            rippleColor="#B3B3B3"
            className="w-fit rounded-full bg-black px-4 py-2 text-white dark:bg-white dark:text-black">
            Let's Talk
          </RippleButton>
        </div>
      </motion.div>
    </>
  );
}

export default Hero;
