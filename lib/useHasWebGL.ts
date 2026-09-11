"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

let cached: boolean | null = null;

/** Probe once and remember — the answer cannot change for the life of the document. */
function detect(): boolean {
  if (cached !== null) return cached;
  try {
    const canvas = document.createElement("canvas");
    cached = Boolean(
      window.WebGLRenderingContext && (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    cached = false;
  }
  return cached;
}

/**
 * SSR-safe WebGL capability check. Returns false on the server and during
 * hydration, then the real answer — so a 3D scene mounts only on a client that
 * can actually draw it, without ever causing a hydration mismatch.
 */
export function useHasWebGL(): boolean {
  return useSyncExternalStore(noopSubscribe, detect, () => false);
}
