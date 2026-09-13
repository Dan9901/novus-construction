/**
 * Old placeholder project slugs mapped to the real projects that replaced them,
 * so any links or search results already pointing at them still land somewhere.
 *
 * Kept free of imports: next.config.ts loads this, and the config loader does
 * not resolve the "@/" path alias.
 */
export const legacyProjectRedirects: Record<string, string> = {
  "house-x": "open-plan-renovation",
  "house-y": "two-storey-rear-extension",
  "house-z": "brick-and-slate-new-build",
  "project-a": "sage-kitchen-dining",
  "project-b": "two-storey-rear-extension",
  "project-c": "single-storey-garden-extension",
};
