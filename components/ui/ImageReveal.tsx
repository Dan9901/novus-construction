"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const wipeTransition = { duration: 0.9, ease: [0.76, 0, 0.24, 1] as const };
const settleTransition = { duration: 1.1, ease: [0.16, 1, 0.3, 1] as const };

type ImageRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/**
 * Dramatic alternative to Reveal for hero-scale images: a solid panel wipes
 * away left-to-right as the image settles from a slight zoom, like a curtain
 * pulling back. Panel is aria-hidden and pointer-events-none throughout.
 */
export function ImageReveal({ children, className, delay = 0 }: ImageRevealProps) {
  const delaySeconds = delay / 1000;

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <motion.div
        initial={{ scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -80px 0px" }}
        transition={{ ...settleTransition, delay: delaySeconds }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 bg-foreground"
        style={{ originX: 1 }}
        initial={{ scaleX: 1 }}
        whileInView={{ scaleX: 0 }}
        viewport={{ once: true, margin: "0px 0px -80px 0px" }}
        transition={{ ...wipeTransition, delay: delaySeconds }}
      />
    </div>
  );
}
