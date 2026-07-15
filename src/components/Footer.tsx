import Image from "next/image";
import { amenities, contacts, intl, navLinks, site, waLink } from "@/data/site";
import { MapPin, Phone, WhatsApp } from "./ui/Icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-forest-950 text-white">
      <span aria-hidden className="hairline-gold absolute inset-x-0 top-0 h-px" />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-1/2 h-80 w-[46rem] -translate-x-1/2 rounded-full bg-gold-500/8 blur-[120px]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full bg-white ring-1 ring-white/20">
                <Image
                  src="/images/logo.png"
                  alt=""
                  width={481}
                  height={374}
                  className="h-8 w-8 object-contain"
                />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-xl tracking-tight">
                  Diwan <span className="text-gold-gradient">Associates</span>
                </span>
                <span className="mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-white/45">
                  {site.locality} · {site.region}
                </span>
              </span>
            </div>

            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/50">
              Approved residential plots and 2 BHK flats at {site.project}, on the Karnal Bypass in{" "}
              {site.locality}. Gated, walled, and already built — come and walk it.
            </p>

            <p className="mt-5 font-hindi text-lg text-gold-300/70">{site.projectHindi}</p>
          </div>

          {/* Navigate */}
          <nav aria-label="Footer">
            <h2 className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-gold-300/70">
              Explore
            </h2>
            <ul className="mt-5 space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-white/55 transition-colors duration-300 hover:text-gold-300"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Facilities */}
          <div>
            <h2 className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-gold-300/70">
              Facilities
            </h2>
            <ul className="mt-5 space-y-3">
              {amenities.slice(0, 7).map((a) => (
                <li key={a.title} className="text-sm text-white/55">
                  {a.title}
                </li>
              ))}
              <li>
                <a
                  href="#amenities"
                  className="text-sm font-medium text-gold-300/80 transition-colors hover:text-gold-200"
                >
                  + 5 more →
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-gold-300/70">
              Get in touch
            </h2>

            <ul className="mt-5 space-y-4">
              {contacts.map((c) => (
                <li key={c.phone}>
                  <p className="text-sm font-medium text-white/85">{c.name}</p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <a
                      href={`tel:${intl(c.phone)}`}
                      className="inline-flex items-center gap-1.5 text-sm tabular-nums text-gold-300 transition-colors hover:text-gold-200"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      {c.phone}
                    </a>
                    <a
                      href={waLink(c.phone, `Hello, I'd like to enquire about ${site.project}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`WhatsApp ${c.name}`}
                      className="text-white/35 transition-colors hover:text-[#25D366]"
                    >
                      <WhatsApp className="h-4 w-4" />
                    </a>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-6 flex items-start gap-2 text-sm leading-relaxed text-white/50">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-300/70" />
              {site.address}
            </p>
          </div>
        </div>

        {/* Disclaimer — the note printed on brochure page 4 */}
        <div className="mt-14 rounded-2xl border border-white/8 bg-white/3 p-5">
          <p className="text-xs leading-relaxed text-white/40">
            <strong className="font-semibold text-white/60">Disclaimer:</strong> Images of villas,
            interiors and the entrance gate are architectural renders and are indicative only — actual
            construction may differ. Plot areas and road widths are taken from the approved layout plan
            and are subject to final measurement at registry. Any expense incurred on the sale deed (
            <span className="font-hindi">बैनामा</span>) is to be borne by the buyer. This website is
            not an offer or a contract. Please verify all approvals and papers before purchase.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-8 sm:flex-row">
          <p className="text-xs text-white/35">
            © {year} {site.company}. All rights reserved.
          </p>
          <p className="text-xs text-white/25">
            {site.project}, Karnal Bypass, {site.locality}, {site.region}
          </p>
        </div>
      </div>
    </footer>
  );
}
