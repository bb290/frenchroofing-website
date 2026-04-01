import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { COMPANY, SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Contact Us | ${COMPANY.name}`,
  description:
    "Contact French Roofing LLC in Damascus, OR for a free roof assessment. Call 971-376-8722 or fill out our form. Licensed (CCB #203933), insured, and ready to help.",
  alternates: { canonical: `${COMPANY.url}/contact` },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
      />

      {/* ── Hero ── */}
      <section className="bg-[#092e5e] py-16 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            Let&apos;s <span className="text-[#ffbd59]">Talk Roofing</span>
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Whether you need a quick repair or a full replacement, we&apos;re
            here to help. Reach out and we&apos;ll get back to you fast.
          </p>
        </div>
      </section>

      {/* ── Contact Grid ── */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* ── Form ── */}
          <div>
            <h2 className="text-2xl font-bold text-[#092e5e] mb-6">
              Send Us a Message
            </h2>
            <form action="/api/contact" method="POST" className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-[#3e3d3b] mb-1"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-[#3e3d3b] focus:border-[#d85024] focus:ring-2 focus:ring-[#d85024]/20 outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#3e3d3b] mb-1"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-[#3e3d3b] focus:border-[#d85024] focus:ring-2 focus:ring-[#d85024]/20 outline-none transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-[#3e3d3b] mb-1"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-[#3e3d3b] focus:border-[#d85024] focus:ring-2 focus:ring-[#d85024]/20 outline-none transition-colors"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-[#3e3d3b] mb-1"
                >
                  Property Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-[#3e3d3b] focus:border-[#d85024] focus:ring-2 focus:ring-[#d85024]/20 outline-none transition-colors"
                  placeholder="123 Main St, Damascus, OR"
                />
              </div>
              <div>
                <label
                  htmlFor="service"
                  className="block text-sm font-medium text-[#3e3d3b] mb-1"
                >
                  Service Needed
                </label>
                <select
                  id="service"
                  name="service"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-[#3e3d3b] focus:border-[#d85024] focus:ring-2 focus:ring-[#d85024]/20 outline-none transition-colors bg-white"
                >
                  <option value="">Select a service...</option>
                  {SERVICES.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.name}
                    </option>
                  ))}
                  <option value="other">Other / Not Sure</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-[#3e3d3b] mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-[#3e3d3b] focus:border-[#d85024] focus:ring-2 focus:ring-[#d85024]/20 outline-none transition-colors resize-y"
                  placeholder="Tell us about your project or question..."
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-[#d85024] px-8 py-4 text-lg font-semibold text-white hover:bg-[#c04520] transition-colors"
              >
                Send Message
              </button>
              <p className="text-xs text-gray-500 text-center">
                We typically respond within 1 business day.
              </p>
            </form>
          </div>

          {/* ── Info Panel ── */}
          <div className="space-y-10">
            {/* NAP */}
            <div>
              <h2 className="text-2xl font-bold text-[#092e5e] mb-4">
                Get in Touch
              </h2>
              <div className="space-y-4 text-[#3e3d3b]">
                <div className="flex items-start gap-3">
                  <svg className="h-6 w-6 text-[#d85024] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold">{COMPANY.name}</p>
                    <p>{COMPANY.address.street}</p>
                    <p>
                      {COMPANY.address.city}, {COMPANY.address.state}{" "}
                      {COMPANY.address.zip}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="h-6 w-6 text-[#d85024] flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <a
                    href={COMPANY.phoneTel}
                    className="font-semibold text-[#092e5e] hover:text-[#d85024] transition-colors"
                  >
                    {COMPANY.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="h-6 w-6 text-[#d85024] flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="font-semibold text-[#092e5e] hover:text-[#d85024] transition-colors"
                  >
                    {COMPANY.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div>
              <h3 className="text-lg font-bold text-[#092e5e] mb-3">
                Business Hours
              </h3>
              <div className="space-y-2 text-[#3e3d3b]">
                <div className="flex justify-between">
                  <span>Monday &ndash; Friday</span>
                  <span className="font-medium">7:00 AM &ndash; 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday &ndash; Sunday</span>
                  <span className="font-medium text-gray-400">Closed</span>
                </div>
              </div>
            </div>

            {/* License */}
            <div className="rounded-xl bg-gray-50 p-6">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-[#092e5e]">
                  Licensed, Insured &amp; Bonded
                </span>
                <br />
                Oregon CCB #{COMPANY.ccb} &middot; CertainTeed Certified
              </p>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-bold text-[#092e5e] mb-3">
                Follow Us
              </h3>
              <div className="flex gap-4">
                <a
                  href={COMPANY.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="French Roofing on Facebook"
                  className="h-10 w-10 rounded-full bg-[#092e5e] text-white flex items-center justify-center hover:bg-[#d85024] transition-colors"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a
                  href={COMPANY.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="French Roofing on Instagram"
                  className="h-10 w-10 rounded-full bg-[#092e5e] text-white flex items-center justify-center hover:bg-[#d85024] transition-colors"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123s-.012 3.056-.06 4.122c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06s-3.056-.012-4.122-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427C2.013 15.056 2 14.716 2 12s.013-2.784.06-3.808c.049-1.064.218-1.791.465-2.427A4.902 4.902 0 013.678 3.993a4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807s.011 2.784.058 3.807c.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058s2.987-.01 4.04-.058c.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.684.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041s-.01-2.987-.058-4.041c-.045-.975-.207-1.504-.344-1.857a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
                </a>
                <a
                  href={COMPANY.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="French Roofing on YouTube"
                  className="h-10 w-10 rounded-full bg-[#092e5e] text-white flex items-center justify-center hover:bg-[#d85024] transition-colors"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a
                  href={COMPANY.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="French Roofing on LinkedIn"
                  className="h-10 w-10 rounded-full bg-[#092e5e] text-white flex items-center justify-center hover:bg-[#d85024] transition-colors"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href={COMPANY.social.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="French Roofing on Google"
                  className="h-10 w-10 rounded-full bg-[#092e5e] text-white flex items-center justify-center hover:bg-[#d85024] transition-colors"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
