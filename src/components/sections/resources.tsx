"use client";

import { useRef, useState } from "react";
import { resourcesCopy } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";

export function Resources() {
  const [featured, ...rest] = resourcesCopy.cards;
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const total = rest.length;

  function go(delta: number) {
    const next = Math.min(Math.max(index + delta, 0), total - 1);
    setIndex(next);
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[next] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }

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

          <div
            ref={trackRef}
            className="no-scrollbar col-span-full flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth lg:col-span-1 lg:contents lg:overflow-visible"
          >
            {rest.map((card, i) => (
              <Reveal
                key={card.title}
                delay={i * 0.05}
                className="w-full shrink-0 snap-start lg:w-auto lg:shrink"
              >
                <a
                  href={card.href}
                  className="hover-rule block h-full rounded-[var(--radius-card)] border border-grey-200 p-5 lg:p-6"
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

        <div className="mt-4 flex items-center justify-between lg:hidden">
          <p className="t-ui text-soft">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              className="btn btn-light"
              onClick={() => go(-1)}
              disabled={index === 0}
              aria-label="Previous resource"
            >
              &larr;
            </button>
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => go(1)}
              disabled={index === total - 1}
              aria-label="Next resource"
            >
              &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
