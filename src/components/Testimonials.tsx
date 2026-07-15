"use client";

import { testimonials } from "@/data/site";
import { RevealGroup, RevealItem } from "./ui/Reveal";
import { Container, Section, SectionHeading } from "./ui/Section";

export function Testimonials() {
  return (
    <Section tone="dark">
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/8 blur-[130px]"
      />

      <Container>
        <SectionHeading
          tone="dark"
          eyebrow="Testimonials"
          title="What owners"
          accent="tell us"
        />

        {/*
          PLACEHOLDER CONTENT — the quotes below are samples, not real customers.
          Replace them in src/data/site.ts with genuine, consented testimonials
          (and real names) before launch, or remove this section entirely.
        */}
        <RevealGroup className="mt-16 grid gap-5 lg:grid-cols-3">
          {testimonials.map((t) => (
            <RevealItem key={t.quote}>
              <figure className="glass-dark group relative flex h-full flex-col rounded-[1.5rem] p-8 transition-colors duration-500 hover:border-gold-300/40">
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-6 top-3 font-display text-7xl leading-none text-gold-300/12 transition-colors duration-500 group-hover:text-gold-300/25"
                >
                  &rdquo;
                </span>

                {/* Decorative — no rating data exists, so this carries no aria label */}
                <span aria-hidden className="flex gap-1 text-gold-300">
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg key={i} viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                      <path d="m12 2 2.9 6.3 6.8.8-5 4.7 1.3 6.8L12 17.3 5.9 20.6l1.3-6.8-5-4.7 6.8-.8L12 2Z" />
                    </svg>
                  ))}
                </span>

                <blockquote className="relative mt-5 flex-1 text-base leading-relaxed text-white/80">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <figcaption className="mt-7 border-t border-white/10 pt-5">
                  <p className="font-display text-lg text-white">{t.name}</p>
                  <p className="mt-0.5 text-xs uppercase tracking-[0.14em] text-gold-300/60">
                    {t.role}
                  </p>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
