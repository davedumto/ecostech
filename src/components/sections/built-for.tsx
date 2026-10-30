"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { builtForCopy } from "@/lib/content";
import { Reveal, TwoToneHeading } from "@/components/ui/reveal";

type BuiltForCard = (typeof builtForCopy.cards)[number];

// One simple icon per card, purely decorative — fills the extra space the
// bigger card layout opened up, so a card never reads as mostly empty.
const cardIcons: React.ReactElement[] = [
  (
    <svg key="ict" width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.5 19c.6-3.2 2.9-5 5.5-5s4.9 1.8 5.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14.5 14.5c2 .2 3.7 1.7 4.2 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  (
    <svg key="calendar" width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7.5 13.5h3M7.5 16.5h3M13.5 13.5h3M13.5 16.5h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  (
    <svg key="offline" width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 18a4.5 4.5 0 0 1-.5-8.98A6 6 0 0 1 18 9.5a4 4 0 0 1-1 7.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 11v7M9 15.5 12 18l3-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  (
    <svg key="facilitators" width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="7.5" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4.5 20c.9-4.3 3.9-6.5 7.5-6.5s6.6 2.2 7.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
];

function FlowDiagram() {
  const nodes = ["University", "ECOSTECH cohort", "ICT unit", "Faculty & students"];
  return (
    <div className="hidden lg:flex items-center justify-between rounded-[var(--radius-card)] bg-paper px-8 py-10 mb-10 shadow-[0_4px_32px_rgba(0,0,0,0.08)]">
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

function StackCard({
  card,
  index,
  total,
  scrollYProgress,
}: {
  card: BuiltForCard;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const isFirst = index === 0;
  const isLast = index === total - 1;

  // Entrance: grows up from a noticeably smaller size at the bottom of its
  // own slice of the track, into full size as it settles into the stack.
  // Exit: once the NEXT card starts its own entrance, this one visibly
  // slides further up and shrinks back down — real movement both ways, not
  // a snap cross-fade. The slice itself is wide (0.8 of a card's share of
  // the track, not 0.4) so the whole thing reads as a slow, smooth build
  // rather than happening in a blink.
  const slice = 0.8 / total;
  const enterStart = index / total;
  const enterEnd = enterStart + slice;
  const exitStart = (index + 1) / total;
  const exitEnd = exitStart + slice;

  const yRange = isFirst ? [0, exitStart, exitEnd] : [enterStart, enterEnd, exitStart, exitEnd];
  const y = useTransform(
    scrollYProgress,
    isLast ? [enterStart, enterEnd] : yRange,
    isLast ? [220, 0] : isFirst ? [0, 0, -40] : [220, 0, 0, -40]
  );
  const scale = useTransform(
    scrollYProgress,
    isLast ? [enterStart, enterEnd] : yRange,
    isLast ? [0.55, 1] : isFirst ? [1, 1, 0.94] : [0.55, 1, 1, 0.94]
  );
  const opacity = useTransform(scrollYProgress, [enterStart, enterEnd], [0, 1]);

  return (
    <motion.div
      className="absolute inset-x-0 flex min-h-[22rem] flex-col justify-between rounded-[var(--radius-card)] bg-paper p-10 shadow-[0_4px_32px_rgba(0,0,0,0.08)] lg:min-h-[24rem] lg:p-14"
      style={{
        top: `${index * 1.25}rem`,
        zIndex: index + 1,
        y,
        scale,
        opacity: isFirst ? 1 : opacity,
      }}
    >
      <div className="flex items-start justify-between gap-6">
        <span className="t-ui text-grey-400">{card.number}</span>
        <span className="tile tile-flare h-14 w-14 shrink-0">{cardIcons[index]}</span>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h3 className="t-h2">{card.title}</h3>
          <p className="t-lead mt-4 max-w-xl">{card.body}</p>
        </div>
        <span className="value-tag self-start whitespace-nowrap lg:self-end">{card.node}</span>
      </div>
    </motion.div>
  );
}

// Explicit scroll-driven stacking instead of relying on native position:sticky
// timing — a sticky card's "stuck" budget is bounded by how much container
// height is left AFTER it (not by its own size), which made the tightest
// (last) transition fragile and inconsistent. Here, one sticky stage sits
// pinned — vertically centred, so the last card has equal room to finish
// its slide before the pin releases — for the whole track, and each card
// is driven directly off scroll progress: it starts offset below its
// resting spot and animates to y:0 inside its own slice of the track,
// then simply stays there (clamped) — guaranteed to end up stacked under
// the next card, same as every other, with no reliance on sticky's own
// native release timing.
function StackCards() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const total = builtForCopy.cards.length;

  return (
    // pin-only: this scroll-jacked, 4×70vh-tall track is a desktop-only
    // device — on mobile it would both make the page enormously long and
    // run a scroll-linked animation nobody asked to sit through. BuiltForStatic
    // below is the plain, short mobile equivalent.
    <div ref={trackRef} className="pin-only relative" style={{ height: `${total * 70}vh` }}>
      <div className="sticky top-0 flex min-h-screen items-center">
        <div
          className="relative w-full"
          style={{ height: `calc(26rem + ${(total - 1) * 1.25}rem)` }}
        >
          {builtForCopy.cards.map((card, i) => (
            <StackCard
              key={card.title}
              card={card}
              index={i}
              total={total}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Mobile/reduced-motion equivalent of StackCards — the same cards, same
// icons, just as an ordinary short stacked list with no scroll-jacking and
// no multi-screen-tall track.
function BuiltForStatic() {
  return (
    // pin-hide's own display:none override (for desktop) loses to a
    // display-setting utility like `flex` on the same element — Tailwind
    // utilities always beat @layer components rules, media query or not
    // — so the flex layout goes on an inner wrapper instead.
    <div className="pin-hide">
      <div className="flex flex-col gap-4">
        {builtForCopy.cards.map((card, i) => (
          <div
            key={card.title}
            className="rounded-[var(--radius-card)] bg-paper p-6 shadow-[0_4px_32px_rgba(0,0,0,0.08)]"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="t-ui text-grey-400">{card.number}</span>
              <span className="tile tile-flare h-11 w-11 shrink-0">{cardIcons[i]}</span>
            </div>
            <h3 className="t-h4 mt-4">{card.title}</h3>
            <p className="t-body mt-2">{card.body}</p>
            <span className="value-tag mt-4 inline-block whitespace-nowrap">{card.node}</span>
          </div>
        ))}
      </div>
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
          <StackCards />
          <BuiltForStatic />
        </div>
      </div>
    </section>
  );
}
