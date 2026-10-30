"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { trustCopy } from "@/lib/content";
import { Reveal, TwoToneHeading } from "@/components/ui/reveal";

export function Trust() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="trust"
      className="surface-dark relative section overflow-hidden"
      aria-label="What ECOSTECH is and is not"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 blur-sm scale-110"
        style={{ backgroundImage: "url(/images/presenter-dashboard.jpg)" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/90 to-ink" aria-hidden="true" />

      <div className="container-ecs relative">
        <Reveal>
          <span className="eyebrow">{trustCopy.eyebrow}</span>
          <TwoToneHeading parts={trustCopy.heading} className="t-h2 text-paper" />
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-10 grid gap-3 lg:grid-cols-5">
            {trustCopy.cards.map((card, i) => {
              const isActive = i === active;
              return (
                <button
                  key={card.title}
                  type="button"
                  onClick={() => setActive(i)}
                  className="glass relative overflow-hidden p-5 text-left transition-colors"
                  style={{
                    background: isActive ? "var(--color-paper)" : undefined,
                    color: isActive ? "var(--color-ink)" : undefined,
                    gridColumn: isActive ? "span 2 / span 2" : undefined,
                  }}
                >
                  <p className="t-ui">{card.title}</p>
                  {isActive && (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="t-body mt-3"
                      style={{ color: "var(--color-grey-600)" }}
                    >
                      {card.body}
                    </motion.p>
                  )}
                  {!isActive && (
                    <span className="mt-4 block text-grey-400">&rsaquo;</span>
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-16 grid gap-8 lg:grid-cols-[auto_1fr_1fr]">
            <p className="t-label text-grey-400">{trustCopy.negationsLabel}</p>
            <ul className="space-y-3">
              {trustCopy.negationsColumnOne.map((item) => (
                <li key={item} className="t-lead text-grey-400 flex items-start gap-2">
                  <span className="text-flare">&times;</span> {item}
                </li>
              ))}
            </ul>
            <ul className="space-y-3">
              {trustCopy.negationsColumnTwo.map((item) => (
                <li key={item} className="t-lead text-grey-400 flex items-start gap-2">
                  <span className="text-flare">&times;</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
