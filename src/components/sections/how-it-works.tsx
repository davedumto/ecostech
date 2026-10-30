"use client";

import { useRef, useState } from "react";
import { stepsCopy } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";

const icons: Record<string, React.ReactElement> = {
  Assess: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M20 20L15.5 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  Group: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.5 19c.6-3.2 2.9-5 5.5-5s4.9 1.8 5.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14.5 14.5c2 .2 3.7 1.7 4.2 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  Train: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 21h6M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  Certify: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.5 14L7 21l5-2.5L17 21l-1.5-7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
  Support: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 12a8 8 0 1 1 3 6.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 12v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 17a2 2 0 1 0 4 0v-2H4z" fill="currentColor" />
    </svg>
  ),
};

export function HowItWorks() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const total = stepsCopy.steps.length;

  function go(delta: number) {
    const next = Math.min(Math.max(index + delta, 0), total - 1);
    setIndex(next);
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[next] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }

  return (
    <section id="how-it-works" className="surface-light section" aria-label="How it works">
      <div className="container-ecs">
        <Reveal>
          <span className="eyebrow">{stepsCopy.eyebrow}</span>
          <h2 className="t-h2">{stepsCopy.heading}</h2>
        </Reveal>
      </div>

      <Reveal delay={0.05}>
        <div className="container-ecs relative mt-10">
          <div
            ref={trackRef}
            className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory"
            role="group"
            aria-label="Training process, five steps"
          >
            {stepsCopy.steps.map((step, i) => (
              <article
                key={step.verb}
                className="surface-dark relative flex h-[26rem] w-[82vw] shrink-0 snap-start flex-col justify-between rounded-[var(--radius-card)] p-6 sm:w-[17rem]"
                role="group"
                aria-label={`${i + 1} of ${total}`}
              >
                <div>
                  <div className="flex items-start justify-between">
                    <span className="t-mono text-grey-500">{step.number}</span>
                    <span className="tile tile-flare">{icons[step.verb]}</span>
                  </div>
                  <p className="t-h3 mt-6">{step.verb}</p>
                  <p className="t-label text-grey-500 mt-1">{step.role}</p>
                </div>

                <div className="relative mt-6 h-28 overflow-hidden rounded-[var(--radius-card-s)] glass p-4">
                  <div className="absolute inset-0 opacity-40" style={{
                    backgroundImage:
                      "radial-gradient(circle at 20% 20%, rgba(226,89,12,0.5), transparent 55%)",
                  }} />
                  <p className="t-mono text-grey-200 relative">{step.caption}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="container-ecs mt-4 flex items-center justify-between">
            <p className="t-ui text-soft">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => go(-1)}
                disabled={index === 0}
                aria-label="Previous step"
              >
                &larr;
              </button>
              <button
                type="button"
                className="btn btn-dark"
                onClick={() => go(1)}
                disabled={index === total - 1}
                aria-label="Next step"
              >
                &rarr;
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
