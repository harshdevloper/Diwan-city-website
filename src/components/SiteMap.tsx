"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Animated site map — the approved layout plan with traffic moving along its roads.
 *
 * The overlay is an SVG in the raster plan's own pixel space (2000 × 2794), so the
 * container's aspect ratio MUST stay `2000/2794`. With a matching ratio, `object-contain`
 * lays the image edge-to-edge and the viewBox lines up 1:1 with the drawing. Change the
 * ratio and every car drives through a plot.
 *
 * Coordinates below were traced off the drawing's road bands:
 *   entry spine  x 1145–1306 (x 1118–1285 below the gate)
 *   west 40 ft   x 349–538
 *   top road     y 46–119
 *   30 ft road   y 1278–1348
 *   25 ft roads  y 472–512 and y 880–922
 *   east chakroad x 1893–1942
 *   Goharni Bypass Road y 2654–2738, gate at y 2082
 *
 * Cars keep LEFT of each road's centre, as traffic does here — which is why the
 * northbound lane sits at x 1185 and the southbound at x 1248 on the same spine.
 */

const ROUTES = {
  /** Off the bypass (eastbound), left turn through the gate, up the spine, west along the 30 ft road. */
  arrive:
    "M 1045 2678 L 1180 2678 Q 1238 2678 1232 2618 L 1200 2380 L 1185 2095 L 1185 1370 Q 1185 1330 1140 1330 L 490 1330 Q 420 1330 415 1285 L 415 1120",
  /** Down the spine from the top road and out west onto the bypass. */
  depart:
    "M 700 68 L 1200 68 Q 1248 68 1248 115 L 1248 1360 L 1240 2090 L 1253 2400 L 1258 2640 Q 1258 2714 1210 2714 L 1045 2714",
  /** Up the western 40 ft road, then east along the top road. */
  westLoop: "M 415 1300 L 415 130 Q 415 68 465 68 L 1160 68",
  /** Spine to the lower 25 ft road, north along the chakroad, back west on the upper 25 ft road. */
  eastBlock:
    "M 1185 1180 L 1185 940 Q 1185 891 1240 891 L 1870 891 Q 1905 891 1905 850 L 1905 540 Q 1905 502 1860 502 L 1310 502",
  /** Through traffic on the bypass itself — westbound keeps south, eastbound keeps north. */
  bypassWest: "M 1520 2714 L 1035 2714",
  bypassEast: "M 1035 2678 L 1520 2678",
} as const;

/** The approach a visitor actually drives, highlighted as a nav-style route. */
const APPROACH =
  "M 1045 2678 L 1180 2678 Q 1238 2678 1232 2618 L 1200 2380 L 1190 2095 L 1200 1500 L 1215 1330";

const GATE = { x: 1201, y: 2080 };

type CarProps = {
  d: string;
  dur: number;
  begin?: number;
  body: string;
  roof?: string;
};

function Car({ d, dur, begin = 0, body, roof = "#faf8f4" }: CarProps) {
  return (
    <g opacity={0}>
      {/* drawn nose-to-+X; animateMotion rotate="auto" steers it */}
      <g>
        <ellipse cx="3" cy="5" rx="23" ry="10" fill="#0a2820" opacity="0.2" />
        <rect x="-22" y="-10" width="44" height="20" rx="7" fill={body} />
        <rect x="-9" y="-7.5" width="16" height="15" rx="4.5" fill={roof} opacity="0.85" />
        <rect x="15" y="-7.5" width="4.5" height="4" rx="1.5" fill="#fffdf2" />
        <rect x="15" y="3.5" width="4.5" height="4" rx="1.5" fill="#fffdf2" />
        <rect x="-20" y="-7" width="3.5" height="3.5" rx="1.2" fill="#ffb4a8" opacity="0.85" />
        <rect x="-20" y="3.5" width="3.5" height="3.5" rx="1.2" fill="#ffb4a8" opacity="0.85" />
      </g>
      <animateMotion path={d} dur={`${dur}s`} begin={`${begin}s`} rotate="auto" repeatCount="indefinite" />
      {/* fade in/out so the loop's restart never pops */}
      <animate
        attributeName="opacity"
        values="0;1;1;1;0"
        keyTimes="0;0.05;0.5;0.93;1"
        dur={`${dur}s`}
        begin={`${begin}s`}
        repeatCount="indefinite"
      />
    </g>
  );
}

export function SiteMap() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Server and first client render agree on "no traffic", so hydration stays clean.
  const traffic = mounted && !reduce;

  return (
    <figure className="group mx-auto mt-16 max-w-3xl overflow-hidden rounded-[1.75rem] border border-forest-900/8 bg-white p-3 shadow-[0_24px_60px_-30px_rgba(10,40,32,0.4)]">
      <div className="relative overflow-hidden rounded-2xl bg-white">
        <div className="relative aspect-[2000/2794] transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]">
          <Image
            src="/images/layout-plan.jpg"
            alt="Approved layout plan of Diwan City showing numbered plots with areas, 40 ft and 25 ft roads, the park, and the gate off Goharni Bypass Road"
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-contain"
          />

          <svg
            viewBox="0 0 2000 2794"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            {traffic && (
              <>
                {/* the approach route, flowing from the bypass to the colony */}
                <path
                  d={APPROACH}
                  fill="none"
                  stroke="#c8a44d"
                  strokeWidth={9}
                  strokeLinecap="round"
                  strokeOpacity={0.32}
                  strokeDasharray="34 28"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="62"
                    to="0"
                    dur="1.6s"
                    repeatCount="indefinite"
                  />
                </path>

                {/* gate pulse */}
                <circle cx={GATE.x} cy={GATE.y} r={40} fill="none" stroke="#c8a44d" strokeWidth={4}>
                  <animate attributeName="r" values="34;92" dur="2.8s" repeatCount="indefinite" />
                  <animate
                    attributeName="stroke-opacity"
                    values="0.75;0"
                    dur="2.8s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx={GATE.x} cy={GATE.y} r={9} fill="#c8a44d" />

                <Car d={ROUTES.arrive} dur={26} body="#c8a44d" />
                <Car d={ROUTES.depart} dur={24} begin={6} body="#0e3529" />
                <Car d={ROUTES.westLoop} dur={17} begin={2.5} body="#2b7a62" />
                <Car d={ROUTES.eastBlock} dur={19} begin={9} body="#a8863a" />
                <Car d={ROUTES.bypassEast} dur={7} begin={1} body="#0a2820" />
                <Car d={ROUTES.bypassWest} dur={8} begin={4.5} body="#4a9880" />
                <Car d={ROUTES.bypassWest} dur={8} begin={12} body="#144a3a" />
              </>
            )}
          </svg>
        </div>

        <span className="glass-light pointer-events-none absolute bottom-4 left-4 rounded-xl px-3.5 py-2">
          <span className="flex items-center gap-2 text-[0.7rem] font-semibold text-forest-900">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-500/70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold-600" />
            </span>
            Approach from Goharni Bypass Road
          </span>
        </span>
      </div>

      <figcaption className="flex flex-wrap items-center justify-between gap-3 px-3 pb-1 pt-4">
        <span className="text-sm font-medium text-forest-900">Approved Layout Plan</span>
        <span className="text-xs text-forest-800/50">
          Plot numbers and areas in gaj · not to scale on screen
        </span>
      </figcaption>
    </figure>
  );
}
