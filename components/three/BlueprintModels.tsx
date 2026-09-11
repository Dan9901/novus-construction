"use client";

import { useMemo, useRef, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import { Edges, Grid } from "@react-three/drei";
import type { MotionValue } from "motion/react";
import * as THREE from "three";

export type BuildProgress = MotionValue<number>;

const ACCENT = "#b8281e";
const INK = "#1b1712";
const CREAM = "#f7f4ee";

const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);

/**
 * One assembled element. Rises into place and fades up over its own slice of
 * the global build progress, so a drawing erects itself in stages — and, when
 * progress runs backwards, dismantles itself roof-first.
 *
 * Animation mutates three.js objects directly in useFrame: no React
 * re-renders per frame.
 */
function Part({
  build,
  delay,
  span = 0.28,
  drop = 1.4,
  faceOpacity = 0.06,
  position = [0, 0, 0],
  children,
}: {
  build: BuildProgress;
  delay: number;
  span?: number;
  drop?: number;
  faceOpacity?: number;
  position?: [number, number, number];
  children: ReactNode;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    const node = group.current;
    if (!node) return;

    const p = easeOutCubic(clamp01((build.get() - delay) / span));
    node.position.y = position[1] + (1 - p) * drop;
    node.visible = p > 0.001;

    node.traverse((child) => {
      const material = (child as THREE.Mesh).material as THREE.Material | undefined;
      if (!material || Array.isArray(material)) return;
      // drei's <Edges> draws fat lines via a Mesh subclass, so the object type is
      // unreliable here — the material type is what distinguishes them.
      const isFace = material.type === "MeshBasicMaterial";
      material.transparent = true;
      material.opacity = (isFace ? faceOpacity : 1) * p;
    });
  });

  return (
    <group ref={group} position={position}>
      {children}
    </group>
  );
}

/** Faint translucent solid + crisp edge outline — the architectural model look. */
function Solid({
  args,
  position = [0, 0, 0],
  accent = false,
}: {
  args: [number, number, number];
  position?: [number, number, number];
  accent?: boolean;
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={args} />
      <meshBasicMaterial color={CREAM} transparent opacity={0.06} depthWrite={false} />
      <Edges threshold={15} color={accent ? ACCENT : INK} linewidth={accent ? 1.9 : 1.3} transparent />
    </mesh>
  );
}

/** A flat rectangle — openings, glazing and walls. One clean outline, no double edge. */
function Panel({
  size,
  position,
  rotation = [0, 0, 0],
  accent = false,
}: {
  size: [number, number];
  position: [number, number, number];
  rotation?: [number, number, number];
  accent?: boolean;
}) {
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={size} />
      <meshBasicMaterial
        color={accent ? ACCENT : INK}
        transparent
        opacity={0.05}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
      <Edges threshold={15} color={accent ? ACCENT : INK} linewidth={accent ? 1.7 : 1.15} transparent />
    </mesh>
  );
}

/** Gable roof built by extruding a triangle profile along the depth axis. */
function Roof({
  width,
  height,
  depth,
  accent = true,
}: {
  width: number;
  height: number;
  depth: number;
  accent?: boolean;
}) {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-width / 2, 0);
    shape.lineTo(width / 2, 0);
    shape.lineTo(0, height);
    shape.closePath();

    const geo = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false });
    geo.translate(0, 0, -depth / 2);
    return geo;
  }, [width, height, depth]);

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial color={CREAM} transparent opacity={0.06} depthWrite={false} />
      <Edges threshold={15} color={accent ? ACCENT : INK} linewidth={1.9} transparent />
    </mesh>
  );
}

/* ── Drawing 01 — Residential new build ─────────────────────────────────── */

