import type Lenis from "lenis";

let instance: Lenis | null = null;

/** Registered by <SmoothScroll /> so other components can pause or jump the page. */
export function setLenis(next: Lenis | null) {
  instance = next;
}

export function getLenis() {
  return instance;
}
