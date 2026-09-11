"use client";

import { motion } from "motion/react";

/**
 * Oversized closing wordmark — texture rather than content, so it is
 * aria-hidden and clipped to read as a printed edge, not a heading.
 *
 * Revealed with whileInView rather than scroll progress: this sits at the very
 * bottom of the document, where there is almost no scroll range left to drive
 * a scrubbed animation.
 */
export function FooterWordmark() {
  return (
    <div aria-hidden className="relative mt-14 overflow-hidden">
      <motion.span
        initial={{ y: "22%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px -40px 0px" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="block select-none whitespace-nowrap text-center font-display text-[clamp(3.5rem,17vw,15rem)] font-medium leading-[0.82] tracking-[-0.03em] text-background/15"
      >
        Novus
      </motion.span>
    </div>
  );
}
