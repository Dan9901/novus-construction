"use client";

import { useSyncExternalStore } from "react";

/**
 * SSR-safe media query hook. Returns `false` on the server and during the
 * client's first (hydration) render, then updates to the real value in a
 * normal post-mount update — safe to use for conditionally rendering
 * different content without causing a hydration mismatch.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}
