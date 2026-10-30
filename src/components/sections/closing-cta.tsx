"use client";

import { closingCopy } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";

export function ClosingCta() {
  return (
    <section id="contact" className="surface-grey section" aria-label="Get in touch">
      <div className="container-ecs text-center">
        <Reveal>
          <h2 className="t-h1 mx-auto max-w-3xl text-balance">{closingCopy.heading}</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href={closingCopy.ctaPrimary.href} className="btn btn-flare">
              {closingCopy.ctaPrimary.label}
            </a>
            <a href={closingCopy.ctaSecondary.href} className="btn btn-outline">
              {closingCopy.ctaSecondary.label}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
