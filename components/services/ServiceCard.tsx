"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { useSpotlight } from "@/lib/useSpotlight";
import type { Service } from "@/data/services";

const MotionLink = motion.create(Link);

export function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  const { onMouseMove, background } = useSpotlight();

  return (
    <MotionLink
      href={`/services/${service.slug}`}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      onMouseMove={onMouseMove}
      className="group relative flex flex-col overflow-hidden border border-border bg-background transition-[color,background-color,border-color,box-shadow] duration-300 hover:border-accent/60 hover:shadow-[0_24px_48px_-28px_rgba(27,23,18,0.35)]"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background }}
      />
      <PlaceholderImage
        label={service.image?.alt ?? service.placeholderTag}
        category={service.placeholderCategory}
        ratio="aspect-[4/3]"
        index={index}
        src={service.image?.src}
      />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="font-display text-xl font-medium tracking-tight">{service.title}</h3>
        <p className="flex-1 text-sm leading-relaxed text-muted">{service.shortDescription}</p>
        <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors group-hover:text-accent">
          Learn More
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        </span>
      </div>
    </MotionLink>
  );
}
