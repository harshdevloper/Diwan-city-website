"use client";

import { plotSizes } from "@/data/site";
import { SiteMap } from "./SiteMap";
import { ArrowRight, Button } from "./ui/Button";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";
import { Container, Section, SectionHeading } from "./ui/Section";

export function PlotSizes() {
  return (
    <Section tone="sand">
      <Container>
        <SectionHeading
          eyebrow="Plot Sizes"
          title="Read off the"
          accent="approved plan"
          body="Areas below are transcribed from the stamped layout plan, in gaj (square yards), with the approximate square footage alongside. Availability moves — call to confirm what is open today."
        />

        {/* Size cards */}
        {/* 8 size bands + the enquiry card = 9, so a 3-column grid closes evenly. */}
        <RevealGroup className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {plotSizes.map((p) => (
            <RevealItem key={p.gaj}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-forest-900/8 bg-white p-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-gold-400/50 hover:shadow-[0_24px_50px_-20px_rgba(10,40,32,0.35)]">
                {/* Gold sweep on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

                <div className="flex items-start justify-between gap-3">
                  <span className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-gold-600">
                    {p.label}
                  </span>
                  <span className="rounded-full bg-forest-900/5 px-2.5 py-1 text-[0.62rem] font-semibold text-forest-800/60">
                    {p.count} {p.count > 1 ? "plots" : "plot"}
                  </span>
                </div>

                <p className="mt-5 font-display text-4xl leading-none tracking-tight text-forest-900">
                  {p.gaj}
                  <span className="ml-1.5 font-sans text-sm font-medium tracking-normal text-forest-800/45">
                    gaj
                  </span>
                </p>

                <p className="mt-2 text-sm font-medium text-forest-800/50">
                  ≈ {p.sqft.toLocaleString("en-IN")} sq ft
                </p>

                <p className="mt-4 border-t border-forest-900/8 pt-4 text-sm leading-relaxed text-forest-800/65">
                  {p.note}
                </p>
              </article>
            </RevealItem>
          ))}

          {/* Enquiry card fills the 8th cell */}
          <RevealItem>
            <div className="flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-forest-900 p-6 text-white">
              <div>
                <span className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-gold-300">
                  Pricing
                </span>
                <p className="mt-5 font-display text-2xl leading-tight">
                  Rates depend on the <em className="text-gold-gradient italic font-normal">plot</em>.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-forest-100/65">
                  A corner on a 40 ft road doesn&apos;t price like an internal one. Tell us the size
                  you want and we&apos;ll quote the real number.
                </p>
              </div>
              <Button href="#contact" variant="gold" className="mt-6 w-full">
                Enquire for Price
                <ArrowRight />
              </Button>
            </div>
          </RevealItem>
        </RevealGroup>

        {/* Animated site map — layout plan with traffic along the real roads */}
        <Reveal delay={0.1}>
          <SiteMap />
        </Reveal>

        {/* Brochure disclaimer — stated on page 4 of the brochure */}
        <Reveal delay={0.15}>
          <p className="mx-auto mt-8 max-w-3xl rounded-xl border border-gold-500/25 bg-gold-100/40 px-5 py-4 text-center text-sm leading-relaxed text-forest-800/75">
            <strong className="font-semibold text-forest-900">Please note:</strong> any expense
            incurred on the sale deed / registry (<span className="font-hindi">बैनामा</span>) is to be
            borne by the buyer, over and above the plot cost.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
