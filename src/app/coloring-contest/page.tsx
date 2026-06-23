import type { Metadata } from "next";
import Image from "next/image";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import CTABanner from "@/components/CTABanner";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: `2026 Coloring Contest | ${COMPANY.name}`,
  description:
    "Download the free French Roofing coloring sheet, color it your way, and post it to win. Three grand prizes, plus every entry wins a prize. Enter from home or at our booth. Damascus, OR.",
  alternates: { canonical: `${COMPANY.url}/coloring-contest` },
  openGraph: {
    title: "French Roofing 2026 Coloring Contest",
    description:
      "Download the free coloring sheet, color it, and post it to win. Three grand prizes, plus every entry wins!",
    url: `${COMPANY.url}/coloring-contest`,
    images: [
      {
        url: "/api/og?photo=%2Fimages%2Fcoloring-contest-art.png&headline=2026%20Coloring%20Contest&gradient=light&gradientColor=blue&width=1200&height=630",
        width: 1200,
        height: 630,
        alt: "French Roofing 2026 Coloring Contest",
      },
    ],
  },
};

const steps = [
  {
    n: "1",
    title: "Download & print the sheet",
    body: "Grab the free coloring sheet below and print it at home. Black and white, so it is easy on the ink.",
  },
  {
    n: "2",
    title: "Color it your way",
    body: "Go wild. Crayons, markers, colored pencils, whatever you have. There are no wrong colors here.",
  },
  {
    n: "3",
    title: "Snap a photo",
    body: "Take a clear photo of the finished sheet. Make sure the whole drawing is in the shot.",
  },
  {
    n: "4",
    title: "Ask a grown-up to post it",
    body: "Have a grown-up post the photo public on Facebook or Instagram, tag @frenchroofing, and use #FrenchRoofingColorContest.",
  },
];

const prizes = [
  {
    badge: "Grand Prize 1",
    emoji: "🌈",
    title: "Most Creative",
    body: "Chosen by our kid judge Peyton, age 11.",
    accent: "#d85024",
  },
  {
    badge: "Grand Prize 2",
    emoji: "✏️",
    title: "Most Realistic",
    body: "Chosen by our kid judge Sawyer, age 6.",
    accent: "#3aa17e",
  },
  {
    badge: "Grand Prize 3",
    emoji: "❤️",
    title: "People's Choice",
    body: "The entry with the most likes on Facebook and Instagram combined.",
    accent: "#092e5e",
  },
];

