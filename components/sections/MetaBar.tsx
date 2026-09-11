import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/data/site-config";

/**
 * Editorial "ticker" strip — studio-style meta line pairing the brand with
 * its craft, location and founding year, separated by thin rules.
 */
export function MetaBar() {
  return (
    <div className="border-y border-border bg-background">
      <Container className="flex flex-col items-center gap-3 py-5 text-center sm:flex-row sm:gap-4 sm:py-6 sm:text-left">
        <span className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground">
          {siteConfig.shortName} Construction
          <span className="mx-2 text-muted">—</span>
          New Builds · Extensions · Renovations
        </span>
        <span className="hidden h-px flex-1 bg-border sm:block" aria-hidden />
        <span className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
          [&nbsp;Based in Dublin, Ireland&nbsp;]
        </span>
        <span className="hidden h-px flex-1 bg-border sm:block" aria-hidden />
        <span className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
          Est. {siteConfig.founded}
        </span>
      </Container>
    </div>
  );
}
