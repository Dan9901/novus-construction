"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { navLinks } from "@/data/nav";
import { siteConfig } from "@/data/site-config";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const noopSubscribe = () => () => {};

/** True once running in the browser — lets us defer the portal until after hydration without an effect-triggered re-render. */
function useIsClient() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
}

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const mounted = useIsClient();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const panel = (
    <div
      id="mobile-nav-panel"
      aria-hidden={!open}
      inert={!open}
      className={cn(
        "fixed inset-0 z-40 flex flex-col bg-background transition-opacity duration-300",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      )}
    >
      <div className="flex flex-1 flex-col justify-between overflow-y-auto px-6 pt-28 pb-10">
        <nav aria-label="Mobile" className="flex flex-col">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "border-b border-border py-4 font-display text-3xl font-medium text-foreground transition-all duration-300 hover:text-accent",
                open ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0"
              )}
              style={{ transitionDelay: open ? `${index * 45}ms` : "0ms" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-10 flex flex-col gap-4">
          <a
            href={siteConfig.phoneHref}
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 text-lg font-semibold text-foreground"
          >
            <Phone className="h-5 w-5 text-accent" aria-hidden />
            {siteConfig.phoneDisplay}
          </a>
          <Button href="/contact" size="lg" className="w-full justify-center" onClick={() => setOpen(false)}>
            Request a Quote
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className="relative z-50 flex h-11 w-11 items-center justify-center border border-border text-foreground transition-colors hover:border-accent hover:text-accent"
      >
        {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
      </button>

      {mounted ? createPortal(panel, document.body) : null}
    </div>
  );
}
