import { Hero } from "@/components/sections/Hero";
import { AuthorityMarquee } from "@/components/sections/AuthorityMarquee";
import { Statement } from "@/components/sections/Statement";
import { ServiceList } from "@/components/sections/ServiceList";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { CredentialGrid } from "@/components/sections/CredentialGrid";
import { CredentialTranslation } from "@/components/sections/CredentialTranslation";
import { PromiseBlock } from "@/components/sections/PromiseBlock";
import { Testimonial } from "@/components/sections/Testimonial";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AuthorityMarquee />
      <CredentialTranslation />
      <Testimonial />
      <Statement />
      <ServiceList />
      <AboutTeaser />
      <CredentialGrid />
      <PromiseBlock />
      <FinalCTA />
    </>
  );
}
