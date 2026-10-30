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

  // Background: full-bleed dark video that collapses into a small centred
  // square card as the surface itself shifts from dark to light.
  const bgColor = useTransform(scrollYProgress, [0.15, 0.5], ["#0a0a0a", "#ffffff"]);

  const cardVmax = useTransform(scrollYProgress, [0, 0.62], [170, 30]);
  const cardSize = useTransform(cardVmax, (v) => `${v}vmax`);
  const cardRadius = useTransform(scrollYProgress, [0, 0.5], [0, 32]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3], [0.5, 0]);

  const ghost1Size = useTransform(cardVmax, (v) => `${v + 6}vmax`);
  const ghost2Size = useTransform(cardVmax, (v) => `${v + 11}vmax`);
  const ghostOpacity = useTransform(scrollYProgress, [0.3, 0.55], [0, 1]);

  const headGap = useTransform(scrollYProgress, [0.1, 0.5], ["0.8em", "0em"]);
  const headLeftX = useTransform(scrollYProgress, [0.1, 0.6], ["0%", "-32vw"]);
  const headRightX = useTransform(scrollYProgress, [0.1, 0.6], ["0%", "32vw"]);
  // Snapped rather than slowly interpolated, so the text never sits at a
  // low-contrast grey mid-tone against the crossfading background.
  const headColorPrimary = useTransform(
    scrollYProgress,
    [0.46, 0.47],
    ["#ffffff", "#0a0a0a"]
  );
  const headColorSoft = useTransform(
    scrollYProgress,
    [0.46, 0.47],
    ["#b1b1b1", "#626262"]
  );

  const blurbOpacity = useTransform(scrollYProgress, [0.58, 0.85], [0, 1]);
  const blurbY = useTransform(scrollYProgress, [0.58, 0.85], [24, 0]);

  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <div ref={trackRef} className="pin-only relative" style={{ height: "260vh" }}>
      <motion.div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ backgroundColor: bgColor }}
      >
        {/* card + headline share one centred grid cell so they align perfectly */}
        <div className="absolute inset-0 grid place-items-center">
          <motion.div
            className="col-start-1 row-start-1 border border-hairline-dark"
            style={{ width: ghost2Size, height: ghost2Size, borderRadius: 32, opacity: ghostOpacity }}
          />
          <motion.div
            className="col-start-1 row-start-1 border border-hairline-dark"
            style={{ width: ghost1Size, height: ghost1Size, borderRadius: 32, opacity: ghostOpacity }}
          />
          <motion.div
            className="col-start-1 row-start-1 relative overflow-hidden"
            style={{ width: cardSize, height: cardSize, borderRadius: cardRadius }}
          >
            <HeroVideo />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-ink/50"
              style={{ opacity: overlayOpacity }}
            />
          </motion.div>

          <div className="col-start-1 row-start-1 flex w-full max-w-5xl flex-col items-center px-6 text-center">
            <motion.span
              className="t-h1 block"
              style={{ x: headLeftX, color: headColorPrimary }}
            >
              {heroCopy.h1Primary}
            </motion.span>
            <motion.span
              className="t-h1 block"
              style={{ x: headRightX, color: headColorSoft, marginTop: headGap }}
            >
              {heroCopy.h1Soft}
            </motion.span>
          </div>
        </div>

        <motion.div
          className="absolute inset-x-0 bottom-[8%] px-6 text-center"
          style={{ opacity: blurbOpacity, y: blurbY }}
        >
          <p className="t-lead mx-auto max-w-xl">
            {heroCopy.blurbTitle} {heroCopy.blurb}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a href={heroCopy.ctaPrimary.href} className="btn btn-flare">
              {heroCopy.ctaPrimary.label}
            </a>
            <a href={heroCopy.ctaSecondary.href} className="btn btn-outline">
              {heroCopy.ctaSecondary.label}
            </a>
          </div>
        </motion.div>

        <motion.a
          href="#problem"
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 btn btn-glass"
          style={{ opacity: scrollCueOpacity }}
        >
          {heroCopy.scrollLabel} &darr;
        </motion.a>
      </motion.div>
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
