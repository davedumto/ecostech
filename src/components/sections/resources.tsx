"use client";

import { resourcesCopy } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";

export function Resources() {
  const [featured, ...rest] = resourcesCopy.cards;

  return (
    <section className="surface-light section" aria-label="Resources">
      <div className="container-ecs">
        <Reveal>
          <span className="eyebrow">{resourcesCopy.eyebrow}</span>
          <h2 className="t-h2">{resourcesCopy.heading}</h2>
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          <Reveal className="lg:col-span-2 lg:row-span-2">
            <a
              href={featured.href}
              className="group relative block h-full min-h-[20rem] overflow-hidden rounded-[var(--radius-card)] bg-ink text-paper"
            >
              <video
                className="absolute inset-0 h-full w-full object-cover opacity-50 transition-opacity group-hover:opacity-65"
                autoPlay
                muted
                loop
                playsInline
                poster="/video/mentorship-still.jpg"
              >
                <source src="/video/mentorship-720.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              <div className="relative flex h-full flex-col justify-end p-8">
                <p className="t-mono text-grey-400">{featured.meta}</p>
                <h3 className="t-h3 mt-2">{featured.title}</h3>
                <p className="t-body mt-2 max-w-sm text-grey-400">{featured.summary}</p>
                <span className="t-ui mt-4 inline-flex items-center gap-1">
                  Get started <span className="hover-arrow">&rarr;</span>
                </span>
              </div>
            </a>
          </Reveal>

          {rest.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.05}>
              <a
                href={card.href}
                className="hover-rule block rounded-[var(--radius-card)] border border-grey-200 p-6 h-full"
              >
                <div className="flex items-start justify-between">
                  <p className="t-mono text-soft">{card.meta}</p>
                  <span className="hover-arrow t-ui">&rarr;</span>
                </div>
                <h3 className="t-h4 mt-3">{card.title}</h3>
                <p className="t-body mt-2">{card.summary}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
