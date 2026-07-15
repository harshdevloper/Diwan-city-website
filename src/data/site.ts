/**
 * Single source of truth for site content.
 *
 * Everything here is transcribed from the Diwan City brochure unless marked
 * PLACEHOLDER. Search this file for "PLACEHOLDER" before going live.
 */

export const site = {
  company: "Diwan Associates",
  project: "Diwan City",
  projectHindi: "दिवान सिटी",
  tagline: "Approved plots & 2 BHK flats in Shamli",
  url: "https://diwanassociates.in", // PLACEHOLDER: replace with the real domain (also used for canonical + sitemap)
  locality: "Shamli",
  region: "Uttar Pradesh",
  country: "IN",
  address: "Karnal Bypass, towards Saharanpur Road from Goharni Chauraha, Shamli, Uttar Pradesh",
  addressHindi: "गोहरनी चौराहा से सहारनपुर रोड़ की तरफ करनाल बाईपास, शामली",
} as const;

export const contacts = [
  { name: "Vikesh Sharma", nameHindi: "विकेश शर्मा", phone: "9917485839" },
  { name: "Sikandar Singh", nameHindi: "सिकंदर सिंह", phone: "8743927179" },
] as const;

/** E.164 for tel: / wa.me links. India country code. */
export const intl = (phone: string) => `+91${phone}`;
export const waLink = (phone: string, message: string) =>
  `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`;

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Amenities", href: "#amenities" },
  { label: "Gallery", href: "#gallery" },
  { label: "Location", href: "#location" },
  { label: "Contact", href: "#contact" },
] as const;

/**
 * Plot sizes read off the approved layout plan (brochure page 2).
 * Figures on the plan are in gaj (square yards); 1 gaj = 9 sq ft.
 * `count` is how many plots on the plan carry that area.
 */
export const plotSizes = [
  {
    gaj: "66 – 70",
    sqft: 600,
    count: 8,
    label: "Compact",
    note: "The eight-plot strip along the eastern approach — the entry-level footprint.",
  },
  {
    gaj: "110 – 116",
    sqft: 1010,
    count: 10,
    label: "Front Row",
    note: "The southern rows facing the 30 ft road, closest to the main gate.",
  },
  {
    gaj: "120",
    sqft: 1080,
    count: 6,
    label: "Standard",
    note: "Regular rectangular plots on the 25 ft internal roads.",
  },
  {
    gaj: "126",
    sqft: 1134,
    count: 11,
    label: "Standard Plus",
    note: "The most common size on the plan — a balanced 21 ft frontage.",
  },
  {
    gaj: "132 – 143",
    sqft: 1240,
    count: 5,
    label: "East End",
    note: "Irregular plots closing each eastern row — {62}, {63}, {72}, {73} and {82}.",
  },
  {
    gaj: "146 – 150",
    sqft: 1330,
    count: 45,
    label: "Premium",
    note: "The core of the colony — the largest band by far, lining the 40 ft roads.",
  },
  {
    gaj: "170 – 193",
    sqft: 1600,
    count: 7,
    label: "Wide Frontage",
    note: "End-of-row plots with a 55–56 ft frontage.",
  },
  {
    gaj: "230 – 237",
    sqft: 2100,
    count: 2,
    label: "Corner Estate",
    note: "The two largest corner plots, opening onto two roads.",
  },
] as const;

