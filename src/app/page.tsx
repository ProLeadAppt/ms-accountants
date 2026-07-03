import { Hero } from "@/components/sections/Hero";
import { Statement } from "@/components/sections/Statement";
import { ServiceList } from "@/components/sections/ServiceList";
import { PeopleAct } from "@/components/sections/PeopleAct";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ProofAct } from "@/components/sections/ProofAct";
import { PromiseBlock } from "@/components/sections/PromiseBlock";
import { FinalCTA } from "@/components/sections/FinalCTA";

// Story order: hook → proof flash → thesis (+ his voice) → what → who →
// why the credentials matter + who else → how → evidence → promise → act.
export default function HomePage() {
  return (
    <>
      <Hero />
      <Statement />
      <ServiceList />
      <PeopleAct />
      <HowItWorks />
      <ProofAct />
      <PromiseBlock />
      <FinalCTA />
    </>
  );
}
