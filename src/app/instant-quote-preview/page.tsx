import type { Metadata } from "next";
import InstantQuote from "@/components/InstantQuote";

// Unlinked test page for the address-based quote widget. Not in the nav or
// sitemap, and noindex, until Sean signs off on pricing and it replaces the
// estimator on /estimate.
export const metadata: Metadata = {
  title: "Instant Roof Quote (preview)",
  robots: { index: false, follow: false },
};

export default function InstantQuotePreviewPage() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <InstantQuote />
    </section>
  );
}
