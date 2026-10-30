"use client";

import { motion } from "framer-motion";
import { impactCopy } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";

export function Impact() {
  return (
    <section id="impact" className="surface-dark section" aria-label="Impact">
      <div className="container-ecs flex flex-col items-center text-center">
        <Reveal>
          <div className="relative mx-auto w-full max-w-2xl">
            <svg viewBox="0 0 600 140" className="w-full" aria-hidden="true">
              <motion.path
                d="M 40 110 Q 300 -20 560 110"
                fill="none"
                stroke="url(#arc-gradient)"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
              />
              <defs>
                <linearGradient id="arc-gradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#e2590c" />
                  <stop offset="100%" stopColor="#0f7a4d" />
                </linearGradient>
              </defs>
              <circle cx="40" cy="110" r="7" fill="#e2590c" />
              <rect x="546" y="103" width="14" height="14" fill="none" stroke="#dedede" strokeWidth="1.5" />
            </svg>
            <div className="mt-2 flex justify-between px-2 t-label text-grey-400">
              <span>{impactCopy.gross.label}</span>
              <span>{impactCopy.net.label}</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="t-h2 mt-10 max-w-xl text-balance">{impactCopy.heading}</h2>
        </Reveal>

        <Reveal delay={0.15}>
          <a href={impactCopy.cta.href} className="btn btn-glass mt-8">
            {impactCopy.cta.label}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
