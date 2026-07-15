"use client";

import { contacts, intl, site } from "@/data/site";
import { ArrowRight, Button } from "./ui/Button";
import { MapPin, Phone } from "./ui/Icons";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";
import { Container, Eyebrow, Section } from "./ui/Section";

/**
 * PLACEHOLDER: this embed searches for the locality rather than dropping an exact
 * pin, because the brochure gives a description, not coordinates. Once you have
 * the site's lat/long, swap `mapQuery` for `q=<lat>,<lng>` so the pin lands on the gate.
 */
const mapQuery = "Karnal Bypass Road, Shamli, Uttar Pradesh 247776";
const embedSrc = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=14&output=embed`;
const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQuery)}`;

const landmarks = [
  { name: "Goharni Chauraha", note: "Head towards Saharanpur Road from here" },
  { name: "Goharni Bypass Road", note: "The colony fronts this road on the layout plan" },
  { name: "Karnal Bypass", note: "The colony address, Shamli" },
  { name: "40 ft approach", note: "Single gated entry off the main road" },
];

export function LocationMap() {
  return (
    <Section id="location" tone="light">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-16">
          {/* Copy */}
          <div>
            <Reveal>
              <Eyebrow>Location</Eyebrow>
              <h2 className="mt-5 font-display text-4xl leading-[1.1] tracking-tight text-forest-900 sm:text-5xl">
                On the bypass,
                <br />
                <em className="text-gold-gradient italic font-normal">not off a lane.</em>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-forest-800/70 sm:text-lg">
                From Goharni Chauraha, head towards Saharanpur Road. Diwan City sits on the Karnal
                Bypass, entered through a single gate off a 40 ft approach road.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8 flex items-start gap-3.5 rounded-2xl border border-forest-900/8 bg-white p-5">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-forest-900/5 text-gold-600">
                  <MapPin className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-medium leading-relaxed text-forest-900">{site.address}</p>
                  <p className="mt-1.5 font-hindi text-sm leading-relaxed text-forest-800/55">
                    {site.addressHindi}
                  </p>
                </div>
              </div>
            </Reveal>

            <RevealGroup className="mt-4 grid gap-px overflow-hidden rounded-2xl bg-forest-900/8 ring-1 ring-forest-900/8 sm:grid-cols-2">
              {landmarks.map((l) => (
                <RevealItem key={l.name}>
                  <div className="h-full bg-white px-5 py-4">
                    <p className="text-sm font-semibold text-forest-900">{l.name}</p>
                    <p className="mt-1 text-xs leading-relaxed text-forest-800/55">{l.note}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.15}>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button href={directionsHref} target="_blank" rel="noopener noreferrer" variant="forest">
                  Get Directions
                  <ArrowRight />
                </Button>
                <Button href={`tel:${intl(contacts[0].phone)}`} variant="outline">
                  <Phone />
                  Call for the pin
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Map */}
          <Reveal direction="left" delay={0.1}>
            <div className="relative overflow-hidden rounded-[1.75rem] border border-forest-900/8 bg-white p-2.5 shadow-[0_30px_70px_-30px_rgba(10,40,32,0.4)]">
              <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-sand lg:aspect-square">
                <iframe
                  title={`Map showing ${site.project}, ${site.locality}`}
                  src={embedSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0 grayscale-[0.35] transition-[filter] duration-700 hover:grayscale-0"
                />
              </div>

              <span className="glass-light pointer-events-none absolute bottom-6 left-6 rounded-xl px-4 py-2.5">
                <span className="flex items-center gap-2 text-xs font-semibold text-forest-900">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-500/70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-600" />
                  </span>
                  {site.project} · {site.locality}
                </span>
              </span>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
