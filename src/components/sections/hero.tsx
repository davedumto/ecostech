"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { heroCopy } from "@/lib/content";

function HeroVideo({ className = "" }: { className?: string }) {
  return (
    <video
      className={`h-full w-full object-cover ${className}`}
      autoPlay
      muted
      loop
      playsInline
      poster="/hero/hero-still.jpg"
      aria-label="ECOSTECH facilitator training ICT staff at an interactive display in a university computer lab"
    >
      <source src="/hero/hero-1080.mp4" media="(min-width: 1024px)" />
      <source src="/hero/hero-720.mp4" type="video/mp4" />
    </video>
  );
}

function HeroHeadline({ className = "" }: { className?: string }) {
  return (
    <div className={`text-balance ${className}`} aria-hidden="true">
      <span className="t-h1 block">{heroCopy.h1Primary}</span>
      <span className="t-h1 mt-[0.8em] block text-grey-400">{heroCopy.h1Soft}</span>
    </div>
  );
}

function HeroPinned() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 0.62], [1, 0.4]);
  const videoRadius = useTransform(scrollYProgress, [0, 0.62], [0, 32]);
  const videoY = useTransform(scrollYProgress, [0, 0.62], ["0%", "-18%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.4], [0.55, 0.15]);

  const ghost1Opacity = useTransform(scrollYProgress, [0.25, 0.5], [0, 0.35]);
  const ghost2Opacity = useTransform(scrollYProgress, [0.35, 0.6], [0, 0.2]);

  const headLeftX = useTransform(scrollYProgress, [0.05, 0.5], ["0%", "-38%"]);
  const headRightX = useTransform(scrollYProgress, [0.05, 0.5], ["0%", "38%"]);
  const headOpacity = useTransform(scrollYProgress, [0.35, 0.58], [1, 0]);

  const blurbOpacity = useTransform(scrollYProgress, [0.5, 0.78], [0, 1]);
  const blurbY = useTransform(scrollYProgress, [0.5, 0.78], [24, 0]);

  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <div ref={trackRef} className="pin-only relative" style={{ height: "230vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-ink text-paper">
        <motion.div
          className="absolute inset-0 border border-hairline-dark"
          style={{ opacity: ghost2Opacity, borderRadius: 32 }}
        />
        <motion.div
          className="absolute inset-0 border border-hairline-dark"
          style={{ opacity: ghost1Opacity, borderRadius: 32 }}
        />

        <motion.div
          className="absolute inset-0 overflow-hidden"
          style={{
            scale: videoScale,
            borderRadius: videoRadius,
            y: videoY,
            transformOrigin: "center 20%",
          }}
        >
          <HeroVideo />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-ink/60"
            style={{ opacity: overlayOpacity }}
          />
        </motion.div>

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <div className="relative w-full max-w-4xl text-balance" aria-hidden="true">
            <motion.span
              className="t-h1 block"
              style={{ x: headLeftX, opacity: headOpacity }}
            >
              {heroCopy.h1Primary}
            </motion.span>
            <motion.span
              className="t-h1 mt-[0.8em] block text-grey-400"
              style={{ x: headRightX, opacity: headOpacity }}
            >
              {heroCopy.h1Soft}
            </motion.span>
          </div>

          <motion.div
            className="mt-8 max-w-xl"
            style={{ opacity: blurbOpacity, y: blurbY }}
          >
            <p className="t-lead text-grey-400">
              {heroCopy.blurbTitle} {heroCopy.blurb}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a href={heroCopy.ctaPrimary.href} className="btn btn-flare">
                {heroCopy.ctaPrimary.label}
              </a>
              <a href={heroCopy.ctaSecondary.href} className="btn btn-glass">
                {heroCopy.ctaSecondary.label}
              </a>
            </div>
          </motion.div>
        </div>

        <motion.a
          href="#problem"
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 btn btn-glass"
          style={{ opacity: scrollCueOpacity }}
        >
          {heroCopy.scrollLabel} &darr;
        </motion.a>
      </div>
    </div>
  );
}

function HeroStatic() {
  return (
    <div className="pin-hide relative bg-ink text-paper">
      <div className="relative h-[85vh] min-h-[560px] w-full overflow-hidden">
        <HeroVideo />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/70" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <HeroHeadline className="text-grey-100" />
        </div>
      </div>
      <div className="px-6 py-12 text-center">
        <p className="t-lead text-grey-400 mx-auto max-w-xl">
          {heroCopy.blurbTitle} {heroCopy.blurb}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a href={heroCopy.ctaPrimary.href} className="btn btn-flare">
            {heroCopy.ctaPrimary.label}
          </a>
          <a href={heroCopy.ctaSecondary.href} className="btn btn-glass">
            {heroCopy.ctaSecondary.label}
          </a>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative" aria-label="Introduction">
      <h1 className="sr-only">
        {heroCopy.h1Primary} {heroCopy.h1Soft}
      </h1>
      <HeroPinned />
      <HeroStatic />
    </section>
  );
}
