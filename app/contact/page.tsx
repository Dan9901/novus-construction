import type { Metadata } from "next";
import { Clock, Mail, Phone } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Contact & Get a Quote",
  description:
    "Get in touch with Novus Construction by phone or email, or request a free quote for your new build, extension or renovation project.",
};

const contactDetails = [
  {
    icon: Phone,
    label: "Phone",
    value: siteConfig.phoneDisplay,
    href: siteConfig.phoneHref,
  },
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: siteConfig.emailHref,
  },
  {
    icon: Clock,
    label: "Hours",
    value: siteConfig.hours,
    href: undefined,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get In Touch"
        title="Let's Talk About Your Project"
        description="Have you an idea, a vision, or a dream in mind for your home? Call, email, or fill in the form below and we'll get back to you with a clear, no-obligation quote."
      />

      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <Reveal>
              <div className="flex flex-col gap-4">
                {contactDetails.map((detail) => {
                  const Icon = detail.icon;
                  const content = (
                    <div className="flex items-start gap-4 border border-border bg-surface p-6 transition-colors hover:border-accent/50">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-border bg-background text-accent">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                          {detail.label}
                        </p>
                        <p className="mt-1 font-display text-lg font-medium tracking-tight">
                          {detail.value}
                        </p>
                      </div>
                    </div>
                  );

                  return detail.href ? (
                    <a key={detail.label} href={detail.href} className="block">
                      {content}
                    </a>
                  ) : (
                    <div key={detail.label}>{content}</div>
                  );
                })}
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="border border-border bg-background p-6 sm:p-10">
                <h2 className="font-display text-2xl font-medium tracking-tight">
                  Request a Quote
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Fill in a few details about your project and we&apos;ll be in touch as soon as
                  possible.
                </p>
                <div className="mt-8">
                  <QuoteForm />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
