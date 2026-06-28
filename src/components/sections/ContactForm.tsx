"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { services } from "@/lib/services";

type Status = "idle" | "submitting" | "success" | "error";

const FIELD =
  "w-full rounded-xl border border-espresso/15 bg-cream px-4 py-3 font-sans text-espresso outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-espresso/40 focus:border-brand-red focus:ring-2 focus:ring-brand-red/20";
const LABEL =
  "mb-2 block font-mono text-[0.68rem] uppercase tracking-[0.16em] text-clay";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(body?.error ?? "Something went wrong. Please try again.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 rounded-2xl border border-brand-red/20 bg-[color-mix(in_srgb,var(--color-brand-red)_5%,transparent)] p-8">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-red text-cream">
          <Icon name="compliance" size={22} />
        </span>
        <h3 className="font-serif text-2xl text-espresso">Thank you. Message received.</h3>
        <p className="max-w-md text-[var(--muted)]">
          Your enquiry has reached us. Dr Sridaran or a member of the practice
          will be in touch shortly. For anything urgent, call{" "}
          <a className="text-brand-red underline-offset-4 hover:underline" href="tel:+61297394837">
            02 9739 4837
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={LABEL}>
            Name
          </label>
          <input id="name" name="name" type="text" required className={FIELD} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className={LABEL}>
            Email
          </label>
          <input id="email" name="email" type="email" required className={FIELD} placeholder="you@company.com.au" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={LABEL}>
            Phone <span className="normal-case text-espresso/40">(optional)</span>
          </label>
          <input id="phone" name="phone" type="tel" className={FIELD} placeholder="02 0000 0000" />
        </div>
        <div>
          <label htmlFor="topic" className={LABEL}>
            What can we help with?
          </label>
          <select id="topic" name="topic" defaultValue="" className={FIELD}>
            <option value="" disabled>
              Select a service
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.navTitle}>
                {s.navTitle}
              </option>
            ))}
            <option value="Something else">Something else</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={LABEL}>
          Your message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={FIELD}
          placeholder="Tell us about the question in front of you."
        />
      </div>

      {status === "error" && error && (
        <p role="alert" className="text-sm text-brand-red">
          {error}
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-brand-red px-7 py-4 font-sans text-[0.95rem] font-medium text-cream transition-opacity duration-300 disabled:opacity-60"
        >
          <span>{status === "submitting" ? "Sending..." : "Send enquiry"}</span>
          {status !== "submitting" && <Icon name="arrow" size={16} />}
        </button>
      </div>
    </form>
  );
}
