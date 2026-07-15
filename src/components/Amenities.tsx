"use client";

import { amenities } from "@/data/site";
import { Icon } from "./ui/Icons";
import { RevealGroup, RevealItem } from "./ui/Reveal";
import { Container, Section, SectionHeading } from "./ui/Section";

export function Amenities() {
  return (
    <Section id="amenities" tone="dark">
      <span
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/3 h-[28rem] w-[28rem] rounded-full bg-forest-500/15 blur-[120px]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 h-[26rem] w-[26rem] rounded-full bg-gold-500/8 blur-[120px]"
      />

      <Container>
        <SectionHeading
          tone="dark"
          eyebrow="Colony Facilities"
          title="Twelve things you get"
          accent="inside the wall"
          body="The full list from the brochure — कॉलोनी की सुविधाऐं — nothing added, nothing quietly dropped."
        />

        <RevealGroup stagger={0.05} className="mt-16 grid gap-px overflow-hidden rounded-[1.75rem] bg-white/8 ring-1 ring-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {amenities.map((a) => (
            <RevealItem key={a.title}>
              <div className="group relative h-full overflow-hidden bg-forest-950/70 p-7 transition-colors duration-500 hover:bg-forest-900/70">
                {/* Corner glow on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gold-400/0 blur-2xl transition-all duration-700 group-hover:bg-gold-400/20"
                />

                <span className="relative grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-white/10 to-white/0 text-gold-300 ring-1 ring-white/10 transition-all duration-500 group-hover:scale-110 group-hover:text-gold-200 group-hover:ring-gold-300/35">
                  <Icon name={a.icon} className="h-6 w-6" />
                </span>

                <h3 className="relative mt-5 font-display text-xl text-white">{a.title}</h3>
                <p className="relative mt-1.5 font-hindi text-sm text-forest-100/50">{a.hindi}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
