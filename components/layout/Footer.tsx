import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { GoogleIcon } from "@/components/icons/SocialIcons";
import { navLinks } from "@/data/nav";
import { services } from "@/data/services";
import { siteConfig } from "@/data/site-config";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-background/10 bg-foreground pb-20 text-background lg:pb-0">
      <Container className="py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div className="flex flex-col gap-5">
            <Logo tone="dark" />
            <p className="max-w-xs text-sm leading-relaxed text-background/60">
              Specialist services in all areas of renovation and construction, from design and
              planning through to completion.
            </p>
            <a
              href={siteConfig.googleProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 self-start border border-background/25 px-4 py-2.5 text-sm font-semibold text-background transition-colors hover:border-accent hover:text-accent"
            >
              <GoogleIcon className="h-4 w-4" aria-hidden />
              Find Us on Google
            </a>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-background/50">
              Navigation
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/75 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-background/50">
              Services
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {services.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-background/75 transition-colors hover:text-accent"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-background/50">
              Contact
            </h3>
            <ul className="mt-5 flex flex-col gap-4">
              <li>
                <a
                  href={siteConfig.phoneHref}
                  className="flex items-start gap-3 text-sm text-background/85 transition-colors hover:text-accent"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.emailHref}
                  className="flex items-start gap-3 text-sm text-background/85 transition-colors hover:text-accent"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-background/10 pt-8 text-xs text-background/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {siteConfig.name} Ltd. All rights reserved.
          </p>
          <p>Placeholder content for demonstration purposes.</p>
        </div>
      </Container>
    </footer>
  );
}
