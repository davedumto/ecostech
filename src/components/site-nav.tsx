"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { navLinks, site } from "@/lib/content";

export function SiteNav() {
  const { scrollY } = useScroll();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Publishes the header's own height as a CSS var so the hero can pull
  // itself up underneath it by exactly that amount.
  useLayoutEffect(() => {
    const measure = () => {
      document.documentElement.style.setProperty(
        "--nav-offset",
        `${headerRef.current?.offsetHeight ?? 0}px`
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navWidth = useTransform(scrollY, [0, 240], ["100%", "min(100% - 2rem, 54rem)"]);
  // Driven straight off the scrollY motion value (like navWidth above),
  // not React state + a boolean threshold — that caused a visible snap at
  // the threshold plus re-render-throttled jank during active scrolling,
  // in both directions. This interpolates continuously every frame instead.
  const navBg = useTransform(scrollY, [0, 240], ["rgba(10,10,10,0)", "rgba(10,10,10,1)"]);
  const shadowAmount = useTransform(scrollY, [0, 240], [0, 1]);
  const navShadow = useTransform(
    shadowAmount,
    (v) =>
      `0 9px ${80 * v}px rgba(0,0,0,${0.07 * v}), 0 2px ${18 * v}px rgba(0,0,0,${0.05 * v}), 0 1px ${4 * v}px rgba(0,0,0,${0.08 * v})`
  );

  return (
    <>
      <motion.header
        ref={headerRef}
        className="sticky top-0 z-50 flex justify-center pt-3 px-4"
        aria-label="Primary"
      >
        <motion.nav
          style={{ width: navWidth, backgroundColor: navBg, boxShadow: navShadow }}
          className="relative flex items-center justify-between rounded-[var(--radius-nav)] px-3 py-2"
        >
          <a href="#top" className="flex items-center gap-2 pl-2 pr-4 py-1.5">
            <span
              className="t-h4 tracking-tight [text-shadow:0_1px_12px_rgba(0,0,0,0.45)]"
              style={{ color: "#fff" }}
            >
              ecos<span style={{ color: "var(--color-flare)" }}>tech</span>
            </span>
          </a>

          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="t-ui px-3 py-2 rounded-full transition-colors hover-rule text-grey-200 [text-shadow:0_1px_12px_rgba(0,0,0,0.45)]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <a href="#contact" className="btn btn-light">
              Book a training
            </a>
          </div>

          <button
            type="button"
            className="lg:hidden btn btn-light"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </motion.nav>
      </motion.header>

      {open && (
        <div
          id="mobile-nav"
          className="fixed inset-0 z-40 bg-ink text-paper flex flex-col items-center justify-center gap-6 lg:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="t-h3"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn btn-flare mt-4"
            onClick={() => setOpen(false)}
          >
            Book a training
          </a>
          <p className="t-ui text-grey-400 absolute bottom-8">{site.email}</p>
        </div>
      )}
    </>
  );
}
