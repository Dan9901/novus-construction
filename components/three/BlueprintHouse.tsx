"use client";

import { useMemo, useRef, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import type { MotionValue } from "motion/react";
import { Edges, Grid } from "@react-three/drei";
import * as THREE from "three";

export type BuildProgress = MotionValue<number>;

const ACCENT = "#b8281e";
const INK = "#1b1712";
const CREAM = "#f7f4ee";

/** Vertical offset that centres the assembled house on the camera target. */
const BASE_Y = -1.82;

const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);

/**
 * One assembled element of the house. Rises into place and fades up over its
 * own slice of the global build progress, so the structure erects itself
 * foundation-first. Animation is driven by mutating three.js objects directly
 * in useFrame — no React re-renders per frame.
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
      // unreliable here — the material type is what actually distinguishes them.
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
  rotation = [0, 0, 0],
  accent = false,
}: {
  args: [number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
  accent?: boolean;
}) {
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={args} />
      <meshBasicMaterial color={CREAM} transparent opacity={0.06} depthWrite={false} />
      <Edges threshold={15} color={accent ? ACCENT : INK} linewidth={accent ? 1.9 : 1.3} transparent />
    </mesh>
  );
}

/** A flat opening drawn directly on a facade — single clean rectangle, no double outline. */
function Opening({
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
}: {
  width: number;
  height: number;
  depth: number;
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
      <Edges threshold={15} color={ACCENT} linewidth={1.9} transparent />
    </mesh>
  );
}

export function BlueprintHouse({
  build,
  pointerInfluence = 0.26,
}: {
  build: BuildProgress;
  pointerInfluence?: number;
}) {
  const root = useRef<THREE.Group>(null);
  const grid = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const node = root.current;
    if (!node) return;

    const elapsed = state.clock.getElapsedTime();
    const t = build.get();

    // Idle drift plus pointer parallax, eased so it never snaps.
    const targetY = Math.sin(elapsed * 0.16) * 0.14 + state.pointer.x * pointerInfluence;
    const targetX = 0.06 + -state.pointer.y * pointerInfluence * 0.45;

    node.rotation.y += (targetY - node.rotation.y) * Math.min(1, delta * 2.4);
    node.rotation.x += (targetX - node.rotation.x) * Math.min(1, delta * 2.4);
    node.position.y = BASE_Y + Math.sin(elapsed * 0.5) * 0.04;

    if (grid.current) {
      grid.current.traverse((child) => {
        const material = (child as THREE.Mesh).material as THREE.Material | undefined;
        if (material && !Array.isArray(material)) {
          material.opacity = clamp01(t / 0.12);
        }
      });
    }
  });

  return (
    <group ref={root} position={[-0.45, BASE_Y, 0]}>
      <group ref={grid} position={[0.45, 0, 0]}>
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

      {/* 1 — foundation slab */}
      <Part build={build} delay={0} drop={0.7} position={[0, 0.13, 0]}>
        <Solid args={[3.95, 0.26, 3.15]} />
      </Part>

      {/* 2 — main structure */}
      <Part build={build} delay={0.14} position={[0, 1.24, 0]}>
        <Solid args={[3.4, 1.96, 2.6]} />
      </Part>

      {/* 3 — side extension, the bread and butter of an Irish contractor */}
      <Part build={build} delay={0.3} drop={1.1} position={[2.16, 0.85, 0.34]}>
        <Solid args={[1.5, 1.18, 1.62]} />
      </Part>

      {/* 4 — openings drawn flat on each facade */}
      <Part build={build} delay={0.44} drop={0.5} span={0.24} position={[0, 0, 0]}>
        <Opening size={[0.56, 1.1]} position={[-0.95, 0.81, 1.302]} accent />
        <Opening size={[0.54, 0.62]} position={[0.3, 0.95, 1.302]} />
        <Opening size={[0.54, 0.62]} position={[1.18, 0.95, 1.302]} />
        <Opening size={[0.54, 0.58]} position={[-0.95, 1.79, 1.302]} />
        <Opening size={[0.54, 0.58]} position={[0.3, 1.79, 1.302]} />
        <Opening size={[0.54, 0.58]} position={[1.18, 1.79, 1.302]} />
        <Opening size={[0.62, 0.58]} position={[-1.702, 1.2, 0.24]} rotation={[0, Math.PI / 2, 0]} />
        <Opening size={[0.62, 0.58]} position={[-1.702, 1.2, -0.72]} rotation={[0, Math.PI / 2, 0]} />
        <Opening size={[1.1, 0.78]} position={[2.16, 0.88, 1.152]} />
      </Part>

      {/* 5 — roof: the one element carrying the brand colour */}
      <Part build={build} delay={0.58} drop={1.9} span={0.32} position={[0, 2.22, 0]}>
        <Roof width={3.72} height={1.24} depth={2.84} />
      </Part>

      <Part build={build} delay={0.78} drop={1.2} span={0.22} position={[0.86, 3.16, 0.42]}>
        <Solid args={[0.32, 0.86, 0.32]} />
        <Solid args={[0.44, 0.09, 0.44]} position={[0, 0.46, 0]} />
      </Part>
    </group>
  );
}
