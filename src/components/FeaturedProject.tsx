"use client";

import Image from "next/image";
import { floorPlan, site } from "@/data/site";
import { ArrowRight, Button } from "./ui/Button";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";
import { Container, Eyebrow, Section } from "./ui/Section";

const highlights = [
  { k: "Status", v: "Under development · rows built" },
  { k: "Offering", v: "Residential plots & 2 BHK flats" },
  { k: "Plot range", v: "66 – 237 gaj" },
  { k: "Approach", v: "40 ft road off Goharni Bypass" },
];

export function FeaturedProject() {
  return (
    <Section id="projects" tone="dark">
      {/* Ambient light */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-[52rem] -translate-x-1/2 rounded-full bg-gold-500/10 blur-[130px]"
      />
      <span aria-hidden className="hairline-gold absolute inset-x-0 top-0 h-px" />

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow tone="dark">Featured Project</Eyebrow>
            <h2 className="mt-5 font-display text-4xl leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
              {site.project}
              {", "}
              <em className="text-gold-gradient italic font-normal">Shamli</em>
            </h2>
            <p className="mt-3 font-hindi text-2xl text-gold-300/80">{site.projectHindi}</p>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-forest-100/70 sm:text-lg">
              One gated colony on the Karnal Bypass, sold against a stamped approved layout — with the
              park, the temple, the shops and the wall all inside it.
            </p>
          </Reveal>
        </div>

        {/* Hero card */}
        <Reveal delay={0.1}>
          <div className="group relative mt-14 overflow-hidden rounded-[2rem] ring-1 ring-white/10">
            <div className="relative aspect-16/10 sm:aspect-21/9">
              <Image
                src="/images/gate-entrance.jpg"
                alt="The arched entrance gate of Diwan City with palm trees, a security cabin and the boundary wall"
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                // Biased downward so the wide crop clears the logo mark printed
                // across the top of the brochure render.
                className="object-cover object-[center_68%] transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
            </div>

            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/45 to-transparent"
            />

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9 lg:p-11">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-gold-500/15 px-3.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-gold-200 ring-1 ring-gold-400/30">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-300" />
                    Approved Layout
                  </span>
                  <h3 className="mt-4 font-display text-3xl text-white sm:text-4xl">
                    The Grand Entrance
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-white/60">
                    A single controlled entry, a guard on duty around the clock, and a boundary wall
                    that runs the full perimeter.
                  </p>
                </div>

                <Button href="#contact" variant="gold">
                  Enquire About Plots
                  <ArrowRight />
                </Button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Highlights */}
        <RevealGroup className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h) => (
            <RevealItem key={h.k}>
              <div className="glass-dark h-full rounded-2xl p-5 transition-colors duration-300 hover:border-gold-300/40">
                <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-gold-300/70">
                  {h.k}
                </dt>
                <dd className="mt-2 text-sm font-medium leading-snug text-white/85">{h.v}</dd>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* 2 BHK floor plan */}
        <div className="mt-24 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal direction="right">
            <div className="group relative overflow-hidden rounded-[1.75rem] bg-white p-3 ring-1 ring-white/10">
              <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
                <Image
                  src="/images/floor-plan.jpg"
                  alt={`2 BHK floor plan: two mirrored ${floorPlan.width} × ${floorPlan.depth} units with bedrooms, lobby, kitchen, toilet and balcony`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                />
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal direction="left">
              <Eyebrow tone="dark">Also Available</Eyebrow>
              <h3 className="mt-5 font-display text-3xl leading-tight text-white sm:text-4xl">
                A <em className="text-gold-gradient italic font-normal">2 BHK</em> that doesn&apos;t
                waste a foot.
              </h3>
              <p className="mt-5 text-base leading-relaxed text-forest-100/70">
                {floorPlan.width} × {floorPlan.depth}, laid out as mirrored pairs off a shared stair.
                Two equal bedrooms, a lobby long enough to actually use, and a balcony that runs almost
                the full width of the unit.
              </p>
            </Reveal>

            <RevealGroup className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/8 ring-1 ring-white/10">
              {floorPlan.rooms.map((r) => (
                <RevealItem key={r.name}>
                  <div className="h-full bg-forest-950/60 px-5 py-4">
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-gold-300/70">
                      {r.name}
                    </p>
                    <p className="mt-1.5 font-display text-lg text-white">{r.size}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Container>
    </Section>
  );
}
