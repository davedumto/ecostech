"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { heroCopy } from "@/lib/content";

// Measures the actual rendered box of the given element rather than
// window.innerWidth/innerHeight — those can be a frame stale relative to
// what's really on screen (scrollbar appearing, hydration timing, zoom),
// which left a visible gap between the "full-bleed" video and the real
// edge of its container. ResizeObserver reports the element's true size
// directly, so the card can never undershoot it.
function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [size, setSize] = useState({ width: 1440, height: 900 });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setSize({ width: rect.width, height: rect.height });
      }
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, size };
}

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
  const { ref: stageRef, size: stageSize } = useElementSize<HTMLDivElement>();

  // Background: full-bleed dark video that collapses into a small centred
  // square card as the surface itself shifts from dark to light.
  const bgColor = useTransform(scrollYProgress, [0.15, 0.5], ["#0a0a0a", "#ffffff"]);

  // Width and height are tracked independently (in real pixels, not a
  // single "vmax" size) so the box starts matching the viewport's own
  // aspect ratio — avoiding the extreme object-cover zoom a 16:9 video
  // gets when forced into a square on a wide/short screen — and only
  // becomes a true square once it has mostly finished shrinking.
  const finalCard = Math.min(560, Math.max(280, stageSize.width * 0.32));
  const cardWidth = useTransform(scrollYProgress, [0, 0.62], [stageSize.width, finalCard]);
  const cardHeight = useTransform(scrollYProgress, [0, 0.62], [stageSize.height, finalCard]);
  const cardWidthPx = useTransform(cardWidth, (v) => `${v}px`);
  const cardHeightPx = useTransform(cardHeight, (v) => `${v}px`);
  const cardRadius = useTransform(scrollYProgress, [0, 0.5], [0, 32]);
  // Stays dark through the whole "light text over video" phase — the
  // video's own content (a bright screen, a white shirt) can't be
  // trusted to be dark enough on its own for the overlaid headline to
  // read clearly, so this overlay is the thing guaranteeing contrast.
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.45], [0.6, 0]);

  const ghost1WidthPx = useTransform(cardWidth, (v) => `${v + 48}px`);
  const ghost1HeightPx = useTransform(cardHeight, (v) => `${v + 48}px`);
  const ghost2WidthPx = useTransform(cardWidth, (v) => `${v + 88}px`);
  const ghost2HeightPx = useTransform(cardHeight, (v) => `${v + 88}px`);
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
  // A dark shadow while the text sits over the video, so it stays
  // legible regardless of how bright the footage underneath it is;
  // dropped once the text itself turns dark on the now-light surface.
  const headShadow = useTransform(
    scrollYProgress,
    [0.46, 0.47],
    ["0 2px 28px rgba(0,0,0,0.55), 0 1px 3px rgba(0,0,0,0.7)", "none"]
  );

  const blurbOpacity = useTransform(scrollYProgress, [0.58, 0.85], [0, 1]);
  const blurbY = useTransform(scrollYProgress, [0.58, 0.85], [24, 0]);
  // Anchored to the card's actual bottom edge (not a fixed viewport
  // percentage) so there's always a clear, consistent gap beneath it.
  const blurbTop = useTransform(cardHeight, (v) => `calc(50% + ${v / 2}px + 2.5rem)`);

  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <div ref={trackRef} className="pin-only relative" style={{ height: "260vh" }}>
      <motion.div
        ref={stageRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ backgroundColor: bgColor }}
      >
        {/* card + headline share one centred grid cell so they align perfectly */}
        <div
          className="absolute inset-0 grid place-items-center"
          style={{ gridTemplateColumns: "100%", gridTemplateRows: "100%" }}
        >
          <motion.div
            className="col-start-1 row-start-1 border border-hairline-dark"
            style={{
              width: ghost2WidthPx,
              height: ghost2HeightPx,
              borderRadius: 32,
              opacity: ghostOpacity,
            }}
          />
          <motion.div
            className="col-start-1 row-start-1 border border-hairline-dark"
            style={{
              width: ghost1WidthPx,
              height: ghost1HeightPx,
              borderRadius: 32,
              opacity: ghostOpacity,
            }}
          />
          <motion.div
            className="col-start-1 row-start-1 relative overflow-hidden"
            style={{ width: cardWidthPx, height: cardHeightPx, borderRadius: cardRadius }}
          >
            <HeroVideo />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/55"
              style={{ opacity: overlayOpacity }}
            />
          </motion.div>

          <div className="col-start-1 row-start-1 flex w-full max-w-5xl flex-col items-center px-6 text-center">
            <motion.span
              className="t-h1 block"
              style={{ x: headLeftX, color: headColorPrimary, textShadow: headShadow }}
            >
              {heroCopy.h1Primary}
            </motion.span>
            <motion.span
              className="t-h1 block"
              style={{
                x: headRightX,
                color: headColorSoft,
                marginTop: headGap,
                textShadow: headShadow,
              }}
            >
              {heroCopy.h1Soft}
            </motion.span>
          </div>
        </div>

        <motion.div
          className="absolute inset-x-0 px-6 text-center"
          style={{ top: blurbTop, opacity: blurbOpacity, y: blurbY }}
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
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/70" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <HeroHeadline className="text-grey-100 [text-shadow:0_2px_28px_rgba(0,0,0,0.55),0_1px_3px_rgba(0,0,0,0.7)]" />
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