function ResidentialModel({ build }: { build: BuildProgress }) {
  return (
    <>
      <Part build={build} delay={0} drop={0.7} position={[0, 0.13, 0]}>
        <Solid args={[3.95, 0.26, 3.15]} />
      </Part>

      <Part build={build} delay={0.16} position={[0, 1.24, 0]}>
        <Solid args={[3.4, 1.96, 2.6]} />
      </Part>

      <Part build={build} delay={0.3} drop={1.1} position={[2.16, 0.85, 0.34]}>
        <Solid args={[1.5, 1.18, 1.62]} />
      </Part>

      <Part build={build} delay={0.46} drop={0.5} span={0.24} position={[0, 0, 0]}>
        <Panel size={[0.56, 1.1]} position={[-0.95, 0.81, 1.302]} accent />
        <Panel size={[0.54, 0.62]} position={[0.3, 0.95, 1.302]} />
        <Panel size={[0.54, 0.62]} position={[1.18, 0.95, 1.302]} />
        <Panel size={[0.54, 0.58]} position={[-0.95, 1.79, 1.302]} />
        <Panel size={[0.54, 0.58]} position={[0.3, 1.79, 1.302]} />
        <Panel size={[0.54, 0.58]} position={[1.18, 1.79, 1.302]} />
        <Panel size={[0.62, 0.58]} position={[-1.702, 1.2, 0.24]} rotation={[0, Math.PI / 2, 0]} />
        <Panel size={[0.62, 0.58]} position={[-1.702, 1.2, -0.72]} rotation={[0, Math.PI / 2, 0]} />
        <Panel size={[1.1, 0.78]} position={[2.16, 0.88, 1.152]} />
      </Part>

      <Part build={build} delay={0.62} drop={1.9} span={0.32} position={[0, 2.22, 0]}>
        <Roof width={3.72} height={1.24} depth={2.84} />
      </Part>

      <Part build={build} delay={0.82} drop={1.2} span={0.22} position={[0.86, 3.16, 0.42]}>
        <Solid args={[0.32, 0.86, 0.32]} />
        <Solid args={[0.44, 0.09, 0.44]} position={[0, 0.46, 0]} />
      </Part>
    </>
  );
}

/* ── Drawing 02 — Rear two-storey extension ─────────────────────────────── */

function ExtensionModel({ build }: { build: BuildProgress }) {
  return (
    <>
      {/* slab spans the original footprint and the new one */}
      <Part build={build} delay={0} drop={0.7} position={[0, 0.13, -0.85]}>
        <Solid args={[3.5, 0.26, 4.2]} />
      </Part>

      {/* existing house */}
      <Part build={build} delay={0.16} position={[0, 1.24, 0]}>
        <Solid args={[3.05, 1.96, 2.25]} />
      </Part>

      <Part build={build} delay={0.28} drop={1.7} span={0.26} position={[0, 2.22, 0]}>
        <Roof width={3.32} height={1.12} depth={2.45} accent={false} />
      </Part>

      {/* the new two-storey box off the rear */}
      <Part build={build} delay={0.42} drop={1.5} span={0.3} position={[0.1, 1.21, -1.98]}>
        <Solid args={[2.3, 1.9, 1.75]} accent />
      </Part>

      {/* flat roof over the extension */}
      <Part build={build} delay={0.58} drop={1.2} span={0.22} position={[0.1, 2.23, -1.98]}>
        <Solid args={[2.42, 0.14, 1.87]} accent />
      </Part>

      {/* glazing: sliding doors below, window above, plus a rooflight */}
      <Part build={build} delay={0.7} drop={0.5} span={0.26} position={[0, 0, 0]}>
        <Panel size={[1.62, 1.12]} position={[0.1, 0.84, -2.857]} accent />
        <Panel size={[1.25, 0.66]} position={[0.1, 1.84, -2.857]} accent />
        <Panel size={[0.72, 0.62]} position={[1.252, 1.5, -1.98]} rotation={[0, Math.PI / 2, 0]} />
        <Panel size={[0.72, 0.62]} position={[-1.052, 1.5, -1.98]} rotation={[0, Math.PI / 2, 0]} />
        <Panel size={[0.9, 0.7]} position={[0.1, 2.305, -1.98]} rotation={[Math.PI / 2, 0, 0]} accent />
        <Panel size={[0.52, 1.06]} position={[-0.85, 0.79, 1.128]} />
        <Panel size={[0.5, 0.6]} position={[0.62, 0.95, 1.128]} />
        <Panel size={[0.5, 0.56]} position={[-0.85, 1.78, 1.128]} />
        <Panel size={[0.5, 0.56]} position={[0.62, 1.78, 1.128]} />
      </Part>
    </>
  );
}

