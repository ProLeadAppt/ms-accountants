import { Hero } from "@/components/sections/Hero";
import { Statement } from "@/components/sections/Statement";
import { VoicePullQuote } from "@/components/sections/VoicePullQuote";
import { ServiceList } from "@/components/sections/ServiceList";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { BenchStrip } from "@/components/sections/BenchStrip";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { PublishedThinking } from "@/components/sections/PublishedThinking";
import { CaseInPoint } from "@/components/sections/CaseInPoint";
import { CredentialTranslation } from "@/components/sections/CredentialTranslation";
import { PromiseBlock } from "@/components/sections/PromiseBlock";
import { Testimonial } from "@/components/sections/Testimonial";
import { FinalCTA } from "@/components/sections/FinalCTA";

// Story order: hook → proof flash → thesis → what → who → who else →
// why the credentials matter → his voice → how → evidence → promise → act.
export default function HomePage() {
  return (
    <>
      <Hero />
      <Statement />
      <ServiceList />
      <AboutTeaser />
      <BenchStrip />
      <CredentialTranslation />
      <VoicePullQuote />
      <HowItWorks />
      <PublishedThinking scheme="cream" />
      <CaseInPoint scheme="sand" />
      <Testimonial />
      <PromiseBlock />
      <FinalCTA />
    </>
  );
}
