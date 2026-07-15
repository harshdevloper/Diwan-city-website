"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { site } from "@/data/site";
import { ArrowRight, Button } from "./ui/Button";
import { MapPin } from "./ui/Icons";

const stats = [
  { value: "86+", label: "Approved Plots" },
  { value: "40 ft", label: "Widest Roads" },
  { value: "24×7", label: "Security" },
  { value: "2 BHK", label: "Flats Ready" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Background drifts slower than the page; copy lifts and fades out.
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "18%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.12]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -70]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.65], [1, reduced ? 1 : 0]);

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section id="home" ref={ref} className="relative isolate min-h-[100svh] overflow-hidden bg-forest-950">
      {/* Background render */}
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0 -z-20">
        <Image
          src="/images/hero-villa.jpg"
          alt="Architectural render of a modern villa at Diwan City, Shamli"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Luxury overlay. Weighted to the left, where the copy sits, so the render
          stays visible on the right instead of drowning in green. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-950/92 via-forest-950/55 to-forest-950/15"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-forest-950/70 via-transparent to-forest-950/90"
      />
      <motion.div
        aria-hidden
        data-reveal
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.4 }}
        className="absolute -left-40 top-1/4 -z-10 h-[36rem] w-[36rem] rounded-full bg-gold-500/12 blur-[120px]"
      />

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col justify-center px-5 pb-28 pt-32 sm:px-8 lg:px-12">
        <motion.div style={{ y: copyY, opacity: copyOpacity }} className="max-w-3xl">
          {/* Location pill */}
          <motion.div
            data-reveal
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
          >
            <span className="glass-dark inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-xs font-medium tracking-wide text-white/85">
              <MapPin className="h-3.5 w-3.5 text-gold-300" />
              Karnal Bypass, {site.locality} · {site.region}
            </span>
          </motion.div>

          {/* Heading */}
          <h1 className="mt-7 font-display text-[2.75rem] leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-[5.25rem]">
            {["An address", "that was built"].map((line, i) => (
              <motion.span
                key={line}
                data-reveal
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.25 + i * 0.12, ease }}
                className="block"
              >
                {line}
              </motion.span>
            ))}
            <motion.span
              data-reveal
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.49, ease }}
              className="block"
            >
              <em className="text-gold-gradient italic font-normal">before it was sold.</em>
            </motion.span>
          </h1>

          {/* Subheading */}
          <motion.p
            data-reveal
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.62, ease }}
            className="mt-7 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
          >
            Diwan City is an approved, gated colony on the Karnal Bypass in Shamli — plots from 66 to
            237 gaj and ready 2 BHK flats, behind one gate, a boundary wall and roads that are already
            laid.
          </motion.p>

          {/* CTAs */}
          <motion.div
            data-reveal
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.74, ease }}
            className="mt-10 flex flex-col gap-3.5 sm:flex-row sm:items-center"
          >
            <Button href="#projects" variant="gold" size="lg">
              Explore Projects
              <ArrowRight />
            </Button>
            <Button href="#contact" variant="ghost" size="lg">
              Book Site Visit
            </Button>
          </motion.div>
        </motion.div>

        {/* Stat strip */}
        <motion.dl
          data-reveal
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease }}
          // In flow on phones (the copy is tall enough to reach the bottom there);
          // pinned to the base of the viewport from lg up.
          className="glass-dark mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl sm:grid-cols-4 lg:absolute lg:inset-x-12 lg:bottom-8 lg:mt-0"
        >
          {stats.map((s) => (
            <div key={s.label} className="px-5 py-5 text-center sm:py-6">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-display text-2xl text-gold-300 sm:text-3xl">{s.value}</span>
                <span className="mt-1 block text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/55">
                  {s.label}
                </span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to About"
        data-reveal
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-[9.5rem] left-1/2 hidden -translate-x-1/2 lg:block"
      >
        <span className="flex h-11 w-6 items-start justify-center rounded-full border border-white/25 p-1.5">
          <motion.span
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1 rounded-full bg-gold-300"
          />
        </span>
      </motion.a>
    </section>
  );
}
