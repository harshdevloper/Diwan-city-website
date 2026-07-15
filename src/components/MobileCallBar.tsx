"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { contacts, intl, site, waLink } from "@/data/site";
import { Phone, WhatsApp } from "./ui/Icons";

/**
 * Sticky call/WhatsApp bar for phones — most enquiries here start as a call, and
 * on mobile the navbar's number is behind a menu tap. Appears once the hero is past.
 */
export function MobileCallBar() {
  const [show, setShow] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    if (typeof window !== "undefined") setShow(y > window.innerHeight * 0.85);
  });

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={{ y: 90 }}
          animate={{ y: 0 }}
          exit={{ y: 90 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-forest-950/90 backdrop-blur-xl sm:hidden"
        >
          <div className="grid grid-cols-2 gap-2.5 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <a
              href={`tel:${intl(contacts[0].phone)}`}
              className="flex items-center justify-center gap-2 rounded-full border border-white/15 py-3.5 text-sm font-semibold text-white transition-colors active:bg-white/10"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </a>
            <a
              href={waLink(contacts[0].phone, `Hello, I'd like to enquire about ${site.project}, Shamli.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-gold-300 via-gold-400 to-gold-600 py-3.5 text-sm font-semibold text-forest-950"
            >
              <WhatsApp className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
