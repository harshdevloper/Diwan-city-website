"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { contacts, faqs, intl } from "@/data/site";
import { Button } from "./ui/Button";
import { Phone } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";
import { Container, Section, SectionHeading } from "./ui/Section";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section tone="sand">
      <Container className="max-w-4xl">
        <SectionHeading
          eyebrow="FAQ"
          title="The questions people"
          accent="actually ask"
          body="Answered from the brochure and the approved plan. If yours isn't here, call — you'll get a person, not a form."
        />

        <div className="mt-14 divide-y divide-forest-900/10 border-y border-forest-900/10">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.04}>
                <div>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      id={`faq-trigger-${i}`}
                      className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                    >
                      <span
                        className={`font-display text-lg leading-snug transition-colors duration-300 sm:text-xl ${
                          isOpen ? "text-forest-900" : "text-forest-900/75 group-hover:text-forest-900"
                        }`}
                      >
                        {f.q}
                      </span>

                      <span
                        aria-hidden
                        className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full ring-1 transition-all duration-400 ${
                          isOpen
                            ? "rotate-45 bg-gold-500 text-forest-950 ring-gold-500"
                            : "text-forest-800/50 ring-forest-900/12 group-hover:ring-gold-500/50"
                        }`}
                      >
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        id={`faq-panel-${i}`}
                        role="region"
                        aria-labelledby={`faq-trigger-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-7 pr-12 text-base leading-relaxed text-forest-800/70">
                          {f.a}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col items-center gap-5 rounded-[1.5rem] border border-forest-900/8 bg-white p-8 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="font-display text-xl text-forest-900">Still deciding?</p>
              <p className="mt-1.5 text-sm text-forest-800/60">
                Ask us anything about a specific plot — size, position, rate, papers.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {contacts.map((c) => (
                <Button key={c.phone} href={`tel:${intl(c.phone)}`} variant="outline">
                  <Phone />
                  {c.phone}
                </Button>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
