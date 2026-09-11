"use client";

import { motion } from "motion/react";
import { services } from "@/data/services";

const entries = services.slice(0, 7).map((service) => service.title);

function Run({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={ariaHidden}>
      {entries.map((title) => (
        <span key={title} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-display text-3xl font-medium tracking-tight text-background sm:px-9 sm:text-4xl md:text-5xl">
            {title}
          </span>
          <span className="text-background/45" aria-hidden>
            ✳
          </span>
        </span>
      ))}
    </div>
  );
}

/**
 * Full-bleed scrolling band of what Novus actually does. The second run is a
 * duplicate shifted by exactly half the track, so the -50% loop is seamless;
 * it's aria-hidden to keep the list from being announced twice.
 */
export function ServicesMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-accent-dark/30 bg-accent py-5 sm:py-7">
      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 34, ease: "linear", repeat: Infinity }}
      >
        <Run />
        <Run ariaHidden />
      </motion.div>
    </div>
  );
}
