"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AnimatePresence, motion, useMotionValue, type MotionValue } from "motion/react";
import { BlueprintScene, MODELS, type BlueprintModel } from "./BlueprintModels";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { useHasWebGL } from "@/lib/useHasWebGL";

const ASSEMBLE_SECONDS = 3.0;
const HOLD_SECONDS = 1.9;
const DISASSEMBLE_SECONDS = 1.25;

function stageFor(t: number, stages: BlueprintModel["stages"]) {
  let index = 0;
  for (let i = 0; i < stages.length; i += 1) {
    if (t >= stages[i].at) index = i;
  }
  return index;
}

/**
 * Runs the drawing cycle: each model assembles, holds, then dismantles itself
 * before the next one begins. Progress lives in a MotionValue so the per-frame
 * work never touches React — only stage and model changes do, a handful of
 * updates per cycle.
 */
function CycleDriver({
  build,
  stages,
  onStage,
  onModel,
  instant,
}: {
  build: MotionValue<number>;
  stages: BlueprintModel["stages"];
  onStage: (index: number) => void;
  onModel: (index: number) => void;
  instant: boolean;
}) {
  const phase = useRef<"in" | "hold" | "out">("in");
  const held = useRef(0);
  const modelIndex = useRef(0);
  const reportedStage = useRef(-1);

  useFrame((_, rawDelta) => {
    if (instant) {
      if (build.get() !== 1) build.set(1);
      return;
    }

    // Clamp so returning to a backgrounded tab doesn't jump the whole sequence.
    const delta = Math.min(rawDelta, 0.1);

    if (phase.current === "in") {
      const next = Math.min(1, build.get() + delta / ASSEMBLE_SECONDS);
      build.set(next);
      if (next >= 1) {
        phase.current = "hold";
        held.current = 0;
      }
    } else if (phase.current === "hold") {
      held.current += delta;
      if (held.current >= HOLD_SECONDS) phase.current = "out";
    } else {
      const next = Math.max(0, build.get() - delta / DISASSEMBLE_SECONDS);
      build.set(next);
      if (next <= 0) {
        modelIndex.current = (modelIndex.current + 1) % MODELS.length;
        onModel(modelIndex.current);
        reportedStage.current = -1;
        phase.current = "in";
      }
    }

    const next = stageFor(build.get(), stages);
    if (next !== reportedStage.current) {
      reportedStage.current = next;
      onStage(next);
    }
  });

  return null;
}

/**
 * The hero's 3D centrepiece: a rolling set of blueprint drawings — a new build,
 * a rear extension and a kitchen fit-out — each erecting itself stage by stage
 * before handing over to the next. Renders nothing without WebGL.
 */
export function HeroScene() {
  const progress = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const supported = useHasWebGL();
  const [modelIndex, setModelIndex] = useState(0);
  const [stage, setStage] = useState(0);
  const [active, setActive] = useState(true);

  // Stop rendering entirely once the hero scrolls away — no wasted GPU on a page nobody is looking at.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {
      rootMargin: "120px",
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleStage = useCallback((index: number) => setStage(index), []);
  const handleModel = useCallback((index: number) => {
    setModelIndex(index);
    setStage(0);
  }, []);

  const model = MODELS[modelIndex];
  const stageLabel = model.stages[Math.min(stage, model.stages.length - 1)].label;
  const isComplete = stage >= model.stages.length - 1;

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
          <CycleDriver
            build={progress}
            stages={model.stages}
            onStage={handleStage}
            onModel={handleModel}
            instant={prefersReducedMotion}
          />
          <BlueprintScene
            build={progress}
            model={model}
            pointerInfluence={prefersReducedMotion ? 0 : 0.26}
          />
        </Canvas>
      ) : null}

      <div
        className="pointer-events-none absolute left-4 top-4 flex items-center gap-2.5 sm:left-6 sm:top-6"
        hidden={!supported}
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-70" />
          {!isComplete ? (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent" />
          ) : null}
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={`${model.id}-${stageLabel}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
            >
              {stageLabel}
            </motion.span>
          </AnimatePresence>
        </span>
      </div>

      <span
        aria-hidden
        className="pointer-events-none absolute right-4 top-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted sm:right-6 sm:top-6"
        hidden={!supported}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={model.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block"
          >
            Dwg. {String(modelIndex + 1).padStart(2, "0")} — {model.label}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}