/** The 12 facilities listed on brochure page 4 (कॉलोनी की सुविधाऐं). */
export const amenities = [
  { title: "Electricity & Water", hindi: "बिजली पानी की सुविधा", icon: "bolt" },
  { title: "Park & Grand Temple", hindi: "पार्क व भव्य मंदिर की सुविधा", icon: "temple" },
  { title: "Bank Loan Assistance", hindi: "प्लाट खरीदने के लिए बैंक से लोन", icon: "bank" },
  { title: "Market Shops", hindi: "मार्किट के लिए दुकानों की सुविधा", icon: "shop" },
  { title: "CCTV Surveillance", hindi: "CCTV की सुविधा", icon: "cctv" },
  { title: "24×7 Security Guard", hindi: "24 घण्टे सिक्योरिटी गार्ड", icon: "shield" },
  { title: "Sewer Pipeline", hindi: "सीवर पाइप लाइन की सुविधा", icon: "pipe" },
  { title: "30–40 ft Wide Roads", hindi: "40 से 30 फीट चौड़ी सड़कों की सुविधा", icon: "road" },
  { title: "Street Lighting", hindi: "स्ट्रीट लाईट की सुविधा", icon: "lamp" },
  { title: "Single Gate Entry", hindi: "वन गेट एंट्री की सुविधा", icon: "gate" },
  { title: "Boundary Wall All Around", hindi: "चारो तरफ से बाउंड्री वॉल", icon: "wall" },
  { title: "2 BHK Flats", hindi: "2 BHK फ्लेट की सुविधा", icon: "home" },
] as const;

/** 2 BHK unit schedule, from the floor plan on brochure page 3. */
export const floorPlan = {
  width: "24 ft",
  depth: "25 ft",
  rooms: [
    { name: "Bedroom 1", size: "11'0\" × 11'7\"" },
    { name: "Bedroom 2", size: "11'0\" × 11'7\"" },
    { name: "Lobby", size: "7'0\" × 18'1\"" },
    { name: "Kitchen", size: "9'0\" × 4'6\"" },
    { name: "Toilet", size: "7'0\" × 5'0\"" },
    { name: "Balcony", size: "3'6\" × 19'6\"" },
  ],
} as const;

export const gallery = [
  {
    src: "/images/hero-villa.jpg",
    alt: "Architectural render of a modern villa with wooden louvre screens and a landscaped forecourt",
    caption: "Villa Elevation",
    sub: "Design render",
    span: "wide",
  },
  {
    src: "/images/construction-progress.jpg",
    alt: "A completed row of three-storey Diwan City houses with glass balconies, photographed on site",
    caption: "Built & Standing",
    sub: "Site photograph",
    span: "wide",
  },
  {
    src: "/images/gate-entrance.jpg",
    alt: "Render of the Diwan City arched entrance gate with palm trees and a security cabin",
    caption: "The Grand Entrance",
    sub: "Single-gate entry",
    span: "tall",
  },
  {
    src: "/images/interior-bedroom-1.jpg",
    alt: "Bedroom interior with a wood-panelled feature wall, pendant lights and floor-to-ceiling curtains",
    caption: "Master Bedroom",
    sub: "Interior render",
    span: "tall",
  },
  {
    src: "/images/interior-bedroom-2.jpg",
    alt: "Second bedroom interior with a sculpted pendant light and an upholstered headboard",
    caption: "Second Bedroom",
    sub: "Interior render",
    span: "tall",
  },
  {
    src: "/images/interior-kitchen.jpg",
    alt: "Compact fitted kitchen with white cabinetry and a window over the counter",
    caption: "Fitted Kitchen",
    sub: "Interior render",
    span: "tall",
  },
  {
    src: "/images/interior-toilet.jpg",
    alt: "Bathroom with a vanity, mirror and framed art",
    caption: "Bathroom",
    sub: "Interior render",
    span: "small",
  },
  {
    src: "/images/interior-balcony.jpg",
    alt: "Balcony styled with lounge chairs, a side table and potted plants",
    caption: "The Balcony",
    sub: "19'6\" of open air",
    span: "small",
  },
  {
    src: "/images/floor-plan.jpg",
    alt: "2 BHK floor plan showing two 24 ft × 25 ft mirrored units with bedrooms, lobby, kitchen, toilet and balcony",
    caption: "2 BHK Floor Plan",
    sub: "24 × 25 ft",
    span: "wide",
  },
  {
    src: "/images/layout-plan.jpg",
    alt: "Approved layout plan of Diwan City showing numbered plots, 40 ft and 25 ft roads, parks and the gate",
    caption: "Approved Layout Plan",
    sub: "86 plots + park",
    span: "wide",
  },
] as const;

