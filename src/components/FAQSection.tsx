import { FAQJsonLd } from "./JsonLd";

type FAQ = { question: string; answer: string };

/*
  FAQ accordion on native <details>/<summary> (2026-11-15). The old version only rendered an answer after a click,
  so the page HTML held the questions but not the answers: crawlers and AI answer engines that don't click saw
  them only in the JSON-LD. Native details keeps every answer in the HTML, works without JavaScript, and is
  keyboard and screen-reader accessible out of the box.
*/
export default function FAQSection({
  title = "Frequently Asked Questions",
  faqs,
}: {
  title?: string;
  faqs: FAQ[];
}) {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <FAQJsonLd faqs={faqs} />
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold text-[#092e5e] text-center mb-10">
          {title}
        </h2>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-lg border border-gray-200 bg-white open:border-[#ffbd59]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-left [&::-webkit-details-marker]:hidden">
                <h3 className="text-base font-semibold text-[#092e5e]">
                  {faq.question}
                </h3>
                <svg
                  className="h-5 w-5 flex-shrink-0 text-[#c04520] transition-transform group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </summary>
              <p className="px-6 pb-5 text-base text-gray-600 leading-relaxed">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
