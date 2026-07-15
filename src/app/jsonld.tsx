import { amenities, contacts, faqs, intl, plotSizes, site } from "@/data/site";

/**
 * Structured data for Google. Kept in sync with src/data/site.ts so the markup
 * can never drift from what's rendered on the page.
 *
 * Note: `geo` coordinates are intentionally omitted — the brochure gives a
 * description, not a lat/long, and inventing one would put the pin in the wrong
 * place. Add `geo` here once the real coordinates are known.
 */
export function JsonLd() {
  const graph = [
    {
      "@type": "RealEstateAgent",
      "@id": `${site.url}/#organization`,
      name: site.company,
      url: site.url,
      image: `${site.url}/images/og-image.jpg`,
      logo: `${site.url}/images/logo.png`,
      description: `${site.company} develops ${site.project}, an approved gated residential colony on the Karnal Bypass in ${site.locality}, ${site.region}.`,
      telephone: contacts.map((c) => intl(c.phone)),
      areaServed: {
        "@type": "AdministrativeArea",
        name: `${site.locality}, ${site.region}, India`,
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Karnal Bypass, towards Saharanpur Road from Goharni Chauraha",
        addressLocality: site.locality,
        addressRegion: site.region,
        addressCountry: site.country,
      },
      employee: contacts.map((c) => ({
        "@type": "Person",
        name: c.name,
        telephone: intl(c.phone),
        jobTitle: "Sales Contact",
      })),
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: `${site.company} — ${site.project}`,
      inLanguage: "en-IN",
      publisher: { "@id": `${site.url}/#organization` },
    },
    {
      "@type": "ApartmentComplex",
      "@id": `${site.url}/#project`,
      name: site.project,
      alternateName: site.projectHindi,
      url: `${site.url}/#projects`,
      description:
        "An approved, gated residential colony offering plots from 66 to 237 gaj and 2 BHK flats, with a park, temple, market shops, CCTV, 24×7 security, sewer lines, street lighting and 30–40 ft wide roads.",
      image: [
        `${site.url}/images/hero-villa.jpg`,
        `${site.url}/images/gate-entrance.jpg`,
        `${site.url}/images/construction-progress.jpg`,
        `${site.url}/images/layout-plan.jpg`,
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Karnal Bypass, towards Saharanpur Road from Goharni Chauraha",
        addressLocality: site.locality,
        addressRegion: site.region,
        addressCountry: site.country,
      },
      amenityFeature: amenities.map((a) => ({
        "@type": "LocationFeatureSpecification",
        name: a.title,
        value: true,
      })),
      numberOfAccommodationUnits: {
        "@type": "QuantitativeValue",
        value: plotSizes.reduce((sum, p) => sum + p.count, 0),
      },
      provider: { "@id": `${site.url}/#organization` },
    },
    {
      "@type": "FAQPage",
      "@id": `${site.url}/#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  const json = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      // Serialised server-side from typed local data; no user input reaches this.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json).replace(/</g, "\\u003c") }}
    />
  );
}
