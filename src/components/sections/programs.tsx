"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { programsCopy } from "@/lib/content";
import { Reveal, TwoToneHeading } from "@/components/ui/reveal";

const icons: Record<string, React.ReactElement> = {
  "video-content": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="6" width="13" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 10l5-2.5v9L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
  "lecture-studio": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="18" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 20h6M12 16v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  "social-comms": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 5h16v11H9l-5 4V5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
  wordpress: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 9l2.5 7L12 11l1.5 5L16 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  cbt: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="3" width="16" height="18" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  records: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
};

export function Programs() {
  const [filter, setFilter] = useState("all");
  const visible = programsCopy.programs.filter(
    (p) => filter === "all" || p.category === filter
  );
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const total = visible.length;

  useEffect(() => {
    setIndex(0);
    trackRef.current?.scrollTo({ left: 0 });
  }, [filter]);

  function go(delta: number) {
    const next = Math.min(Math.max(index + delta, 0), total - 1);
    setIndex(next);
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[next] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }

  return (
    <section id="programs" className="surface-grey section" aria-label="What we teach">
      <div className="container-ecs">
        <Reveal>
          <span className="eyebrow">{programsCopy.eyebrow}</span>
          <TwoToneHeading parts={programsCopy.heading} />
          <p className="t-lead mt-4 max-w-2xl">{programsCopy.intro}</p>
        </Reveal>

        <Reveal delay={0.05}>
          <div
            className="mt-8 inline-flex rounded-full bg-grey-100 p-1"
            role="tablist"
            aria-label="Filter by category"
          >
            {programsCopy.filters.map((f) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={filter === f.id}
                onClick={() => setFilter(f.id)}
                className="relative rounded-full px-4 py-2 t-ui transition-colors"
                style={{ color: filter === f.id ? "var(--color-ink)" : "var(--color-grey-600)" }}
              >
                {filter === f.id && (
                  <motion.span
                    layoutId="program-filter-pill"
                    className="absolute inset-0 rounded-full bg-paper shadow-sm"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative">
                  {f.label} <span className="text-soft">{f.count}</span>
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="shell mt-6">
          <motion.div
            layout
            ref={trackRef}
            onScroll={(e) => {
              const track = e.currentTarget;
              if (window.innerWidth >= 640) return;
              const next = Math.round(track.scrollLeft / track.clientWidth);
              setIndex(Math.min(Math.max(next, 0), total - 1));
            }}
            className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible"
          >
            <AnimatePresence mode="popLayout">
              {visible.map((program) => (
                <motion.article
                  key={program.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="w-full shrink-0 snap-start rounded-[var(--radius-card)] p-5 sm:w-auto sm:shrink sm:p-6"
                  style={{
                    background: program.status === "live" ? "var(--color-paper)" : "var(--color-grey-150)",
                  }}
                >
                  <div className="flex items-start justify-between">
                    <span className="tile">{icons[program.id]}</span>
                    <span
                      className="badge"
                      style={program.status === "live" ? { color: "var(--color-signal)" } : undefined}
                    >
                      {program.status === "live" ? "Running now" : "In development"}
                    </span>
                  </div>
                  <h3 className="t-h4 mt-5">{program.title}</h3>
                  <p className="t-body mt-2">{program.description}</p>
                  <p className="t-mono text-soft mt-4">{program.track}</p>
                  {program.status === "live" ? (
                    <a href="#contact" className="t-ui mt-3 inline-flex items-center gap-1 hover-rule">
                      Request this track <span className="hover-arrow">&rarr;</span>
                    </a>
                  ) : (
                    <p className="t-ui text-soft mt-3">Pilot opening soon</p>
                  )}
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          <div className="mt-4 flex items-center justify-between sm:hidden">
            <p className="t-ui text-soft">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => go(-1)}
                disabled={index === 0}
                aria-label="Previous program"
              >
                &larr;
              </button>
              <button
                type="button"
                className="btn btn-dark"
                onClick={() => go(1)}
                disabled={index === total - 1}
                aria-label="Next program"
              >
                &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
