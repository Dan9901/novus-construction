"use client";

import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

const container = (stagger: number, delay: number): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const word: Variants = {
  hidden: { y: "110%", rotate: 3 },
  visible: {
    y: "0%",
    rotate: 0,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

type SplitTextProps = {
  text: string;
  className?: string;
  /** Seconds before the first word moves. */
  delay?: number;
  stagger?: number;
  /** Trigger when scrolled into view rather than immediately on mount. */
  onScroll?: boolean;
  /** Words rendered in the accent colour — matched case-insensitively, punctuation ignored. */
  highlight?: string[];
};

/**
 * Headline reveal where each word slides up out of its own clipping mask.
 * Words remain real text nodes in document order, so selection, search and
 * screen readers are unaffected.
 */
export function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.055,
  onScroll = false,
  highlight = [],
}: SplitTextProps) {
  const words = text.split(" ");
  const highlighted = new Set(highlight.map((entry) => entry.toLowerCase()));

  const activation = onScroll
    ? { whileInView: "visible" as const, viewport: { once: true, margin: "0px 0px -90px 0px" } }
    : { animate: "visible" as const };

  return (
    <motion.span
      className={cn("block", className)}
      initial="hidden"
      variants={container(stagger, delay)}
      {...activation}
    >
      {words.map((entry, index) => {
        const bare = entry.toLowerCase().replace(/[.,—:;!?]/g, "");
        return (
          <span
            key={`${entry}-${index}`}
            className="inline-block overflow-hidden align-bottom pb-[0.08em]"
          >
            <motion.span
              variants={word}
              className={cn("inline-block", highlighted.has(bare) && "italic text-accent")}
            >
              {entry}
            </motion.span>
            {index < words.length - 1 ? <span className="inline-block">&nbsp;</span> : null}
          </span>
        );
      })}
    </motion.span>
  );
}
