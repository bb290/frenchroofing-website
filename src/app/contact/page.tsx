import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import CTABanner from "@/components/CTABanner";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Contact Us | ${COMPANY.name}`,
  description:
    "Contact French Roofing in Damascus, OR. Text, email, or book online. Licensed (CCB #203933), insured, and ready to help.",
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
            here to help. Reach out however works best for you.
          </p>
        </div>
      </section>

      {/* ── Contact Options ── */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {/* Book Online */}
            <a
              href={COMPANY.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border-2 border-[#d85024] p-8 text-center hover:bg-[#d85024]/5 transition-colors"
            >
              <div className="h-14 w-14 mx-auto rounded-full bg-[#d85024]/10 flex items-center justify-center mb-4 group-hover:bg-[#d85024]/20 transition-colors">
                <svg className="h-7 w-7 text-[#d85024]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#092e5e] mb-2">Book Online</h3>
              <p className="text-sm text-gray-600">
                Schedule a free roof assessment through our booking portal. Pick a time that works for you.
              </p>
              <span className="mt-4 inline-flex text-sm font-semibold text-[#d85024]">
                Book now &rarr;
              </span>
            </a>

            {/* Text or Call */}
            <a
              href={`sms:${COMPANY.phone.replace(/-/g, "")}`}
              className="group rounded-2xl border-2 border-gray-200 p-8 text-center hover:border-[#d85024] transition-colors"
            >
              <div className="h-14 w-14 mx-auto rounded-full bg-[#092e5e]/5 flex items-center justify-center mb-4">
                <svg className="h-7 w-7 text-[#092e5e]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#092e5e] mb-2">Text Us</h3>
              <p className="text-sm text-gray-600">
                Send us a text anytime. We&apos;ll get back to you quickly.
              </p>
              <span className="mt-4 inline-flex text-lg font-semibold text-[#092e5e]">
                {COMPANY.phone}
              </span>
            </a>

            {/* Email */}
            <a
              href={`mailto:${COMPANY.email}`}
              className="group rounded-2xl border-2 border-gray-200 p-8 text-center hover:border-[#d85024] transition-colors"
            >
              <div className="h-14 w-14 mx-auto rounded-full bg-[#092e5e]/5 flex items-center justify-center mb-4">
                <svg className="h-7 w-7 text-[#092e5e]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#092e5e] mb-2">Email Us</h3>
              <p className="text-sm text-gray-600">
                Send us the details and we&apos;ll respond within 1 business day.
              </p>
              <span className="mt-4 inline-flex text-sm font-semibold text-[#d85024]">
                {COMPANY.email}
              </span>
            </a>
          </div>

          {/* ── Info Section ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* NAP + Hours */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-[#092e5e] mb-4">
                  Find Us
                </h2>
                <div className="space-y-2 text-[#3e3d3b]">
                  <p className="font-semibold">{COMPANY.name}</p>
                  <p>{COMPANY.address.street}</p>
                  <p>
                    {COMPANY.address.city}, {COMPANY.address.state}{" "}
                    {COMPANY.address.zip}
                  </p>
                </div>
              </div>
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
              <div className="rounded-xl bg-gray-50 p-6">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-[#092e5e]">
                    Licensed, Insured &amp; Bonded
                  </span>
                  <br />
                  Oregon CCB #{COMPANY.ccb} &middot; CertainTeed Certified
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-2xl font-bold text-[#092e5e] mb-4">
                Follow Us
              </h3>
              <p className="text-gray-600 mb-6">
                See our latest projects, tips, and behind-the-scenes content.
              </p>
              <div className="space-y-3">
                {[
                  { name: "Facebook", href: COMPANY.social.facebook, icon: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" },
                  { name: "Instagram", href: COMPANY.social.instagram, icon: "M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123s-.012 3.056-.06 4.122c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06s-3.056-.012-4.122-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427C2.013 15.056 2 14.716 2 12s.013-2.784.06-3.808c.049-1.064.218-1.791.465-2.427A4.902 4.902 0 013.678 3.993a4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807s.011 2.784.058 3.807c.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058s2.987-.01 4.04-.058c.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.684.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041s-.01-2.987-.058-4.041c-.045-.975-.207-1.504-.344-1.857a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" },
                  { name: "YouTube", href: COMPANY.social.youtube, icon: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
                  { name: "LinkedIn", href: COMPANY.social.linkedin, icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
                  { name: "Google", href: COMPANY.social.google, icon: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1zM12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23zM5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62zM12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 hover:border-[#d85024] transition-colors"
                  >
                    <div className="h-10 w-10 rounded-full bg-[#092e5e] text-white flex items-center justify-center flex-shrink-0">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d={social.icon} />
                      </svg>
                    </div>
                    <span className="font-medium text-[#092e5e]">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTABanner dark />
    </>
  );
}