export default function ColoringContestPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Coloring Contest", href: "/coloring-contest" },
        ]}
      />

      {/* ── Hero ── */}
      <section className="bg-[#092e5e] py-16 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#ffbd59]">
            French Roofing
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-white">
            2026 <span className="text-[#ffbd59]">Coloring Contest</span>
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Color, post, and win. Three grand prizes up for grabs, and every
            single entry wins a prize. Enter from home or at our booth, no event
            ticket needed.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/coloring-contest-sheet.pdf"
              download
              className="rounded-lg bg-[#d85024] px-8 py-4 text-lg font-semibold text-white hover:bg-[#c04520] transition-colors"
            >
              Download the Coloring Sheet
            </a>
            <a
              href="#how-to-enter"
              className="rounded-lg border-2 border-white/40 px-8 py-4 text-lg font-semibold text-white hover:bg-white/10 transition-colors"
            >
              How to Enter
            </a>
          </div>
        </div>
      </section>

      {/* ── Download / preview ── */}
      <section className="py-16 px-4 bg-white">
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <Image
              src="/images/coloring-contest-art.png"
              alt="French Roofing coloring sheet - a roofer giving a peace sign next to a truck and house"
              width={1358}
              height={1158}
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[#092e5e]">
              Free to download, free to enter
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Print the sheet at home, color it however you like, and you are
              ready to enter. The full official rules are printed right on the
              back of the sheet, so you have everything in one place.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <a
                href="/coloring-contest-sheet.pdf"
                download
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#d85024] px-6 py-3 text-base font-semibold text-white hover:bg-[#c04520] transition-colors"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Download (PDF)
              </a>
              <a
                href="/coloring-contest-sheet.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg border-2 border-[#092e5e] px-6 py-3 text-base font-semibold text-[#092e5e] hover:bg-[#092e5e]/5 transition-colors"
              >
                Preview in browser
              </a>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Black and white, prints on any home printer.
            </p>
          </div>
        </div>
      </section>

      {/* ── How to Enter ── */}
      <section id="how-to-enter" className="py-16 px-4 bg-gray-50 scroll-mt-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-[#092e5e] mb-4 text-center">
            How to Enter
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Four easy steps. The whole thing takes about as long as a good
            coloring session.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {steps.map((s) => (
              <div key={s.n} className="flex gap-4 items-start bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex-shrink-0 h-11 w-11 rounded-full bg-[#d85024] text-white flex items-center justify-center text-lg font-bold">
                  {s.n}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#092e5e] mb-1">{s.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl bg-[#092e5e] text-center px-6 py-5">
            <p className="text-lg font-bold text-white">
              Tag <span className="text-[#ffbd59]">@frenchroofing</span> + use{" "}
              <span className="text-[#ffbd59]">#FrenchRoofingColorContest</span>
            </p>
            <div className="mt-3 flex items-center justify-center gap-4 text-sm font-semibold">
              <a href={COMPANY.social.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-white">
                Facebook
              </a>
              <span className="text-gray-500">•</span>
              <a href={COMPANY.social.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-white">
                Instagram
              </a>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-500 max-w-2xl mx-auto">
            No social media? Email a clear photo to{" "}
            <a href="mailto:team@frenchroofing.com" className="font-semibold text-[#d85024]">
              team@frenchroofing.com
            </a>{" "}
            to enter the two judged categories. People's Choice requires a public
            post. Entrants under 18 must have a parent or guardian post and enter
            on their behalf.
          </p>
        </div>
      </section>

      {/* ── 3 Grand Prizes ── */}
      <section className="py-16 px-4 bg-white">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-[#092e5e] mb-12 text-center">
            3 Grand Prizes Up For Grabs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {prizes.map((p) => (
              <div
                key={p.title}
                className="relative rounded-2xl border-2 bg-white p-6 pt-8 text-center"
                style={{ borderColor: p.accent }}
              >
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide text-white whitespace-nowrap"
                  style={{ backgroundColor: p.accent }}
                >
                  {p.badge}
                </span>
                <div className="text-4xl">{p.emoji}</div>
                <h3 className="mt-3 text-xl font-bold text-[#092e5e]">{p.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-xl bg-[#ffbd59] text-center px-6 py-5">
            <p className="text-xl font-bold text-[#092e5e]">
              ⭐ Plus, every entry wins a prize! ⭐
            </p>
          </div>
        </div>
      </section>

      {/* ── Deadline ── */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d85024]">
            Mark Your Calendar
          </p>
          <p className="mt-3 text-2xl sm:text-3xl font-bold text-[#092e5e]">
            Entries due by midnight Monday, June 29
          </p>
          <p className="mt-2 text-gray-600">
            Winners announced Tuesday, June 30 on our social pages.
          </p>
        </div>
      </section>

      {/* ── Official rules ── */}
      <section className="py-16 px-4 bg-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-[#092e5e] mb-8 text-center">
            Official Rules
          </h2>
          <ul className="space-y-3 text-sm text-gray-600 leading-relaxed list-disc pl-5">
            <li>Open to all ages. One entry per person.</li>
            <li>
              Entries accepted Saturday, June 27 through midnight Monday, June 29.
              Winners announced Tuesday, June 30 on our social pages.
            </li>
            <li>
              Entrants under 18 must have a parent or guardian post and enter on
              their behalf.
            </li>
            <li>
              French Roofing employees and their immediate families may enter for
              fun but are not eligible for prizes.
            </li>
            <li>
              By entering, you allow French Roofing to repost and use the
              submitted artwork on its social channels and in marketing.
            </li>
            <li>French Roofing may disqualify incomplete or inappropriate entries.</li>
            <li>
              This contest is not sponsored, endorsed, or administered by Facebook
              or Instagram.
            </li>
          </ul>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTABanner
        headline="While You're Here, Need a Roof Checkup?"
        description="We're a family-owned, CertainTeed Certified roofing team right here in Damascus. Schedule a free roof assessment anytime."
      />
    </>
  );
}