export const whyChooseUs = [
  {
    title: "Approved Layout",
    body: "Diwan City is sold against a stamped, approved layout plan — every plot number, area and road width on this site is read straight off it.",
    stat: "Approved",
  },
  {
    title: "Already Built, Not Just Drawn",
    body: "The three-storey rows are standing on site today. You are not buying from a render alone — come and walk the road.",
    stat: "Ready",
  },
  {
    title: "Bank Loan Assistance",
    body: "We help arrange finance from banks for your plot purchase, so the payment doesn't have to land in one go.",
    stat: "Finance",
  },
  {
    title: "A Gated Address",
    body: "One gate in, boundary wall the whole way around, CCTV on the common areas and a guard on duty around the clock.",
    stat: "24×7",
  },
] as const;

/**
 * PLACEHOLDER — sample testimonials written to demonstrate the section.
 * These are NOT real customers. Replace every entry with genuine, consented
 * quotes (or delete the section) before this site goes live.
 */
export const testimonials = [
  {
    quote:
      "We had looked at four colonies on the bypass before this one. What settled it was being able to stand on a finished road and see the houses already up.",
    name: "Sample Name",
    role: "Plot owner — PLACEHOLDER",
  },
  {
    quote:
      "The paperwork was explained to us plainly, including what we would have to pay ourselves at registry. No surprises later.",
    name: "Sample Name",
    role: "Plot owner — PLACEHOLDER",
  },
  {
    quote:
      "The wide road in front of our plot is what my father kept coming back to. Forty feet means a truck can turn without a fuss.",
    name: "Sample Name",
    role: "Plot owner — PLACEHOLDER",
  },
] as const;

/** Answered from the brochure. The last two are marked where they go beyond it. */
export const faqs = [
  {
    q: "Where exactly is Diwan City?",
    a: "On the Karnal Bypass in Shamli, Uttar Pradesh — head from Goharni Chauraha towards Saharanpur Road. The approved layout plan shows the colony fronting the Goharni Bypass Road, with a single gated entry off a 40 ft approach road.",
  },
  {
    q: "Is the layout approved?",
    a: "Yes. Diwan City is offered against an approved layout plan, and the plot numbers, areas and road widths published on this site are taken directly from it. Ask us to see the approval papers when you visit — we'll show you the originals.",
  },
  {
    q: "What plot sizes are available?",
    a: "The layout plan runs from roughly 66 gaj (about 600 sq ft) up to two corner plots of about 230–237 gaj (roughly 2,100 sq ft). The bulk of the colony sits in the 126–150 gaj band. Availability changes, so please call to confirm what is open right now.",
  },
  {
    q: "What does a plot cost?",
    a: "Rates aren't published here because they move with size, position and availability — a corner plot on a 40 ft road doesn't price like an internal one. Call Vikesh Sharma or Sikandar Singh and you'll get the current rate for the specific plot you're asking about.",
  },
  {
    q: "Are the registry and stamp charges included?",
    a: "No. As stated on the brochure, any expense incurred on the बैनामा (sale deed / registry) is to be borne by the buyer, over and above the plot cost. We'll walk you through what to expect before you commit.",
  },
  {
    q: "Can I get a bank loan?",
    a: "Yes — bank loan assistance for plot purchase is one of the facilities offered at Diwan City. We can point you to the banks we've worked with, though the sanction itself is always the bank's decision, based on your own eligibility.",
  },
  {
    q: "Are flats available as well as plots?",
    a: "Yes. Alongside the plots, Diwan City offers 2 BHK flats — a 24 ft × 25 ft unit with two bedrooms of 11'0\" × 11'7\", a lobby, kitchen, toilet and a 19'6\" balcony. The full floor plan is in the gallery above.",
  },
  {
    q: "Can I visit the site?",
    a: "Please do — it's the whole point. The built rows are standing and the roads are laid, so there's something real to look at. Call either number to fix a time and someone will meet you at the gate.",
  },
] as const;
