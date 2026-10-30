import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Programs } from "@/components/sections/programs";
import { Gallery } from "@/components/sections/gallery";
import { BuiltFor } from "@/components/sections/built-for";
import { Manifesto } from "@/components/sections/manifesto";
import { Trust } from "@/components/sections/trust";
import { Impact } from "@/components/sections/impact";
import { Milestones } from "@/components/sections/milestones";
import { Resources } from "@/components/sections/resources";
import { ClosingCta } from "@/components/sections/closing-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <HowItWorks />
      <Programs />
      <Gallery />
      <BuiltFor />
      <Manifesto />
      <Trust />
      <Impact />
      <Milestones />
      <Resources />
      <ClosingCta />
    </>
  );
}
