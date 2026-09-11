"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * True once running in the browser after hydration. Useful for deferring
 * client-only rendering (e.g. portals) without an effect+setState "mounted"
 * pattern, which triggers an extra render pass.
 */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
}
