"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AnimatePresence, motion, useMotionValue, type MotionValue } from "motion/react";
import { BlueprintHouse } from "./BlueprintHouse";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { useHasWebGL } from "@/lib/useHasWebGL";

const BUILD_SECONDS = 3.8;

const STAGES = [
  { at: 0, label: "Foundation" },
  { at: 0.16, label: "Structure" },
  { at: 0.46, label: "Openings" },
  { at: 0.62, label: "Roof" },
  { at: 0.99, label: "Complete" },
] as const;

function stageFor(t: number) {
  let index = 0;
  for (let i = 0; i < STAGES.length; i += 1) {
    if (t >= STAGES[i].at) index = i;
  }
  return index;
}

/** Advances build progress each frame and reports stage changes to React (a handful of updates, not per-frame). */
function BuildDriver({
  build,
  onStage,
  instant,
}: {
  build: MotionValue<number>;
  onStage: (index: number) => void;
  instant: boolean;
}) {
  const reported = useRef(-1);

  useFrame((_, delta) => {
    if (instant) {
      build.set(1);
    } else if (build.get() < 1) {
      build.set(Math.min(1, build.get() + delta / BUILD_SECONDS));
    }

    const next = stageFor(build.get());
    if (next !== reported.current) {
      reported.current = next;
      onStage(next);
    }
  });

  return null;
}

/**
 * The hero's 3D centrepiece: a blueprint house that erects itself foundation
 * first, then drifts with the pointer. Degrades to nothing (the parent renders
 * a static fallback) when WebGL is unavailable.
 */
export function HeroScene() {
  const progress = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const supported = useHasWebGL();
  const [stage, setStage] = useState(0);
  const [active, setActive] = useState(true);

  // Stop rendering entirely once the hero scrolls away — no wasted GPU on a page nobody is looking at.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "120px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleStage = useCallback((index: number) => setStage(index), []);

  return (
    <div ref={containerRef} className="absolute inset-0">
      {supported ? (
        <Canvas
          dpr={[1, 2]}
          frameloop={active ? "always" : "never"}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          camera={{ position: [10.1, 5.15, 11.9], fov: 30 }}
          style={{ pointerEvents: "none" }}
        >
          <BuildDriver build={progress} onStage={handleStage} instant={prefersReducedMotion} />
          <BlueprintHouse build={progress} pointerInfluence={prefersReducedMotion ? 0 : 0.26} />
        </Canvas>
      ) : null}

      <div
        className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2.5 sm:bottom-6 sm:left-6"
        hidden={!supported}
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-70" />
          {stage < STAGES.length - 1 ? (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent" />
          ) : null}
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={STAGES[stage].label}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
            >
              {STAGES[stage].label}
            </motion.span>
          </AnimatePresence>
        </span>
      </div>
    </div>
  );
}
