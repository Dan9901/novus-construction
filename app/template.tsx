"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

/**
 * A template remounts on every navigation, which gives each route a clean
 * entrance without orchestrating exit animations across the router.
 *
 * Deliberately skipped on the very first render of a session: on a cold load
 * there is nothing to transition from, and painting a full-screen curtain over
 * the initial paint would both flash and delay the largest content element.
 */
let previousPath: string | null = null;

const PANELS = 6;

export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isNavigation = previousPath !== null && previousPath !== pathname;

  useEffect(() => {
    previousPath = pathname;
  }, [pathname]);

  if (!isNavigation) return <>{children}</>;

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-[110] overflow-hidden" aria-hidden>
        {/* Skewed and oversized: the shear turns a column wipe into a diagonal
            sweep, and the overscale keeps the corners covered while it shears. */}
        <div
          className="absolute flex"
          style={{
            left: "-30%",
            top: "-40%",
            width: "160%",
            height: "180%",
            transform: "skewX(-14deg) skewY(-5deg)",
          }}
        >
          {Array.from({ length: PANELS }).map((_, index) => (
            <motion.div
              key={index}
              className="h-full flex-1 bg-foreground"
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              style={{ originY: 0 }}
              transition={{
                duration: 0.5,
                ease: [0.76, 0, 0.24, 1],
                delay: index * 0.045,
              }}
            />
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.32, ease: "easeOut", delay: 0.16 }}
      >
        {children}
      </motion.div>
    </>
  );
}
