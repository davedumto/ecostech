"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { problemCopy } from "@/lib/content";
import { MetricChart } from "@/components/ui/metric-chart";
import { Reveal, TwoToneHeading } from "@/components/ui/reveal";

function Legend() {
  return (
    <div className="mt-6 flex flex-wrap gap-4">
      {problemCopy.legend.map((item) => (
        <div key={item.code} className="flex items-center gap-2">
          <span className="tile h-6 w-6 text-xs font-medium">{item.code}</span>
          <span className="t-ui text-soft">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

function ChartStack() {
  const { charts } = problemCopy;
  return (
    <div className="grid gap-4">
      <MetricChart
        label={charts.turnaround.label}
        before={charts.turnaround.before}
        after={charts.turnaround.after}
        unit={charts.turnaround.unit}
      />
      <div className="grid grid-cols-2 gap-4">
        <MetricChart
          label={charts.inHouse.label}
          before={charts.inHouse.before}
          after={charts.inHouse.after}
          unit={charts.inHouse.unit}
        />
        <MetricChart
          label={charts.staffReady.label}
          before={charts.staffReady.before}
          after={charts.staffReady.after}
          unit={` ${charts.staffReady.unit}`}
        />
      </div>
    </div>
  );
}

function AccordionRows({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="mt-6 rounded-[var(--radius-card-s)] bg-paper">
      {problemCopy.accordion.map((row, i) => {
        const isOpen = i === activeIndex;
        return (
          <div key={row.title} className={`card-row px-5 ${isOpen ? "py-5" : "py-4"}`}>
            <div className="flex items-center justify-between gap-3">
              <p className="t-ui">{row.title}</p>
              <span
                className="tile h-7 w-7 text-sm"
                style={{
                  background: isOpen ? "var(--color-flare)" : "var(--color-grey-200)",
                  color: isOpen ? "#fff" : "var(--color-grey-600)",
                }}
              >
                {isOpen ? "✓" : "+"}
              </span>
            </div>
            {isOpen && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="t-body mt-2"
              >
                {row.body}
              </motion.p>
            )}
          </div>
        );
      })}
    </div>
  );
}

function DashboardShell({ activeIndex }: { activeIndex: number }) {
  const odoValue = problemCopy.accordion[activeIndex]?.value ?? problemCopy.odometer.after;
  return (
    <div className="shell grid gap-8 lg:grid-cols-2 lg:gap-10">
      <div>
        <p className="t-odo tabular-nums">
          {odoValue}
          <span className="text-grey-400">{problemCopy.odometer.unit}</span>
        </p>
        <p className="t-body mt-2 max-w-sm">{problemCopy.odometer.label}</p>
        <Legend />
        <AccordionRows activeIndex={activeIndex} />
        <a href="#how-it-works" className="btn btn-dark mt-6">
          See how training works
        </a>
      </div>
      <ChartStack />
    </div>
  );
}

function ProblemPinned() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const barProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.34) setActiveIndex(0);
    else if (v < 0.68) setActiveIndex(1);
    else setActiveIndex(2);
  });

  return (
    <div ref={trackRef} className="pin-only relative" style={{ height: "280vh" }}>
      <div className="sticky top-24 surface-grey">
        <div className="container-ecs">
          <DashboardShell activeIndex={activeIndex} />
          <div className="mt-4 flex items-center justify-end gap-3">
            <span className="t-label text-soft">Scroll</span>
            <div className="h-1 w-32 overflow-hidden rounded-full bg-grey-200">
              <motion.div
                className="h-full bg-ink"
                style={{ width: barProgress }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProblemStatic() {
  const [activeIndex, setActiveIndex] = useState(1);
  return (
    <div className="pin-hide container-ecs">
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        {problemCopy.accordion.map((row, i) => (
          <button
            key={row.title}
            type="button"
            onClick={() => setActiveIndex(i)}
            className="btn btn-light"
            style={
              activeIndex === i
                ? { background: "var(--color-ink-soft)", color: "#fff" }
                : undefined
            }
          >
            {row.title}
          </button>
        ))}
      </div>
      <DashboardShell activeIndex={activeIndex} />
    </div>
  );
}

export function Problem() {
  return (
    <section id="problem" className="surface-light section" aria-label="The problem">
      <div className="container-ecs">
        <Reveal>
          <span className="eyebrow">{problemCopy.eyebrow}</span>
          <TwoToneHeading parts={problemCopy.heading} />
        </Reveal>
        <Reveal delay={0.05}>
          <div className="mt-6 grid gap-6 md:grid-cols-2 md:gap-10">
            <p className="t-lead">{problemCopy.columnOne}</p>
            <p className="t-lead">{problemCopy.columnTwo}</p>
          </div>
        </Reveal>
      </div>

      <div className="mt-16">
        <ProblemPinned />
        <ProblemStatic />
      </div>

      <div className="container-ecs">
        <p className="t-mono text-soft mt-6">{problemCopy.disclaimer}</p>
      </div>
    </section>
  );
}
