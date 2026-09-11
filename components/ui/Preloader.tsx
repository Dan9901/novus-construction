"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, animate, motion } from "motion/react";
import { useIsClient } from "@/lib/useIsClient";
import { getLenis } from "@/lib/lenis";

const COUNT_SECONDS = 1.25;
const PANELS = 5;
const SESSION_KEY = "novus:intro-played";

let decision: boolean | null = null;

/**
 * Decided once per document. The intro is a front-door moment, so it is skipped
 * on deep links: someone arriving on a service or project page came for that
 * content, not for a brand animation.
 */
function shouldPlay(pathname: string): boolean {
  if (decision !== null) return decision;
  try {
    decision =
      pathname === "/" &&
      sessionStorage.getItem(SESSION_KEY) !== "1" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    decision = false;
  }
  return decision;
}

/**
 * First-visit intro: a counter runs to 100 behind the brand mark, then the
 * screen splits into panels that lift away. Plays once per session and never
 * gates the underlying content — the page is fully rendered and readable
 * beneath it the whole time, so it costs nothing in crawlability.
 */
export function Preloader() {
  const pathname = usePathname();
  const isClient = useIsClient();
  const [finished, setFinished] = useState(false);
  const [count, setCount] = useState(0);

  const active = isClient && !finished && shouldPlay(pathname);

  useEffect(() => {
    if (!active) return;

    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // Private-mode storage failures are not worth blocking the intro over.
    }

    const controls = animate(0, 100, {
      duration: COUNT_SECONDS,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (value) => setCount(Math.round(value)),
      onComplete: () => window.setTimeout(() => setFinished(true), 180),
    });

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    getLenis()?.stop();

    return () => {
      controls.stop();
      document.body.style.overflow = overflow;
      getLenis()?.start();
    };
  }, [active]);

  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[120] flex items-center justify-center"
          aria-hidden
          exit={{ transition: { duration: 0 } }}
        >
          <div className="absolute inset-0 flex">
            {Array.from({ length: PANELS }).map((_, index) => (
              <motion.div
                key={index}
                className="h-full flex-1 bg-background"
                initial={{ y: "0%" }}
                exit={{
                  y: "-100%",
                  transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: index * 0.06 },
                }}
              />
            ))}
          </div>

          <motion.div
            className="relative flex flex-col items-center gap-5"
            exit={{ opacity: 0, y: -28, transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] } }}
          >
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="block font-display text-5xl font-medium tracking-tight sm:text-7xl"
              >
                Novus
              </motion.span>
            </span>

            <div className="flex w-56 items-center gap-3 sm:w-72">
              <div className="relative h-px flex-1 bg-foreground/15">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-accent"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: COUNT_SECONDS, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <span className="w-10 text-right font-display text-sm tabular-nums text-muted">
                {count}
              </span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
