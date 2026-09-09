import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { StatBlock } from "@/components/ui/StatBlock";
import { Reveal } from "@/components/ui/Reveal";
import { FinalCta } from "@/components/sections/FinalCta";
import { siteConfig } from "@/data/site-config";
import { values } from "@/data/values";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Novus Construction is a small, owner-led building contractor with 10+ years of experience carrying out new builds, extensions and renovations.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Novus Construction"
        title="A Small Team, Built on Craft"
        description="Novus Construction Ltd was founded with one mission in mind: to restore the old and build the future of home interior and exterior."
      />

      <Section>
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <PlaceholderImage
                label="Recent Kitchen Project"
                category="site"
                ratio="aspect-[4/5]"
                className="w-full"
                src="/samples/kitchen-modern.jpg"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </Reveal>

            <Reveal delay={100}>
              <SectionHeading eyebrow="Our Story" title="10+ Years of Hands-On Building" />
              <div className="mt-6 flex flex-col gap-5">
                <p className="text-base leading-relaxed text-foreground-soft">
                  Novus Construction Ltd was founded with one mission in mind: to restore the old
                  and build the future of home interior and exterior. We want to help people
                  design and create the inside of their home to reflect and express the uniqueness
                  of the people living in the house — and we design and create the outside of the
                  house too, making sure your unique vision is immediately visible.
                </p>
                <p className="text-base leading-relaxed text-foreground-soft">
                  We&apos;ve been designing, creating and building some of the most beautiful
                  kitchens on the Irish market for years, and thanks to our many satisfied clients
                  we continue to grow as a company — while remaining a small, owner-led team by
                  choice.
                </p>
                <p className="text-base leading-relaxed text-foreground-soft">
                  Our story began when we realised people wanted not just something functional,
                  but an expression of self in the design. We decided to listen — and we&apos;ve
                  continued to listen ever since. The client is always in focus when we design,
                  create and build; we only build what works for you, and it&apos;s always unique
                  and functional.
                </p>
              </div>

              <div className="mt-9 grid grid-cols-2 gap-6 border-t border-border pt-8">
                {siteConfig.stats.map((stat) => (
                  <StatBlock key={stat.label} value={stat.value} label={stat.label} />
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="What We Believe"
              title="Our Values"
              description="Our story began when we realised people wanted not just something functional, but an expression of self in the design — so we decided to listen, and we've continued to listen ever since."
              align="center"
              className="mx-auto"
            />
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 70}>
                <div className="h-full border border-border bg-background p-6">
                  <span className="font-display text-3xl text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-medium tracking-tight">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{value.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
