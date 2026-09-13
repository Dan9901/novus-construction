import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Reveal } from "@/components/ui/Reveal";
import { PhotoGallery } from "@/components/ui/PhotoGallery";
import { getServiceBySlug, services } from "@/data/services";
import { siteConfig } from "@/data/site-config";

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.shortDescription,
    openGraph: service.image ? { images: [service.image.src] } : undefined,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const otherServices = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <>
      <section className="border-b border-border bg-surface">
        <Container className="py-14 sm:py-16">
          <Reveal>
            <nav aria-label="Breadcrumb" className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
              <Link href="/services" className="transition-colors hover:text-accent">
                Services
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">{service.title}</span>
            </nav>
            <h1 className="mt-5 font-display text-4xl font-medium leading-[1.08] tracking-tight text-balance sm:text-5xl">
              {service.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {service.shortDescription}
            </p>
          </Reveal>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <Reveal>
                <PlaceholderImage
                  label={service.image?.alt ?? service.placeholderTag}
                  category={service.placeholderCategory}
                  ratio="aspect-[16/10]"
                  className="w-full"
                  src={service.image?.src}
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
              </Reveal>

              <Reveal delay={100} className="mt-10 flex flex-col gap-5">
                {service.description.map((paragraph, index) => (
                  <p key={index} className="text-base leading-relaxed text-foreground-soft">
                    {paragraph}
                  </p>
                ))}
              </Reveal>

              <Reveal delay={160} className="mt-10">
                <h2 className="font-display text-2xl font-medium tracking-tight">
                  What&apos;s Included
                </h2>
                <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-foreground-soft">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <Reveal delay={80}>
              <div className="lg:sticky lg:top-28">
                <div className="border border-border bg-surface p-7">
                  <h2 className="font-display text-xl font-medium tracking-tight">
                    Start Your {service.title} Project
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    Tell us about your project and we&apos;ll come back to you with a clear,
                    no-obligation quote.
                  </p>
                  <div className="mt-6 flex flex-col gap-3">
                    <Button href="/contact" className="w-full justify-center">
                      Request a Quote
                    </Button>
                    <a
                      href={siteConfig.phoneHref}
                      className="flex items-center justify-center gap-2 border border-border px-6 py-3.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-foreground transition-colors hover:border-accent hover:text-accent"
                    >
                      <Phone className="h-4 w-4" aria-hidden />
                      {siteConfig.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="mt-6 border border-border p-7">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                    Explore More
                  </h3>
                  <ul className="mt-4 flex flex-col gap-3">
                    {otherServices.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={`/services/${item.slug}`}
                          className="text-sm font-medium text-foreground transition-colors hover:text-accent"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {service.gallery && service.gallery.length > 0 ? (
        <Section tone="surface">
          <Container>
            <Reveal>
              <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">
                Recent Work
              </h2>
              <p className="mt-2 text-sm text-muted">Select any photo to open the full-size viewer.</p>
            </Reveal>
            <div className="mt-8">
              <PhotoGallery title={service.title} photos={service.gallery} />
            </div>
          </Container>
        </Section>
      ) : null}
    </>
  );
}
