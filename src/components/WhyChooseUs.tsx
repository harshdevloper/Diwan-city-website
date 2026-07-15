"use client";

import { whyChooseUs } from "@/data/site";
import { RevealGroup, RevealItem } from "./ui/Reveal";
import { Container, Section, SectionHeading } from "./ui/Section";

export function WhyChooseUs() {
  return (
    <Section tone="light">
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-forest-900/12 to-transparent"
      />

      <Container>
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Four reasons that survive"
          accent="a site visit"
          body="Anyone can promise. These are the ones you can check for yourself, on the ground, in an afternoon."
        />

        <RevealGroup className="mt-16 grid gap-5 sm:grid-cols-2">
          {whyChooseUs.map((w, i) => (
            <RevealItem key={w.title}>
              <article className="group relative h-full overflow-hidden rounded-[1.5rem] border border-forest-900/8 bg-white p-8 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_28px_60px_-25px_rgba(10,40,32,0.35)] sm:p-10">
                {/* Watermark index */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-2 -top-6 font-display text-[7rem] leading-none text-forest-900/4 transition-all duration-700 group-hover:text-gold-500/10"
                >
                  0{i + 1}
                </span>

                <span className="inline-flex items-center rounded-full bg-forest-900/5 px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-gold-600 ring-1 ring-gold-500/20">
                  {w.stat}
                </span>

                <h3 className="relative mt-6 font-display text-2xl leading-snug text-forest-900 sm:text-3xl">
                  {w.title}
                </h3>

                <p className="relative mt-4 text-base leading-relaxed text-forest-800/70">{w.body}</p>

                <span
                  aria-hidden
                  className="absolute bottom-0 left-8 right-8 h-px scale-x-0 bg-gradient-to-r from-transparent via-gold-500 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 sm:left-10 sm:right-10"
                />
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
