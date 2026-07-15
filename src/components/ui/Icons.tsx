/**
 * Line icons for the amenity grid — one per facility listed in the brochure.
 * All are 24×24, stroke-based, and inherit `currentColor`.
 */

type IconProps = { className?: string };

const svg = (className: string) => ({
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className,
  "aria-hidden": true,
});

const Bolt = ({ className = "" }: IconProps) => (
  <svg {...svg(className)}>
    <path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5Z" />
  </svg>
);

const Temple = ({ className = "" }: IconProps) => (
  <svg {...svg(className)}>
    <path d="M12 2v3M10.5 3.5h3" />
    <path d="M12 5 7 10h10l-5-5Z" />
    <path d="M5.5 10h13v3h-13z" />
    <path d="M7 13v8M17 13v8M4 21h16" />
    <path d="M10 21v-4a2 2 0 1 1 4 0v4" />
  </svg>
);

const Bank = ({ className = "" }: IconProps) => (
  <svg {...svg(className)}>
    <path d="M3 9.5 12 4l9 5.5" />
    <path d="M4.5 9.5v9M9.5 9.5v9M14.5 9.5v9M19.5 9.5v9" />
    <path d="M2.5 18.5h19M3.5 21h17" />
  </svg>
);

const Shop = ({ className = "" }: IconProps) => (
  <svg {...svg(className)}>
    <path d="M3.5 8.5 5 4h14l1.5 4.5" />
    <path d="M3.5 8.5a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 1-2.5 2.5" />
    <path d="M4.5 11v9h15v-9" />
    <path d="M9.5 20v-5h5v5" />
  </svg>
);

const Cctv = ({ className = "" }: IconProps) => (
  <svg {...svg(className)}>
    <path d="M3 6.5 16.5 3l1.5 5.5L4.5 12 3 6.5Z" />
    <path d="M18 8.5 21 7.7" />
    <path d="M8 11.5 9 15" />
    <path d="M9 15H6a2 2 0 0 0-2 2v4" />
    <circle cx="9" cy="15" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);

const Shield = ({ className = "" }: IconProps) => (
  <svg {...svg(className)}>
    <path d="M12 2.5 4.5 5.5v6c0 4.5 3.2 8.6 7.5 10 4.3-1.4 7.5-5.5 7.5-10v-6L12 2.5Z" />
    <path d="M9 12l2 2 4-4.5" />
  </svg>
);

const Pipe = ({ className = "" }: IconProps) => (
  <svg {...svg(className)}>
    <path d="M2.5 8h6a3 3 0 0 1 3 3v2a3 3 0 0 0 3 3h6" />
    <path d="M2.5 5.5v5M21.5 13.5v5" />
    <path d="M6 5.5v5M18 13.5v5" />
  </svg>
);

const Road = ({ className = "" }: IconProps) => (
  <svg {...svg(className)}>
    <path d="M8 3 4.5 21M16 3l3.5 18" />
    <path d="M12 4v2.5M12 10v3M12 17v3" />
  </svg>
);

const Lamp = ({ className = "" }: IconProps) => (
  <svg {...svg(className)}>
    <path d="M12 21V6" />
    <path d="M12 6c0-1.7 1.6-3 3.5-3S19 4.3 19 6" />
    <path d="M16.2 6h5.6l-2 4.5h-1.6L16.2 6Z" />
    <path d="M8.5 21h7" />
  </svg>
);

const Gate = ({ className = "" }: IconProps) => (
  <svg {...svg(className)}>
    <path d="M3 21V8.5a9 9 0 0 1 18 0V21" />
    <path d="M7 21V10M12 21V7M17 21V10" />
    <path d="M3.5 14.5h17" />
    <path d="M2 21h20" />
  </svg>
);

const Wall = ({ className = "" }: IconProps) => (
  <svg {...svg(className)}>
    <path d="M2.5 5.5h19v13h-19z" />
    <path d="M2.5 10h19M2.5 14.5h19" />
    <path d="M7 5.5V10M16 5.5V10M11.5 10v4.5M7 14.5V19M16 14.5V19" />
  </svg>
);

const Home = ({ className = "" }: IconProps) => (
  <svg {...svg(className)}>
    <path d="M3.5 10.5 12 3.5l8.5 7" />
    <path d="M5.5 12v8.5h13V12" />
    <path d="M10 20.5V14h4v6.5" />
  </svg>
);

export const icons = {
  bolt: Bolt,
  temple: Temple,
  bank: Bank,
  shop: Shop,
  cctv: Cctv,
  shield: Shield,
  pipe: Pipe,
  road: Road,
  lamp: Lamp,
  gate: Gate,
  wall: Wall,
  home: Home,
} as const;

export type IconName = keyof typeof icons;

export function Icon({ name, className = "h-6 w-6" }: { name: IconName; className?: string }) {
  const C = icons[name];
  return <C className={className} />;
}

export const Phone = ({ className = "h-4 w-4" }: IconProps) => (
  <svg {...svg(className)}>
    <path d="M6.5 3.5h-2a2 2 0 0 0-2 2.2 17.5 17.5 0 0 0 15.8 15.8 2 2 0 0 0 2.2-2v-2a1.5 1.5 0 0 0-1.3-1.5l-2.6-.4a1.5 1.5 0 0 0-1.5.7l-.8 1.3a13.5 13.5 0 0 1-6.9-6.9l1.3-.8a1.5 1.5 0 0 0 .7-1.5L8.9 4.8a1.5 1.5 0 0 0-1.5-1.3Z" />
  </svg>
);

export const WhatsApp = ({ className = "h-4 w-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.82c2.16 0 4.19.84 5.72 2.37a8.05 8.05 0 0 1 2.37 5.72c0 4.46-3.63 8.09-8.09 8.09a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.06.8.82-3-.19-.31a8.05 8.05 0 0 1-1.23-4.28c0-4.46 3.63-8.08 8.09-8.08Zm-2.5 4.03c-.19 0-.5.07-.76.35-.26.29-1 .98-1 2.39s1.02 2.77 1.16 2.96c.14.19 2 3.06 4.86 4.29.68.29 1.21.47 1.62.6.68.22 1.3.19 1.79.11.55-.08 1.68-.69 1.92-1.35.24-.66.24-1.23.17-1.35-.07-.12-.26-.19-.55-.33-.29-.14-1.68-.83-1.94-.93-.26-.09-.45-.14-.64.15-.19.29-.73.92-.9 1.11-.16.19-.33.21-.62.07-.29-.14-1.2-.44-2.29-1.41-.85-.75-1.42-1.68-1.58-1.97-.17-.29-.02-.44.13-.59.13-.13.29-.34.43-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.55-.88-2.12-.23-.56-.46-.48-.64-.49h-.55Z" />
  </svg>
);

export const MapPin = ({ className = "h-4 w-4" }: IconProps) => (
  <svg {...svg(className)}>
    <path d="M12 21.5s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
    <circle cx="12" cy="10.5" r="2.6" />
  </svg>
);
