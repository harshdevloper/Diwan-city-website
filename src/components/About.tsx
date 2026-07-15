"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { contacts, site } from "@/data/site";
import { Reveal } from "./ui/Reveal";
import { Container, Eyebrow, Section } from "./ui/Section";

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-8%", "8%"]);

  return (
    <Section id="about" tone="light">
      {/* Soft gold wash behind the section */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 h-[30rem] w-[30rem] rounded-full bg-gold-300/10 blur-[110px]"
      />

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Images */}
          <div ref={ref} className="relative">
            <Reveal direction="right">
              <div className="relative aspect-4/5 overflow-hidden rounded-[1.75rem] shadow-[0_30px_80px_-30px_rgba(10,40,32,0.5)] sm:aspect-3/4">
                <motion.div style={{ y: imgY }} className="absolute -inset-y-[8%] inset-x-0">
                  <Image
                    src="/images/construction-progress.jpg"
                    alt="A completed row of three-storey houses at Diwan City, photographed on site"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>
                <span
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-forest-950/55 via-transparent to-transparent"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/15"
                />
              </div>
            </Reveal>

            {/* Overlapping gate render */}
            <Reveal direction="up" delay={0.15}>
              <div className="absolute -bottom-10 -right-4 hidden w-48 overflow-hidden rounded-2xl ring-1 ring-white/50 shadow-[0_20px_50px_-15px_rgba(10,40,32,0.55)] sm:block lg:-right-10 lg:w-56">
                <Image
                  src="/images/gate-entrance.jpg"
                  alt="Render of the Diwan City entrance gate"
                  width={1500}
                  height={938}
                  sizes="224px"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>

            {/* Floating badge */}
            <Reveal direction="left" delay={0.25}>
              <div className="glass-light absolute -left-3 top-8 rounded-2xl px-5 py-4 lg:-left-8">
                <p className="font-display text-3xl leading-none text-forest-900">86+</p>
                <p className="mt-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-forest-800/55">
                  Plots on the
                  <br />
                  approved plan
                </p>
              </div>
            </Reveal>
          </div>

          {/* Copy */}
          <div>
            <Reveal>
              <Eyebrow>About {site.company}</Eyebrow>

              <h2 className="mt-5 font-display text-4xl leading-[1.1] tracking-tight text-forest-900 sm:text-5xl">
                We would rather you
                <br />
                <em className="text-gold-gradient italic font-normal">walk the road</em> first.
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-7 space-y-5 text-base leading-relaxed text-forest-800/75 sm:text-lg">
                <p>
                  Most colonies on the bypass are sold from a brochure and a promise. Diwan City is
                  further along than that. The three-storey rows are standing, the roads are laid, the
                  boundary wall is up and the gate is in — you can drive in this weekend and see the
                  thing you are being asked to buy.
                </p>
                <p>
                  Every plot number, area and road width we publish is read directly off the approved
                  layout plan, not rounded up for a headline. The colony runs from compact 66 gaj plots
                  to two corner holdings of over 230 gaj, with a park and a temple inside the wall, and
                  2 BHK flats for buyers who would rather not build.
                </p>
                <p className="font-hindi text-forest-800/60">
                  {site.addressHindi}
                </p>
              </div>
            </Reveal>

            {/* Signatures */}
            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-5 border-t border-forest-900/10 pt-8">
                {contacts.map((c) => (
                  <div key={c.phone}>
                    <p className="font-display text-lg text-forest-900">{c.name}</p>
                    <p className="font-hindi text-xs text-forest-800/50">{c.nameHindi}</p>
                    <a
                      href={`tel:+91${c.phone}`}
                      className="mt-1.5 inline-block text-sm font-semibold tracking-wide text-gold-600 transition-colors hover:text-gold-700"
                    >
                      {c.phone}
                    </a>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
