"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { gallery } from "@/data/site";
import { RevealGroup, RevealItem } from "./ui/Reveal";
import { Container, Section, SectionHeading } from "./ui/Section";

/** Grid footprint per item, so the mosaic stays deliberate rather than random. */
const spanClass: Record<string, string> = {
  wide: "sm:col-span-2 sm:row-span-2",
  tall: "sm:col-span-1 sm:row-span-2",
  small: "sm:col-span-1 sm:row-span-1",
};

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const go = useCallback(
    (delta: number) => setIndex((i) => (i === null ? i : (i + delta + gallery.length) % gallery.length)),
    [],
  );

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, go]);

  const current = index === null ? null : gallery[index];

  return (
    <Section id="gallery" tone="sand">
      <Container>
        <SectionHeading
          eyebrow="Gallery"
          title="The colony, as"
          accent="drawn and as built"
          body="Renders, interior visuals, the approved plan — and a photograph of what is actually standing on site today. Every image here is from the Diwan City brochure."
        />

        <RevealGroup
          stagger={0.06}
          className="mt-16 grid auto-rows-[168px] grid-cols-2 gap-3 sm:auto-rows-[152px] sm:grid-cols-4 sm:gap-4 lg:auto-rows-[172px]"
        >
          {gallery.map((item, i) => (
            <RevealItem key={item.src} className={spanClass[item.span] ?? spanClass.small}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Open image: ${item.caption}`}
                className="group relative h-full w-full overflow-hidden rounded-xl bg-forest-900 ring-1 ring-forest-900/8 transition-shadow duration-500 hover:shadow-[0_24px_50px_-20px_rgba(10,40,32,0.5)] sm:rounded-2xl"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                  className={`transition-transform duration-[1.3s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 ${
                    item.src.includes("plan") ? "bg-white object-contain p-1" : "object-cover"
                  }`}
                />

                {/* Scrim — always slightly present, deepens on hover */}
                <span
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/15 to-transparent opacity-75 transition-opacity duration-500 group-hover:opacity-95"
                />

                <span className="absolute inset-x-0 bottom-0 p-3.5 text-left sm:p-4">
                  <span className="block font-display text-base leading-tight text-white sm:text-lg">
                    {item.caption}
                  </span>
                  <span className="mt-0.5 block text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-gold-300/75">
                    {item.sub}
                  </span>
                </span>

                {/* Expand affordance */}
                <span
                  aria-hidden
                  className="absolute right-3 top-3 grid h-8 w-8 translate-y-1 place-items-center rounded-full bg-white/12 text-white opacity-0 backdrop-blur-md transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                </span>
              </button>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>

      {/* Lightbox */}
      <AnimatePresence>
        {open && current ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={current.caption}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-forest-950/92 p-4 backdrop-blur-xl sm:p-8"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full text-white/70 ring-1 ring-white/15 transition-colors hover:bg-white/10 hover:text-white sm:right-7 sm:top-7"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            {(["prev", "next"] as const).map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(dir === "next" ? 1 : -1);
                }}
                aria-label={dir === "next" ? "Next image" : "Previous image"}
                className={`absolute top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full text-white/70 ring-1 ring-white/15 transition-colors hover:bg-white/10 hover:text-white ${
                  dir === "next" ? "right-3 sm:right-7" : "left-3 sm:left-7"
                }`}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                  <path d={dir === "next" ? "M9 5l7 7-7 7" : "M15 5l-7 7 7 7"} />
                </svg>
              </button>
            ))}

            <motion.figure
              key={current.src}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-full w-full max-w-5xl flex-col"
            >
              <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl bg-forest-900">
                <Image
                  src={current.src}
                  alt={current.alt}
                  width={2000}
                  height={1400}
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="max-h-[72vh] w-full object-contain"
                />
              </div>

              <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-2 px-1">
                <div>
                  <p className="font-display text-lg text-white">{current.caption}</p>
                  <p className="text-xs text-white/50">{current.sub}</p>
                </div>
                <p className="text-xs font-medium tabular-nums text-white/40">
                  {(index ?? 0) + 1} / {gallery.length}
                </p>
              </figcaption>
            </motion.figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Section>
  );
}
