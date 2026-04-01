import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy & Communication Policy",
  description:
    "Privacy policy, communication preferences, and SMS/texting compliance for French Roofing LLC in Damascus, OR.",
};

export default function Privacy() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Privacy & Communication", href: "/privacy" },
        ]}
      />

      <article className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#092e5e] mb-2">
          Privacy &amp; Communication Policy
        </h1>
        <p className="text-sm text-gray-500 mb-10">
          Last updated: April 2026
        </p>

        {/* ── Intro ── */}
        <p className="text-gray-600 mb-8">
          French Roofing LLC (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
          &ldquo;our&rdquo;) is committed to protecting your privacy and
          communicating with you in a respectful, transparent way. This policy
          explains how we collect, use, and protect your personal information,
          and outlines our communication practices including phone calls and
          text messaging.
        </p>

        {/* ── Information We Collect ── */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-[#092e5e] mb-4">
            Information We Collect
          </h2>
          <p className="text-gray-600 mb-3">
            We may collect the following information when you contact us, request
            a quote, schedule a service, or use our website:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>
              <strong>Contact information:</strong> name, phone number, email
              address, and property address
            </li>
            <li>
              <strong>Service information:</strong> details about your roofing
              needs, property type, and service history
            </li>
            <li>
              <strong>Communication records:</strong> records of phone calls,
              text messages, and emails exchanged between you and our team
            </li>
            <li>
              <strong>Website data:</strong> IP address, browser type, pages
              visited, and other standard analytics data collected through
              cookies or similar technologies
            </li>
          </ul>
        </section>

        {/* ── How We Use Your Information ── */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-[#092e5e] mb-4">
            How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>To provide roofing estimates, schedule services, and complete work you&apos;ve requested</li>
            <li>To communicate with you about your project, including appointment reminders and status updates</li>
            <li>To send follow-up communications such as satisfaction surveys or maintenance reminders</li>
            <li>To process payments and financing applications (through our partner Enhancify)</li>
            <li>To improve our services and website experience</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        {/* ── Phone Communication ── */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-[#092e5e] mb-4">
            Phone Communication Policy
          </h2>
          <p className="text-gray-600 mb-3">
            When you provide your phone number to French Roofing LLC, we may use
            it to:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Return your call or respond to your inquiry</li>
            <li>Confirm or reschedule appointments</li>
            <li>Provide project updates and status notifications</li>
            <li>Follow up after service completion</li>
          </ul>
          <p className="text-gray-600 mt-3">
            We do not use auto-dialers or robocalls. All phone communication
            comes directly from our team. If you prefer not to receive phone
            calls, please let us know and we will communicate via your preferred
            method.
          </p>
        </section>

        {/* ── SMS / Text Messaging ── */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-[#092e5e] mb-4">
            SMS / Text Messaging Policy
          </h2>
          <div className="bg-gray-50 rounded-xl p-6 mb-4">
            <h3 className="font-semibold text-[#092e5e] mb-2">
              Consent &amp; Opt-In
            </h3>
            <p className="text-gray-600 text-sm">
              By providing your mobile phone number and requesting service from
              French Roofing LLC, you consent to receive text messages related to
              your roofing project. This may include appointment confirmations,
              scheduling updates, project status notifications, and follow-up
              messages. You may also opt in to receive text messages through our
              website contact form, by texting us directly, or by verbally
              consenting during a phone call.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mb-4">
            <h3 className="font-semibold text-[#092e5e] mb-2">
              Message Types &amp; Frequency
            </h3>
            <p className="text-gray-600 text-sm">
              Messages may include: appointment reminders, scheduling
              confirmations, project updates, estimate follow-ups, and
              satisfaction check-ins. Message frequency varies based on your
              project activity. During active projects, you may receive multiple
              messages per week. Outside of active projects, messages are
              infrequent and service-related only.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mb-4">
            <h3 className="font-semibold text-[#092e5e] mb-2">
              Opt-Out Instructions
            </h3>
            <p className="text-gray-600 text-sm">
              You can opt out of text messages at any time by replying{" "}
              <strong>STOP</strong> to any message from us. You may also call us
              at {COMPANY.phone} or email {COMPANY.email} to request removal
              from text communications. After opting out, you will receive one
              final confirmation message. Opting out of texts does not affect
              your ability to receive services from French Roofing LLC.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mb-4">
            <h3 className="font-semibold text-[#092e5e] mb-2">
              Help &amp; Support
            </h3>
            <p className="text-gray-600 text-sm">
              Reply <strong>HELP</strong> to any text message for assistance, or
              contact us directly at {COMPANY.phone} or {COMPANY.email}.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-[#092e5e] mb-2">
              Costs &amp; Carrier Liability
            </h3>
            <p className="text-gray-600 text-sm">
              Message and data rates may apply depending on your mobile carrier
              and plan. French Roofing LLC is not responsible for any charges
              from your carrier related to receiving text messages. We are not
              liable for delayed or undelivered messages due to carrier issues.
            </p>
          </div>
        </section>

        {/* ── Data Sharing ── */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-[#092e5e] mb-4">
            Information Sharing &amp; Third Parties
          </h2>
          <p className="text-gray-600 mb-3">
            We do not sell, rent, or trade your personal information to third
            parties. We may share limited information with:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>
              <strong>Service platforms:</strong> Housecall Pro (our scheduling
              and invoicing platform) to manage your project and communications
            </li>
            <li>
              <strong>Financing partner:</strong> Enhancify, only when you
              choose to apply for financing — subject to their own privacy
              policy
            </li>
            <li>
              <strong>Material suppliers and subcontractors:</strong> only the
              minimum information necessary to complete your roofing project
            </li>
            <li>
              <strong>Legal compliance:</strong> if required by law, court order,
              or government regulation
            </li>
          </ul>
          <p className="text-gray-600 mt-3">
            We do not share your phone number or personal information with
            marketing companies, data brokers, or any unrelated third parties.
          </p>
        </section>

        {/* ── Data Security ── */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-[#092e5e] mb-4">
            Data Security
          </h2>
          <p className="text-gray-600">
            We take reasonable measures to protect your personal information from
            unauthorized access, alteration, disclosure, or destruction. Customer
            data is stored in secure, industry-standard platforms (Housecall Pro)
            with appropriate access controls. However, no method of electronic
            storage or transmission is 100% secure, and we cannot guarantee
            absolute security.
          </p>
        </section>

        {/* ── Data Retention ── */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-[#092e5e] mb-4">
            Data Retention
          </h2>
          <p className="text-gray-600">
            We retain your personal information for as long as necessary to
            provide our services, maintain warranty records, and comply with
            legal obligations. If you request deletion of your data, we will
            remove it from our active systems within a reasonable timeframe,
            except where retention is required by law or for legitimate business
            purposes (such as warranty documentation).
          </p>
        </section>

        {/* ── Your Rights ── */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-[#092e5e] mb-4">
            Your Rights
          </h2>
          <p className="text-gray-600 mb-3">You have the right to:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Request access to the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your personal information (subject to legal retention requirements)</li>
            <li>Opt out of text messages at any time by replying STOP</li>
            <li>Request that we communicate via a specific method (phone, email, or text)</li>
          </ul>
          <p className="text-gray-600 mt-3">
            To exercise any of these rights, contact us at {COMPANY.phone} or{" "}
            {COMPANY.email}.
          </p>
        </section>

        {/* ── Cookies ── */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-[#092e5e] mb-4">
            Cookies &amp; Website Analytics
          </h2>
          <p className="text-gray-600">
            Our website may use cookies and similar technologies to improve your
            browsing experience and collect anonymous usage data. This may
            include pages visited, time on site, and referral sources. You can
            control cookie preferences through your browser settings. We do not
            use cookies to collect personally identifiable information without
            your consent.
          </p>
        </section>

        {/* ── Children ── */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-[#092e5e] mb-4">
            Children&apos;s Privacy
          </h2>
          <p className="text-gray-600">
            Our services are not directed at individuals under 18 years of age.
            We do not knowingly collect personal information from children.
          </p>
        </section>

        {/* ── Changes ── */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-[#092e5e] mb-4">
            Changes to This Policy
          </h2>
          <p className="text-gray-600">
            We may update this policy from time to time. Changes will be posted
            on this page with an updated revision date. Continued use of our
            services after changes are posted constitutes acceptance of the
            revised policy.
          </p>
        </section>

        {/* ── Contact ── */}
        <section className="rounded-xl bg-gray-50 p-8">
          <h2 className="text-xl font-bold text-[#092e5e] mb-4">
            Contact Us
          </h2>
          <p className="text-gray-600 mb-4">
            If you have questions about this Privacy &amp; Communication Policy,
            or wish to exercise any of your rights, please contact us:
          </p>
          <div className="text-gray-600 space-y-1">
            <p><strong>{COMPANY.name}</strong></p>
            <p>{COMPANY.address.street}</p>
            <p>
              {COMPANY.address.city}, {COMPANY.address.state}{" "}
              {COMPANY.address.zip}
            </p>
            <p className="pt-2">
              Phone:{" "}
              <a href={COMPANY.phoneTel} className="text-[#d85024] hover:underline">
                {COMPANY.phone}
              </a>
            </p>
            <p>
              Email:{" "}
              <a href={`mailto:${COMPANY.email}`} className="text-[#d85024] hover:underline">
                {COMPANY.email}
              </a>
            </p>
          </div>
        </section>
      </article>
    </>
  );
}
