import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { StatBlock } from "@/components/ui/StatBlock";
import { Reveal } from "@/components/ui/Reveal";
import { TeamCard } from "@/components/about/TeamCard";
import { FinalCta } from "@/components/sections/FinalCta";
import { siteConfig } from "@/data/site-config";
import { team } from "@/data/team";
import { values } from "@/data/values";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Novus Construction is a small, owner-led building contractor with around 10 years of experience carrying out new builds, extensions and renovations.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Novus Construction"
        title="A Small Team, Built on Craft"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
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
              <SectionHeading eyebrow="Our Story" title="Ten Years of Hands-On Building" />
              <div className="mt-6 flex flex-col gap-5">
                <p className="text-base leading-relaxed text-foreground-soft">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam, quis
                  nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p className="text-base leading-relaxed text-foreground-soft">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                  fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                  culpa qui officia deserunt mollit anim id est laborum, remaining a small,
                  owner-led team by choice.
                </p>
              </div>

              <div className="mt-9 grid grid-cols-3 gap-6 border-t border-border pt-8">
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
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
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

      <Section>
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Meet the Team"
              title="The People Behind Novus"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. A small team of three, working directly on every project."
              align="center"
              className="mx-auto"
            />
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {team.map((member, index) => (
              <Reveal key={member.name + index} delay={index * 80}>
                <TeamCard member={member} index={index} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
