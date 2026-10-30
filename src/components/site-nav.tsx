"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { navLinks, site } from "@/lib/content";

export function SiteNav() {
  const { scrollY } = useScroll();
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const p = Math.min(latest / 240, 1);
    setProgress(p);
  });

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

  return (
    <>
      <div className="w-full bg-ink text-paper">
        <div className="container-ecs flex items-center justify-center gap-2 py-2 text-center">
          <p className="t-ui text-grey-400">
            Now enrolling cohorts for the 2026/2027 session
          </p>
          <a href="#contact" className="t-ui underline underline-offset-2 hover-rule">
            Learn more <span className="hover-arrow">&rarr;</span>
          </a>
        </div>
      </div>

      <motion.header
        className="sticky top-0 z-50 flex justify-center pt-3 px-4"
        aria-label="Primary"
      >
        <motion.nav
          style={{ width: navWidth }}
          className="relative flex items-center justify-between rounded-[var(--radius-nav)] px-3 py-2 transition-shadow"
          animate={{
            backgroundColor:
              progress > 0.05 ? "rgba(10,10,10,1)" : "rgba(10,10,10,0)",
            boxShadow:
              progress > 0.05
                ? "0 9px 80px rgba(0,0,0,0.07), 0 2px 18px rgba(0,0,0,0.05), 0 1px 4px rgba(0,0,0,0.08)"
                : "0 0 0 rgba(0,0,0,0)",
          }}
          transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
        >
          <a href="#top" className="flex items-center gap-2 pl-2 pr-4 py-1.5">
            <span
              className="t-h4 tracking-tight"
              style={{ color: progress > 0.3 ? "#fff" : "var(--color-ink)" }}
            >
              eco<span style={{ color: "var(--color-flare)" }}>tech</span>
            </span>
          </a>

          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="t-ui px-3 py-2 rounded-full transition-colors hover-rule"
                  style={{ color: progress > 0.3 ? "#dedede" : "var(--color-grey-600)" }}
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
