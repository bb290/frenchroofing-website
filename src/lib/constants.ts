export const COMPANY = {
  name: "French Roofing LLC",
  phone: "971-376-8722",
  phoneTel: "tel:+19713768722",
  email: "hello@frenchroofing.com",
  address: {
    street: "16235 SE Van Zyl Dr",
    city: "Damascus",
    state: "OR",
    zip: "97089",
  },
  ccb: "203933",
  domain: "frenchroofing.com",
  url: "https://frenchroofing.com",
  tagline: "Got You Covered!",
  foundingYear: 2014,
  founder: "Sean French",
  certifications: ["CertainTeed Certified"],
  financing: "Enhancify",
  bookingUrl: "https://book.housecallpro.com/book/French-Roofing-LLC/3d9f863949114c699be738573cf0ef24?v2=true",
  social: {
    facebook: "https://www.facebook.com/FrenchRoofingLLC",
    instagram: "https://www.instagram.com/frenchroofing/",
    linkedin: "https://www.linkedin.com/company/french-roofing/",
    youtube: "https://www.youtube.com/@Frenchroofing",
    google: "https://share.google/JYDD8GxCgR1YwXii2",
  },
} as const;

export const SERVICES = [
  { name: "Roof Replacement", slug: "roof-replacement", description: "Full tear-off and replacement with premium materials" },
  { name: "Roof Repair", slug: "roof-repair", description: "Fix leaks, storm damage, and wear before it spreads" },
  { name: "Roof Cleaning & Maintenance", slug: "roof-cleaning", description: "Keep your roof clean, clear, and lasting longer" },
  { name: "Roof Inspections", slug: "roof-inspections", description: "Honest assessment of your roof's condition" },
] as const;

export const SERVICE_AREAS = {
  priority: ["damascus-or", "clackamas-or", "happy-valley-or"] as string[],
  all: [
    { name: "Damascus", slug: "damascus-or", state: "OR" },
    { name: "Gresham", slug: "gresham-or", state: "OR" },
    { name: "Happy Valley", slug: "happy-valley-or", state: "OR" },
    { name: "Clackamas", slug: "clackamas-or", state: "OR" },
    { name: "Oregon City", slug: "oregon-city-or", state: "OR" },
    { name: "Milwaukie", slug: "milwaukie-or", state: "OR" },
    { name: "Lake Oswego", slug: "lake-oswego-or", state: "OR" },
    { name: "Tualatin", slug: "tualatin-or", state: "OR" },
    { name: "West Linn", slug: "west-linn-or", state: "OR" },
    { name: "Sandy", slug: "sandy-or", state: "OR" },
    { name: "Estacada", slug: "estacada-or", state: "OR" },
    { name: "Boring", slug: "boring-or", state: "OR" },
    { name: "Troutdale", slug: "troutdale-or", state: "OR" },
    { name: "Fairview", slug: "fairview-or", state: "OR" },
    { name: "Wood Village", slug: "wood-village-or", state: "OR" },
    { name: "Gladstone", slug: "gladstone-or", state: "OR" },
    { name: "Johnson City", slug: "johnson-city-or", state: "OR" },
    { name: "Canby", slug: "canby-or", state: "OR" },
  ],
} as const;

export const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Instant Estimate", href: "/estimate" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Financing", href: "/financing" },
  { label: "Contact", href: "/contact" },
] as const;
