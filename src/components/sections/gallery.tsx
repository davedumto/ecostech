"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

const tiles = [
  {
    kind: "video" as const,
    src: "/video/session-720.mp4",
    poster: "/video/session-still.jpg",
    caption: "A facilitator walks a cohort through a live training scenario.",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    kind: "image" as const,
    src: "/images/trainee-focused.jpg",
    caption: "Focused, hands-on, not a lecture to sit through.",
    span: "",
  },
  {
    kind: "image" as const,
    src: "/images/session-notes.jpg",
    caption: "Cohorts stay small enough to ask questions.",
    span: "",
  },
  {
    kind: "image" as const,
    src: "/images/session-audience.jpg",
    caption: "Staff from across the ICT unit, trained together.",
    span: "",
  },
];

export function Gallery() {
  return (
    <section className="surface-light section" aria-label="Inside a cohort">
      <div className="container-ecs">
        <Reveal>
          <span className="eyebrow">In the room</span>
          <h2 className="t-h2">What a cohort actually looks like.</h2>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
            {tiles.map((tile) => (
              <figure
                key={tile.caption}
                className={`group relative overflow-hidden rounded-[var(--radius-card)] bg-grey-100 ${tile.span}`}
              >
                {tile.kind === "video" ? (
                  <video
                    className="h-72 w-full object-cover sm:h-56 lg:h-full lg:min-h-[22rem]"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={tile.poster}
                  >
                    <source src={tile.src} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    src={tile.src}
                    alt=""
                    width={800}
                    height={560}
                    className="h-72 w-full object-cover sm:h-56 lg:h-full"
                  />
                )}
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent p-4 pt-12 text-paper">
                  <span className="t-ui">{tile.caption}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
