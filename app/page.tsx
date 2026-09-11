import { Hero } from "@/components/sections/Hero";
import { MetaBar } from "@/components/sections/MetaBar";
import { TrustIntro } from "@/components/sections/TrustIntro";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { ServicesMarquee } from "@/components/sections/ServicesMarquee";
import { WhyUs } from "@/components/sections/WhyUs";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <MetaBar />
      <TrustIntro />
      <ServicesGrid />
      <ProjectsShowcase />
      <ServicesMarquee />
      <WhyUs />
      <Process />
      <Testimonials />
      <FinalCta />
    </>
  );
}
