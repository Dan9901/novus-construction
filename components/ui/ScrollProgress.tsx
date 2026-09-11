"use client";

import { motion, useScroll } from "motion/react";

/** Thin accent progress bar pinned to the very top of the viewport, tracking page scroll. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-accent"
      style={{ scaleX: scrollYProgress }}
      aria-hidden
    />
  );
}
