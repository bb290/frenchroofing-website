import { COMPANY, SERVICES, SERVICE_AREAS } from "@/lib/constants";

export function LocalBusinessJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    "@id": `${COMPANY.url}/#organization`,
    name: COMPANY.name,
    legalName: COMPANY.legalName,
    url: COMPANY.url,
    telephone: COMPANY.phone,
    email: COMPANY.email,
    description:
      "French Roofing provides expert roof replacement, repair, cleaning, and inspection services in Damascus, Clackamas, Happy Valley, and the surrounding area. Family-owned, licensed, and CertainTeed Certified.",
    foundingDate: `${COMPANY.foundingYear}`,
    founder: {
      "@type": "Person",
      name: COMPANY.founder,
    },
    // Street address intentionally omitted (operator privacy decision,
    // 2026-06). City/state/zip + areaServed is the service-area-business
    // pattern; do not re-add streetAddress.
    address: {
      "@type": "PostalAddress",
      addressLocality: COMPANY.address.city,
      addressRegion: COMPANY.address.state,
      postalCode: COMPANY.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 45.4168,
      longitude: -122.4587,
    },
    areaServed: SERVICE_AREAS.all.map((area) => ({
      "@type": "City",
      name: `${area.name}, ${area.state}`,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Roofing Services",
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          description: s.description,
        },
      })),
    },
    image: `${COMPANY.url}/images/logo.png`,
    logo: `${COMPANY.url}/images/logo.png`,
    sameAs: [
      COMPANY.social.facebook,
      COMPANY.social.instagram,
      COMPANY.social.linkedin,
      COMPANY.social.youtube,
    ],
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Credit Card",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "18:00",
    },
    // Rating + reviews sourced from the GBP feed via Local Marketing Manager
    // (2026-08-30). Update ratingValue/reviewCount when GBP numbers move.
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.7",
      reviewCount: 30,
      bestRating: 5,
      worstRating: 1,
    },
    review: [
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Eric Knaub" },
        reviewBody:
          "Reroofing your house is not what everyone looks forward to however when you do have to have it done it helps to have a 5 star company do the work. I was in contact with four company's and Sean was the only one that that cared enough to follow up on his bid. His work, communication willingness to listen and answer all my questions is STELLAR. Witch is why I hired him. A lot of roofing company's treat you like just another job just another number but not French Roofing. I own my own 5 star company so I know what 5 star service looks like and French Roofing is no exception.",
        reviewRating: { "@type": "Rating", ratingValue: 5 },
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Bud Simons" },
        reviewBody:
          "The owner Sean goes above and beyond . He has taken care of our roofing needs  . I won’t use anyone else. Very professional and fair",
        reviewRating: { "@type": "Rating", ratingValue: 5 },
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "keleko68" },
        reviewBody:
          "I had French Roofing come out to fix a small roof leak that was coming through an air vent in my mobile home. Sean came out right away and assessed it. He even helped me unclog a gutter drain spout. Brian from his team came out and replaced the faulty vent. All is good and the problem has gone away! They are good people and very experienced. Sean is a great guy and is truly passionate about his work. Their products have a strong warrantee that stays with the home owner. Highly recommended!",
        reviewRating: { "@type": "Rating", ratingValue: 5 },
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Jamie Terry Massey" },
        reviewBody:
          "Thank you Sean for your wonderful team that replaced our leaking skylight, and other repairs made on our home. Very affordable and relief of worries that our roof is secure over our heads. I highly recommend them to check out your roof. Very nice company to work with.",
        reviewRating: { "@type": "Rating", ratingValue: 5 },
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Casey Nack" },
        reviewBody:
          "Sean is the man. You will not find a more professional, honest and dedicated roofer than you will at French Roofing. It is clear Sean cares about his community, dedicated to excellence.",
        reviewRating: { "@type": "Rating", ratingValue: 5 },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${COMPANY.url}${item.href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceJsonLd({
  serviceName,
  description,
  href,
  cityName,
}: {
  serviceName: string;
  description: string;
  href: string;
  cityName?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: serviceName,
    name: cityName ? `${serviceName} in ${cityName}, OR` : serviceName,
    description,
    url: `${COMPANY.url}${href}`,
    provider: {
      "@id": `${COMPANY.url}/#organization`,
    },
    areaServed: cityName
      ? { "@type": "City", name: `${cityName}, OR` }
      : SERVICE_AREAS.all.map((area) => ({
          "@type": "City",
          name: `${area.name}, ${area.state}`,
        })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function HowToJsonLd({
  name,
  description,
  steps,
}: {
  name: string;
  description: string;
  steps: { title: string; description: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.title,
      text: step.description,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleJsonLd({
  title,
  description,
  href,
  datePublished,
}: {
  title: string;
  description: string;
  href: string;
  datePublished: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${COMPANY.url}${href}`,
    datePublished,
    dateModified: datePublished,
    author: {
      "@type": "Organization",
      name: COMPANY.name,
      url: COMPANY.url,
    },
    publisher: {
      "@type": "Organization",
      name: COMPANY.name,
      logo: {
        "@type": "ImageObject",
        url: `${COMPANY.url}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${COMPANY.url}${href}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQJsonLd({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