/* ── Drawing 03 — Kitchen fit-out ───────────────────────────────────────── */

function KitchenModel({ build }: { build: BuildProgress }) {
  return (
    <>
      {/* floor plate and the two walls that define the corner */}
      <Part build={build} delay={0} drop={0.6} position={[0, 0.04, 0]}>
        <Solid args={[3.7, 0.08, 3.1]} />
      </Part>

      <Part build={build} delay={0.12} drop={1.0} span={0.24} position={[0, 0, 0]}>
        <Panel size={[3.7, 2.4]} position={[0, 1.28, -1.55]} />
        <Panel size={[3.1, 2.4]} position={[-1.85, 1.28, 0]} rotation={[0, Math.PI / 2, 0]} />
      </Part>

      {/* base run and tall housing */}
      <Part build={build} delay={0.24} drop={0.9} span={0.26} position={[0, 0, 0]}>
        <Solid args={[2.5, 0.86, 0.62]} position={[-0.5, 0.51, -1.23]} />
        <Solid args={[0.72, 2.0, 0.62]} position={[1.28, 1.08, -1.23]} />
      </Part>

      {/* worktops and splashback */}
      <Part build={build} delay={0.46} drop={0.5} span={0.22} position={[0, 0, 0]}>
        <Solid args={[2.58, 0.07, 0.68]} position={[-0.5, 0.975, -1.22]} accent />
        <Panel size={[2.5, 0.42]} position={[-0.5, 1.21, -1.543]} />
      </Part>

      {/* wall units and window */}
      <Part build={build} delay={0.56} drop={0.7} span={0.22} position={[0, 0, 0]}>
        <Solid args={[1.1, 0.68, 0.34]} position={[-1.2, 1.72, -1.37]} />
        <Panel size={[1.15, 0.82]} position={[0.32, 1.68, -1.543]} />
      </Part>

      {/* island, worktop and pendants */}
      <Part build={build} delay={0.68} drop={1.1} span={0.26} position={[0, 0, 0]}>
        <Solid args={[1.85, 0.88, 0.92]} position={[0.05, 0.52, 0.5]} />
        <Solid args={[2.05, 0.07, 1.12]} position={[0.05, 0.995, 0.5]} accent />
      </Part>

      {/* Ceiling drawn as an outline only (no fill) so it frames the room and
          gives the pendants something to hang from, without hazing the view. */}
      <Part build={build} delay={0.8} drop={0.5} span={0.2} faceOpacity={0} position={[0, 0, 0]}>
        <Panel size={[3.7, 3.1]} position={[0, 2.44, 0]} rotation={[Math.PI / 2, 0, 0]} />
      </Part>

      <Part build={build} delay={0.86} drop={0.9} span={0.18} position={[0, 0, 0]}>
        <Solid args={[0.025, 0.82, 0.025]} position={[-0.42, 2.03, 0.5]} />
        <Solid args={[0.24, 0.22, 0.24]} position={[-0.42, 1.51, 0.5]} accent />
        <Solid args={[0.025, 0.82, 0.025]} position={[0.52, 2.03, 0.5]} />
        <Solid args={[0.24, 0.22, 0.24]} position={[0.52, 1.51, 0.5]} accent />
        <Solid args={[0.4, 0.76, 0.4]} position={[0.05, 0.38, 1.34]} />
      </Part>
    </>
  );
}

