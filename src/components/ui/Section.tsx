import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function Section({
  id,
  children,
  className = "",
  tone = "light",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "light" | "sand" | "dark";
}) {
  const tones = {
    light: "bg-ivory text-forest-900",
    sand: "bg-sand text-forest-900",
    dark: "bg-forest-950 text-white",
  };

  return (
    <section
      id={id}
      className={`relative scroll-mt-24 overflow-hidden py-20 sm:py-28 lg:py-32 ${tones[tone]} ${className}`}
    >
      {children}
    </section>
  );
}

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>
  );
}

export function Eyebrow({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.28em] ${
        tone === "dark" ? "text-gold-300" : "text-gold-600"
      }`}
    >
      <span
        aria-hidden
        className={`h-px w-8 ${tone === "dark" ? "bg-gold-300/60" : "bg-gold-500/60"}`}
      />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  body,
  tone = "light",
  align = "center",
}: {
  eyebrow: string;
  title: string;
  /** Rendered in gold italic display type, directly after the title. */
  accent?: string;
  body?: string;
  tone?: "light" | "dark";
  align?: "center" | "left";
}) {
  const dark = tone === "dark";

  return (
    <Reveal className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>

      <h2
        className={`mt-5 font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.4rem] ${
          dark ? "text-white" : "text-forest-900"
        }`}
      >
        {title}
        {accent ? (
          <>
            {" "}
            <em className="text-gold-gradient font-normal italic">{accent}</em>
          </>
        ) : null}
      </h2>

      {body ? (
        <p
          className={`mt-6 text-base leading-relaxed sm:text-lg ${
            dark ? "text-forest-100/75" : "text-forest-800/70"
          }`}
        >
          {body}
        </p>
      ) : null}
    </Reveal>
  );
}
