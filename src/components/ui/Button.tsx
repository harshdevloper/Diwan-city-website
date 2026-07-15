import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "gold" | "forest" | "ghost" | "outline";
type Size = "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2.5 rounded-full font-semibold tracking-wide " +
  "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform " +
  "hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  gold:
    "bg-gradient-to-br from-gold-300 via-gold-400 to-gold-600 text-forest-950 " +
    "shadow-[0_10px_30px_-8px_rgba(200,164,77,0.6)] hover:shadow-[0_16px_40px_-8px_rgba(200,164,77,0.75)]",
  forest:
    "bg-forest-800 text-white shadow-[0_10px_30px_-10px_rgba(10,40,32,0.7)] " +
    "hover:bg-forest-700 hover:shadow-[0_16px_40px_-10px_rgba(10,40,32,0.8)]",
  ghost:
    "glass-dark text-white hover:border-gold-300/45 hover:bg-forest-900/55",
  outline:
    "border border-forest-800/25 bg-transparent text-forest-900 hover:border-gold-500/70 hover:bg-white/70",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-sm sm:text-base",
};

type Props = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
} & ComponentPropsWithoutRef<"a">;

export function Button({ variant = "gold", size = "md", className = "", children, ...props }: Props) {
  return (
    <a className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </a>
  );
}

export function ButtonEl({
  variant = "gold",
  size = "md",
  className = "",
  children,
  ...props
}: {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
} & ComponentPropsWithoutRef<"button">) {
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 ${className}`}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
