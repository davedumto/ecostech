"use client";

import { builtForCopy } from "@/lib/content";
import { Reveal, TwoToneHeading } from "@/components/ui/reveal";

function FlowDiagram() {
  const nodes = ["University", "ECOSTECH cohort", "ICT unit", "Faculty & students"];
  return (
    <div className="hidden lg:flex items-center justify-between rounded-[var(--radius-card)] bg-paper px-8 py-10 mb-10">
      {nodes.map((node, i) => (
        <div key={node} className="flex items-center">
          <div className="flex flex-col items-center gap-3">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-[var(--radius-card-s)] border"
              style={{
                borderColor: i === 1 ? "var(--color-flare)" : "var(--color-grey-200)",
                background: i === 1 ? "var(--color-flare-soft)" : "transparent",
              }}
            >
              <span className="t-mono">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <p className="t-ui text-soft text-center w-28">{node}</p>
          </div>
          {i < nodes.length - 1 && (
            <svg width="56" height="12" viewBox="0 0 56 12" className="mx-2 text-grey-200">
              <line x1="0" y1="6" x2="48" y2="6" stroke="currentColor" strokeDasharray="4 4" />
              <path d="M44 1L50 6L44 11" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

export function BuiltFor() {
  return (
    <section id="about" className="surface-grey section" aria-label="Why it fits Nigerian universities">
      <div className="container-ecs">
        <Reveal>
          <span className="eyebrow">{builtForCopy.eyebrow}</span>
          <TwoToneHeading parts={builtForCopy.heading} />
        </Reveal>

        <div className="mt-12">
          <FlowDiagram />

          <div className="relative">
            {builtForCopy.cards.map((card, i) => (
              <div
                key={card.title}
                className="sticky rounded-[var(--radius-card)] bg-paper p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04)] mb-4 lg:p-10"
                style={{ top: `calc(6rem + ${i * 1.25}rem)`, zIndex: i + 1 }}
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex gap-5">
                    <span className="t-mono text-grey-400 shrink-0">{card.number}</span>
                    <div>
                      <h3 className="t-h4">{card.title}</h3>
                      <p className="t-body mt-2 max-w-xl">{card.body}</p>
                    </div>
                  </div>
                  <span className="value-tag self-start lg:self-center whitespace-nowrap">
                    {card.node}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
