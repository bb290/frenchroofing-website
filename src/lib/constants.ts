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
  priority: [
    { name: "Damascus", slug: "damascus-or", state: "OR" },
    { name: "Clackamas", slug: "clackamas-or", state: "OR" },
    { name: "Happy Valley", slug: "happy-valley-or", state: "OR" },
  ],
  full: [
    "Damascus", "Gresham", "Happy Valley", "Clackamas", "Oregon City",
    "Milwaukie", "Lake Oswego", "Tualatin", "West Linn", "Sandy",
    "Estacada", "Boring", "Troutdale", "Fairview", "Wood Village",
    "Gladstone", "Johnson City", "Canby",
  ],
} as const;

export const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Financing", href: "/financing" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;
