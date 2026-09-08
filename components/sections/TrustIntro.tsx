import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatBlock } from "@/components/ui/StatBlock";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/data/site-config";

export function TrustIntro() {
  return (
    <Section tone="surface">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="About Novus Construction"
            title="10 Years of Building Better"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-16 grid grid-cols-1 divide-y divide-border border-y border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {siteConfig.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1.5 py-8 text-center">
                <StatBlock value={stat.value} label={stat.label} className="items-center" />
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
