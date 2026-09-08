"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { navLinks } from "@/data/nav";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-[background-color,border-color,box-shadow,padding] duration-300",
        scrolled
          ? "border-border bg-background/95 shadow-[0_1px_0_0_var(--border)] backdrop-blur-md"
          : "border-transparent bg-background"
      )}
    >
      <Container
        className={cn(
          "flex items-center justify-between transition-[padding] duration-300",
          scrolled ? "py-3" : "py-5"
        )}
      >
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground-soft transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <a
            href={siteConfig.phoneHref}
            className="flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-accent"
          >
            <Phone className="h-4 w-4" aria-hidden />
            {siteConfig.phoneDisplay}
          </a>
          <Button href="/contact">Request a Quote</Button>
        </div>

        <MobileNav />
      </Container>
    </header>
  );
}
