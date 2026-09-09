import { Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/data/site-config";

export function Hero() {
  const projectsStat = siteConfig.stats.find((stat) => stat.label === "Projects Completed") ?? siteConfig.stats[0];

  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <Container className="grid grid-cols-1 items-center gap-12 pt-12 pb-16 sm:pt-16 sm:pb-20 lg:grid-cols-2 lg:gap-16 lg:pt-20 lg:pb-24">
        <Reveal>
          <span className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            <span className="h-px w-8 bg-accent" aria-hidden />
            Building in Ireland Since {siteConfig.founded}
          </span>

          <h1 className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-balance sm:text-5xl md:text-6xl">
            Building the Future, Restoring the Past.
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            Novus Construction can help you achieve your vision for your home. Whether your
            requirement is for a renovation, extension, new build or any other home improvement
            project, our mission is your goal — delivered by a small, dedicated team of qualified,
            experienced construction professionals.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href="/contact" size="lg">
              Request a Quote
            </Button>
            <Button href="/projects" variant="outline" size="lg">
              View Our Work
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-6">
            <a
              href={siteConfig.phoneHref}
              className="flex items-center gap-2.5 text-sm font-semibold text-foreground transition-colors hover:text-accent"
            >
              <span className="flex h-9 w-9 items-center justify-center border border-border">
                <Phone className="h-4 w-4 text-accent" aria-hidden />
              </span>
              {siteConfig.phoneDisplay}
            </a>
            <span className="text-sm text-muted">{siteConfig.hours}</span>
          </div>
        </Reveal>

        <Reveal delay={150} className="relative">
          <div className="relative">
            <PlaceholderImage
              label="Completed Home Exterior"
              category="house"
              ratio="aspect-[4/5]"
              className="w-full"
              src="/projects/house-a-exterior.jpg"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute -bottom-6 -left-6 hidden w-52 border border-border bg-background p-5 shadow-[0_20px_50px_-25px_rgba(27,23,18,0.35)] sm:block">
              <span className="font-display text-3xl font-medium tracking-tight">
                {projectsStat.value}
              </span>
              <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-muted">
                {projectsStat.label}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
