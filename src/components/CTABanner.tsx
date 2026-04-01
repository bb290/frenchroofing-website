import Link from "next/link";
import { COMPANY } from "@/lib/constants";

export default function CTABanner({
  headline = "Schedule a FREE Roof Assessment",
  description = "Our expert specialists will evaluate, diagnose, and recommend the best solution for your roof.",
  dark = false,
}: {
  headline?: string;
  description?: string;
  dark?: boolean;
}) {
  return (
    <section
      className={`py-16 px-4 ${
        dark ? "bg-[#092e5e] text-white" : "bg-[#ffbd59]"
      }`}
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2
          className={`text-3xl sm:text-4xl font-bold mb-4 ${
            dark ? "text-white" : "text-[#092e5e]"
          }`}
        >
          {headline}
        </h2>
        <p
          className={`text-lg mb-8 ${
            dark ? "text-gray-300" : "text-[#3e3d3b]"
          }`}
        >
          {description}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-lg bg-[#d85024] px-8 py-4 text-lg font-semibold text-white hover:bg-[#c04520] transition-colors"
          >
            Schedule Now
          </Link>
          <a
            href={COMPANY.phoneTel}
            className={`text-lg font-semibold ${
              dark ? "text-[#ffbd59]" : "text-[#092e5e]"
            }`}
          >
            Or call {COMPANY.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
