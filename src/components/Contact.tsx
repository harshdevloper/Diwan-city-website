"use client";

import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { contacts, intl, plotSizes, site, waLink } from "@/data/site";
import { ArrowRight, ButtonEl } from "./ui/Button";
import { MapPin, Phone, WhatsApp } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";
import { Container, Eyebrow, Section } from "./ui/Section";

type Fields = { name: string; phone: string; interest: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const initial: Fields = { name: "", phone: "", interest: "", message: "" };

function validate(f: Fields): Errors {
  const e: Errors = {};

  if (f.name.trim().length < 2) e.name = "Please tell us your name.";

  // Indian mobile numbers: 10 digits starting 6–9. Tolerate spaces, +91 and 0 prefixes.
  const digits = f.phone.replace(/[\s-]/g, "").replace(/^(\+91|0)/, "");
  if (!/^[6-9]\d{9}$/.test(digits)) e.phone = "Enter a 10-digit mobile number.";

  if (!f.interest) e.interest = "Choose what you're looking for.";

  return e;
}

/**
 * Leads are handed to WhatsApp rather than posted to a server, so an enquiry
 * lands directly on the sales phone with no backend to babysit and no lead lost
 * to a silently failing endpoint.
 *
 * TODO: if you later want enquiries in a CRM or inbox, add a server action here
 * that persists the lead *before* opening WhatsApp — don't replace this handoff.
 */
export function Contact() {
  const [fields, setFields] = useState<Fields>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const set = (key: keyof Fields) => (e: { target: { value: string } }) => {
    setFields((f) => ({ ...f, [key]: e.target.value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const found = validate(fields);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = document.querySelector<HTMLElement>('[aria-invalid="true"]');
      first?.focus();
      return;
    }

    const text = [
      `Hello ${contacts[0].name}, I'd like to enquire about ${site.project}.`,
      ``,
      `Name: ${fields.name.trim()}`,
      `Phone: ${fields.phone.trim()}`,
      `Interested in: ${fields.interest}`,
      fields.message.trim() ? `Message: ${fields.message.trim()}` : null,
      ``,
      `(Sent from the ${site.company} website)`,
    ]
      .filter((l) => l !== null)
      .join("\n");

    window.open(waLink(contacts[0].phone, text), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const field =
    "w-full rounded-xl border bg-white/5 px-4 py-3.5 text-sm text-white placeholder:text-white/35 " +
    "transition-colors duration-300 focus:bg-white/10 focus:outline-none";
  const ok = "border-white/12 focus:border-gold-400/70";
  const bad = "border-red-400/70 focus:border-red-400";
  const labelCls = "mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-gold-300/70";

  return (
    <Section id="contact" tone="dark">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-40 top-0 h-[34rem] w-[34rem] rounded-full bg-gold-500/10 blur-[130px]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-forest-500/15 blur-[120px]"
      />

      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Left: invitation + direct lines */}
          <div>
            <Reveal>
              <Eyebrow tone="dark">Contact</Eyebrow>
              <h2 className="mt-5 font-display text-4xl leading-[1.1] tracking-tight text-white sm:text-5xl">
                Come and see it.
                <br />
                <em className="text-gold-gradient italic font-normal">Then decide.</em>
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-forest-100/70 sm:text-lg">
                Tell us the size you have in mind and we&apos;ll have the plot, the rate and the papers
                ready before you arrive. Someone will meet you at the gate.
              </p>
            </Reveal>

            <div className="mt-10 space-y-3">
              {contacts.map((c, i) => (
                <Reveal key={c.phone} delay={0.1 + i * 0.08}>
                  <div className="glass-dark flex items-center justify-between gap-4 rounded-2xl p-5">
                    <div className="min-w-0">
                      <p className="font-display text-lg text-white">{c.name}</p>
                      <p className="font-hindi text-xs text-white/45">{c.nameHindi}</p>
                      <p className="mt-1 text-sm font-medium tabular-nums tracking-wide text-gold-300">
                        {c.phone}
                      </p>
                    </div>

                    <div className="flex shrink-0 gap-2">
                      <a
                        href={`tel:${intl(c.phone)}`}
                        aria-label={`Call ${c.name}`}
                        className="grid h-11 w-11 place-items-center rounded-full text-white/70 ring-1 ring-white/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:text-white"
                      >
                        <Phone className="h-4 w-4" />
                      </a>
                      <a
                        href={waLink(c.phone, `Hello ${c.name}, I'd like to enquire about ${site.project}, Shamli.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`WhatsApp ${c.name}`}
                        className="grid h-11 w-11 place-items-center rounded-full text-white/70 ring-1 ring-white/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#25D366]/20 hover:text-[#25D366] hover:ring-[#25D366]/40"
                      >
                        <WhatsApp className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </Reveal>
              ))}

              <Reveal delay={0.26}>
                <div className="glass-dark flex items-start gap-3.5 rounded-2xl p-5">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/8 text-gold-300">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-medium leading-relaxed text-white/85">{site.address}</p>
                    <p className="mt-1.5 font-hindi text-xs leading-relaxed text-white/45">
                      {site.addressHindi}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right: form */}
          <Reveal direction="left" delay={0.1}>
            <div className="glass-dark rounded-[1.75rem] p-7 sm:p-9">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex min-h-[26rem] flex-col items-center justify-center text-center"
                >
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-gold-500/15 text-gold-300 ring-1 ring-gold-400/30">
                    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                      <path d="m5 12.5 4.5 4.5L19 7.5" />
                    </svg>
                  </span>

                  <h3 className="mt-6 font-display text-2xl text-white">WhatsApp is open</h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/60">
                    Your enquiry is typed out and ready — just press send in WhatsApp so it reaches{" "}
                    {contacts[0].name}.
                  </p>

                  <p className="mt-6 text-xs text-white/40">Didn&apos;t open? Call {contacts[0].phone}.</p>

                  <button
                    type="button"
                    onClick={() => {
                      setSent(false);
                      setFields(initial);
                    }}
                    className="mt-7 text-sm font-semibold text-gold-300 underline-offset-4 transition-colors hover:text-gold-200 hover:underline"
                  >
                    Send another enquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={onSubmit} noValidate>
                  <h3 className="font-display text-2xl text-white">Book a site visit</h3>
                  <p className="mt-2 text-sm text-white/55">
                    Takes a minute. We&apos;ll reply on WhatsApp.
                  </p>

                  <div className="mt-7 space-y-5">
                    <div>
                      <label htmlFor="name" className={labelCls}>
                        Your name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="e.g. Ramesh Kumar"
                        value={fields.name}
                        onChange={set("name")}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className={`${field} ${errors.name ? bad : ok}`}
                      />
                      {errors.name ? (
                        <p id="name-error" className="mt-1.5 text-xs text-red-300">
                          {errors.name}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label htmlFor="phone" className={labelCls}>
                        Mobile number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel"
                        placeholder="10-digit mobile"
                        value={fields.phone}
                        onChange={set("phone")}
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                        className={`${field} ${errors.phone ? bad : ok}`}
                      />
                      {errors.phone ? (
                        <p id="phone-error" className="mt-1.5 text-xs text-red-300">
                          {errors.phone}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label htmlFor="interest" className={labelCls}>
                        I&apos;m looking for
                      </label>
                      <select
                        id="interest"
                        name="interest"
                        value={fields.interest}
                        onChange={set("interest")}
                        aria-invalid={Boolean(errors.interest)}
                        aria-describedby={errors.interest ? "interest-error" : undefined}
                        className={`${field} ${errors.interest ? bad : ok} [&>option]:bg-forest-900 [&>option]:text-white`}
                      >
                        <option value="">Select an option…</option>
                        {plotSizes.map((p) => (
                          <option key={p.gaj} value={`Plot — ${p.gaj} gaj (${p.label})`}>
                            Plot — {p.gaj} gaj · {p.label}
                          </option>
                        ))}
                        <option value="2 BHK Flat">2 BHK Flat</option>
                        <option value="Shop / commercial">Shop / commercial</option>
                        <option value="Not sure yet">Not sure yet — please advise</option>
                      </select>
                      {errors.interest ? (
                        <p id="interest-error" className="mt-1.5 text-xs text-red-300">
                          {errors.interest}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label htmlFor="message" className={labelCls}>
                        Message <span className="font-normal normal-case tracking-normal text-white/30">(optional)</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        placeholder="Preferred day to visit, budget, anything else…"
                        value={fields.message}
                        onChange={set("message")}
                        className={`${field} ${ok} resize-none`}
                      />
                    </div>
                  </div>

                  <ButtonEl type="submit" variant="gold" size="lg" className="mt-7 w-full">
                    <WhatsApp className="h-4 w-4" />
                    Send on WhatsApp
                    <ArrowRight />
                  </ButtonEl>

                  <p className="mt-4 text-center text-xs leading-relaxed text-white/35">
                    Opens WhatsApp with your enquiry ready to send. We don&apos;t store anything you
                    type here.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
