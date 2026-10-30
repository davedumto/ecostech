"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { manifestoCopy } from "@/lib/content";
import { NetworkCanvas } from "@/components/ui/network-canvas";
import { Reveal } from "@/components/ui/reveal";

function ManifestoPinned() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const [index, setIndex] = useState(0);
  const total = manifestoCopy.words.length;

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(total - 1, Math.floor(v * total));
    setIndex(next);
  });

  return (
    <div ref={trackRef} className="pin-only relative" style={{ height: "180vh" }}>
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center">
        <div className="container-ecs grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="t-h1">
              ECOSTECH is
              <br />
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                style={{ color: "var(--color-flare)" }}
              >
                {manifestoCopy.words[index]}
              </motion.span>
            </p>
            <p className="t-lead mt-6 max-w-md">{manifestoCopy.body}</p>
          </div>
          <div className="flex justify-center">
            <NetworkCanvas />
          </div>
        </div>
        <div className="absolute bottom-10 right-10 flex gap-1.5">
          {manifestoCopy.words.map((w, i) => (
            <span
              key={w}
              className="h-1.5 w-6 rounded-full"
              style={{ background: i === index ? "var(--color-flare)" : "var(--color-grey-200)" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ManifestoStatic() {
  return (
    <div className="pin-hide container-ecs text-center">
      <p className="t-h1">
        ECOSTECH is <span style={{ color: "var(--color-flare)" }}>{manifestoCopy.words[0]}</span>
      </p>
      <p className="t-lead mx-auto mt-6 max-w-md">{manifestoCopy.body}</p>
      <ul className="mt-6 flex flex-wrap justify-center gap-2">
        {manifestoCopy.words.slice(1).map((w) => (
          <li key={w} className="value-tag">
            {w}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Manifesto() {
  return (
    <section id="manifesto" className="surface-light section" aria-label="What ECOSTECH is">
      <Reveal>
        <ManifestoPinned />
        <ManifestoStatic />
      </Reveal>
    </section>
  );
}
