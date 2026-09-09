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
            description="We pride ourselves on the level of service we provide to our customers and the quality of the work we produce. We offer specialist services in all areas of renovation and construction, working closely with our clients so the experience is enjoyable from start to finish and beyond."
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
