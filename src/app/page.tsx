import { Hero } from "@/components/sections/Hero";
import { Statement } from "@/components/sections/Statement";
import { MissionPrinciples } from "@/components/sections/MissionPrinciples";
import { ServiceList } from "@/components/sections/ServiceList";
import { PeopleAct } from "@/components/sections/PeopleAct";
import { ProofAct } from "@/components/sections/ProofAct";
import { HowRail } from "@/components/sections/HowRail";
import { ConversationAct } from "@/components/sections/ConversationAct";

// Seven acts: hook → thesis → the work → the people → proof → how → act.
// Scheme rhythm: dark → cream → paper → cream → dark → paper → red.
export default function HomePage() {
  return (
    <>
      <Hero />
      <Statement />
      <MissionPrinciples />
      <ServiceList />
      <PeopleAct />
      <ProofAct />
      <HowRail />
      <ConversationAct />
    </>
  );
}
