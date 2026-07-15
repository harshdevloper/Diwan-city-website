"use client";

import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { contacts, intl, navLinks, site } from "@/data/site";
import { Button } from "./ui/Button";
import { Phone } from "./ui/Icons";

const sectionIds = navLinks.map((l) => l.href.slice(1));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Scroll-spy: the last section whose top has passed the navbar wins.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5] },
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <motion.header
        data-reveal
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            scrolled
              ? "border-b border-forest-900/8 bg-white/80 backdrop-blur-xl backdrop-saturate-150 shadow-[0_4px_30px_-12px_rgba(10,40,32,0.25)]"
              : "border-b border-transparent bg-transparent"
          }`}
        >
          <nav
            aria-label="Primary"
            className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12"
          >
            <a href="#home" className="flex items-center gap-3" aria-label={`${site.company} — home`}>
              <span
                className={`grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full ring-1 transition-colors duration-500 ${
                  scrolled ? "bg-white ring-forest-900/10" : "bg-white/90 ring-white/40"
                }`}
              >
                <Image
                  src="/images/logo.png"
                  alt=""
                  width={481}
                  height={374}
                  className="h-8 w-8 object-contain"
                  priority
                />
              </span>
              <span className="flex flex-col leading-none">
                <span
                  className={`whitespace-nowrap font-display text-lg tracking-tight transition-colors duration-500 sm:text-xl ${
                    scrolled ? "text-forest-900" : "text-white"
                  }`}
                >
                  Diwan <span className="text-gold-gradient">Associates</span>
                </span>
                <span
                  className={`mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.24em] transition-colors duration-500 ${
                    scrolled ? "text-forest-800/50" : "text-white/60"
                  }`}
                >
                  {site.locality}
                </span>
              </span>
            </a>

            <ul className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => {
                const isActive = active === link.href.slice(1);
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                        scrolled
                          ? isActive
                            ? "text-forest-900"
                            : "text-forest-800/60 hover:text-forest-900"
                          : isActive
                            ? "text-white"
                            : "text-white/65 hover:text-white"
                      }`}
                    >
                      {link.label}
                      {isActive ? (
                        <motion.span
                          layoutId="nav-active"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent"
                        />
                      ) : null}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-3">
              {/* Wrapper does the hiding: `hidden` on the Button itself would lose to
                  the `inline-flex` in its base classes — same property, same specificity. */}
              <div className="hidden sm:block">
                <Button
                  href={`tel:${intl(contacts[0].phone)}`}
                  variant={scrolled ? "forest" : "ghost"}
                >
                  <Phone />
                  {contacts[0].phone}
                </Button>
              </div>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className={`grid h-11 w-11 place-items-center rounded-full ring-1 transition-colors lg:hidden ${
                  scrolled
                    ? "text-forest-900 ring-forest-900/12 hover:bg-forest-900/5"
                    : "text-white ring-white/25 hover:bg-white/10"
                }`}
              >
                <span className="sr-only">Menu</span>
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                  <motion.path
                    animate={open ? { d: "M6 6 L18 18" } : { d: "M4 7 L20 7" }}
                    transition={{ duration: 0.3 }}
                    stroke="currentColor"
                    strokeWidth={1.75}
                    strokeLinecap="round"
                  />
                  <motion.path
                    animate={open ? { opacity: 0 } : { opacity: 1, d: "M4 12 L20 12" }}
                    transition={{ duration: 0.2 }}
                    stroke="currentColor"
                    strokeWidth={1.75}
                    strokeLinecap="round"
                  />
                  <motion.path
                    animate={open ? { d: "M6 18 L18 6" } : { d: "M4 17 L20 17" }}
                    transition={{ duration: 0.3 }}
                    stroke="currentColor"
                    strokeWidth={1.75}
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute inset-0 h-full w-full bg-forest-950/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col overflow-y-auto bg-forest-950 px-7 pb-8 pt-28"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold-500/12 blur-3xl"
              />

              <ul className="relative flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + i * 0.05, duration: 0.4 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-4 border-b border-white/8 py-4 font-display text-2xl text-white/85 transition-colors hover:text-gold-300"
                    >
                      <span className="font-sans text-[0.6rem] font-semibold tracking-[0.2em] text-gold-500/70">
                        0{i + 1}
                      </span>
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="relative mt-auto space-y-3 pt-10">
                {contacts.map((c) => (
                  <Button
                    key={c.phone}
                    href={`tel:${intl(c.phone)}`}
                    variant="ghost"
                    className="w-full justify-start"
                  >
                    <Phone />
                    <span className="flex flex-col items-start leading-tight">
                      <span className="text-[0.65rem] uppercase tracking-widest text-white/50">
                        {c.name}
                      </span>
                      <span>{c.phone}</span>
                    </span>
                  </Button>
                ))}
                <Button href="#contact" variant="gold" className="w-full" onClick={() => setOpen(false)}>
                  Book a Site Visit
                </Button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
