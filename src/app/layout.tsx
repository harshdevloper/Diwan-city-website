import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Devanagari, Playfair_Display } from "next/font/google";
import { contacts, intl, site } from "@/data/site";
import { JsonLd } from "./jsonld";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-devanagari",
});

const title = `${site.company} | Approved Plots & 2 BHK Flats in Shamli`;
const description =
  "Diwan City by Diwan Associates — an approved, gated colony on the Karnal Bypass, Shamli. Residential plots from 66 to 237 gaj and ready 2 BHK flats, with a park, temple, CCTV, 24×7 security and 30–40 ft roads.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s | ${site.company}`,
  },
  description,
  applicationName: site.company,
  keywords: [
    "Diwan City Shamli",
    "Diwan Associates",
    "plots in Shamli",
    "approved plots Shamli",
    "property in Shamli",
    "Karnal Bypass Shamli",
    "2 BHK flats Shamli",
    "residential plots Uttar Pradesh",
    "gaj plot Shamli",
    "दिवान सिटी शामली",
  ],
  authors: [{ name: site.company }],
  creator: site.company,
  publisher: site.company,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.company,
    title,
    description,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${site.project} — approved plots and 2 BHK flats in ${site.locality}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "Real Estate",
  formatDetection: {
    telephone: true,
    address: true,
  },
  other: {
    "geo.region": "IN-UP",
    "geo.placename": site.locality,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f4" },
    { media: "(prefers-color-scheme: dark)", color: "#051813" },
  ],
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${playfair.variable} ${inter.variable} ${devanagari.variable}`}>
      <head>
        <link rel="preconnect" href="https://www.google.com" />
        <JsonLd />
        {/* Scroll-reveals ship as opacity:0 and are animated in by Framer Motion.
            Without JS that would leave the page blank, so force them visible. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-forest-900 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>

        {children}

        {/* Crawlable, no-JS-required contact details */}
        <div className="sr-only">
          <h2>Contact {site.company}</h2>
          <address>
            {site.address}.{" "}
            {contacts.map((c) => (
              <span key={c.phone}>
                {c.name}: <a href={`tel:${intl(c.phone)}`}>{intl(c.phone)}</a>.{" "}
              </span>
            ))}
          </address>
        </div>
      </body>
    </html>
  );
}
