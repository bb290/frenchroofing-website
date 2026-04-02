"use client";

import { useState } from "react";
import { SERVICES } from "@/lib/constants";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      address: (form.elements.namedItem("address") as HTMLInputElement).value,
      service: (form.elements.namedItem("service") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        const body = await res.json();
        setErrorMsg(body.error || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again or reach out through our contact page.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl bg-green-50 border border-green-200 p-8 text-center">
        <div className="h-14 w-14 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4">
          <svg className="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-[#092e5e] mb-2">Message Sent!</h3>
        <p className="text-gray-600">
          We typically respond within 1 business day. If it&apos;s urgent,
          reach out through our contact form.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm text-[#d85024] font-medium hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[#3e3d3b] mb-1">
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
          <label htmlFor="email" className="block text-sm font-medium text-[#3e3d3b] mb-1">
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
          <label htmlFor="phone" className="block text-sm font-medium text-[#3e3d3b] mb-1">
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
        <label htmlFor="address" className="block text-sm font-medium text-[#3e3d3b] mb-1">
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
        <label htmlFor="service" className="block text-sm font-medium text-[#3e3d3b] mb-1">
          Service Needed
        </label>
        <select
          id="service"
          name="service"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-[#3e3d3b] focus:border-[#d85024] focus:ring-2 focus:ring-[#d85024]/20 outline-none transition-colors bg-white"
        >
          <option value="">Select a service...</option>
          {SERVICES.map((s) => (
            <option key={s.slug} value={s.name}>
              {s.name}
            </option>
          ))}
          <option value="Other">Other / Not Sure</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[#3e3d3b] mb-1">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-[#3e3d3b] focus:border-[#d85024] focus:ring-2 focus:ring-[#d85024]/20 outline-none transition-colors resize-y"
          placeholder="Tell us about your project or question..."
        />
      </div>

      {status === "error" && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-lg bg-[#d85024] px-8 py-4 text-lg font-semibold text-white hover:bg-[#c04520] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
      <p className="text-xs text-gray-500 text-center">
        We typically respond within 1 business day.
      </p>
    </form>
  );
}
