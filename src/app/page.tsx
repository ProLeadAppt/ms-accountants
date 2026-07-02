import { Hero } from "@/components/sections/Hero";
import { AuthorityMarquee } from "@/components/sections/AuthorityMarquee";
import { Statement } from "@/components/sections/Statement";
import { VoicePullQuote } from "@/components/sections/VoicePullQuote";
import { ServiceList } from "@/components/sections/ServiceList";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { BenchStrip } from "@/components/sections/BenchStrip";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { PublishedThinking } from "@/components/sections/PublishedThinking";
import { CaseInPoint } from "@/components/sections/CaseInPoint";
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
      <VoicePullQuote />
      <ServiceList />
      <AboutTeaser />
      <BenchStrip />
      <HowItWorks />
      <PublishedThinking scheme="cream" />
      <CaseInPoint scheme="sand" />
      <CredentialGrid />
      <PromiseBlock />
      <FinalCTA />
    </>
  );
}
