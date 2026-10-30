"use client";

import { milestonesCopy } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";

export function Milestones() {
  return (
    <section className="surface-grey section" aria-label="Project status">
      <div className="container-ecs">
        <Reveal>
          <span className="eyebrow">{milestonesCopy.eyebrow}</span>
          <h2 className="t-h2">{milestonesCopy.heading}</h2>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-4">
          {milestonesCopy.rows.map((row, i) => (
            <Reveal key={row.label} delay={i * 0.08}>
              <div className="rule-top pt-5">
                <p className="t-ui" style={{ color: i === 0 ? "var(--color-ink)" : "var(--color-grey-600)" }}>
                  {row.label}
                </p>
                <p className="t-body mt-2">{row.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