/* ── Model registry ─────────────────────────────────────────────────────── */

export type BlueprintModel = {
  id: string;
  label: string;
  stages: { at: number; label: string }[];
  /** Applied to the model group so each drawing fills the same frame. */
  offset: [number, number, number];
  scale: number;
  /** Base yaw, applied under the pointer parallax, so each drawing faces the viewer side-on to its subject. */
  rotationY?: number;
  Component: (props: { build: BuildProgress }) => ReactNode;
};

export const MODELS: BlueprintModel[] = [
  {
    id: "residential",
    label: "Residential",
    offset: [-0.45, -1.82, 0],
    scale: 1,
    stages: [
      { at: 0, label: "Foundation" },
      { at: 0.16, label: "Structure" },
      { at: 0.46, label: "Openings" },
      { at: 0.62, label: "Roof" },
      { at: 0.99, label: "Complete" },
    ],
    Component: ResidentialModel,
  },
  {
    id: "extension",
    label: "Rear Extension",
    offset: [0, -1.74, -0.85],
    scale: 0.98,
    // Turned to the garden elevation: the glazing is the point of a rear extension.
    rotationY: Math.PI,
    stages: [
      { at: 0, label: "Foundation" },
      { at: 0.16, label: "Existing" },
      { at: 0.42, label: "Extension" },
      { at: 0.7, label: "Glazing" },
      { at: 0.99, label: "Complete" },
    ],
    Component: ExtensionModel,
  },
  {
    id: "kitchen",
    label: "Kitchen Fit-Out",
    offset: [0, -1.18, 0],
    scale: 1.24,
    stages: [
      { at: 0, label: "Floor Plan" },
      { at: 0.24, label: "Units" },
      { at: 0.46, label: "Worktops" },
      { at: 0.68, label: "Island" },
      { at: 0.99, label: "Complete" },
    ],
    Component: KitchenModel,
  },
];

/* ── Scene ──────────────────────────────────────────────────────────────── */

export function BlueprintScene({
  build,
  model,
  pointerInfluence = 0.26,
}: {
  build: BuildProgress;
  model: BlueprintModel;
  pointerInfluence?: number;
}) {
  const root = useRef<THREE.Group>(null);
  const grid = useRef<THREE.Group>(null);
  const Model = model.Component;

  useFrame((state, delta) => {
    const node = root.current;
    if (!node) return;

    const elapsed = state.clock.getElapsedTime();

    // Idle drift plus pointer parallax, eased so it never snaps.
    const targetY = Math.sin(elapsed * 0.16) * 0.14 + state.pointer.x * pointerInfluence;
    const targetX = 0.06 + -state.pointer.y * pointerInfluence * 0.45;

    node.rotation.y += (targetY - node.rotation.y) * Math.min(1, delta * 2.4);
    node.rotation.x += (targetX - node.rotation.x) * Math.min(1, delta * 2.4);
    node.position.y = model.offset[1] + Math.sin(elapsed * 0.5) * 0.04;

    if (grid.current) {
      grid.current.traverse((child) => {
        const material = (child as THREE.Mesh).material as THREE.Material | undefined;
        if (material && !Array.isArray(material)) {
          material.opacity = clamp01(build.get() / 0.12);
        }
      });
    }
  });

  return (
    <group ref={root} position={model.offset} scale={model.scale}>
      <group ref={grid} position={[-model.offset[0], 0, -model.offset[2]]}>
        <Grid
          args={[14, 12]}
          cellSize={0.42}
          cellThickness={0.35}
          cellColor={INK}
          sectionSize={2.1}
          sectionThickness={0.65}
          sectionColor={INK}
          fadeDistance={26}
          fadeStrength={0.9}
          followCamera={false}
          side={THREE.DoubleSide}
        />
      </group>

      <group rotation-y={model.rotationY ?? 0}>
        <Model build={build} />
      </group>
    </group>
  );
}
