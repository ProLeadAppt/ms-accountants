"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { services } from "@/lib/services";
import { trackConversion } from "@/lib/analytics";
import { buildContactEmailHref } from "@/lib/contact";

const FIELD =
  "w-full rounded-xl border border-espresso/15 bg-cream px-4 py-3 font-sans text-espresso outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-espresso/40 focus:border-brand-red focus:ring-2 focus:ring-brand-red/20";
const LABEL =
  "mb-2 block font-mono text-[0.68rem] uppercase tracking-[0.16em] text-clay";

export function ContactForm() {
  const [draftHref, setDraftHref] = useState<string | null>(null);
  const successCard = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!draftHref) return;
    successCard.current?.scrollIntoView({ block: "end", behavior: "auto" });
  }, [draftHref]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const href = buildContactEmailHref({
      name: String(data.name ?? ""),
      email: String(data.email ?? ""),
      phone: String(data.phone ?? ""),
      topic: String(data.topic ?? ""),
      message: String(data.message ?? ""),
    });

    trackConversion("contact_email_draft_open", {
      event_category: "conversion",
      event_label:
        typeof data.topic === "string" && data.topic
          ? data.topic
          : "General enquiry",
    });
    setDraftHref(href);
    window.location.assign(href);
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={LABEL}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className={FIELD}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className={LABEL}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={FIELD}
            placeholder="you@company.com.au"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={LABEL}>
            Phone <span className="normal-case text-espresso/40">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={FIELD}
            placeholder="02 0000 0000"
          />
        </div>
        <div>
          <label htmlFor="topic" className={LABEL}>
            What can we help with?
          </label>
          <select id="topic" name="topic" defaultValue="" className={FIELD}>
            <option value="" disabled>
              Select a service
            </option>
            {services.map((service) => (
              <option key={service.slug} value={service.navTitle}>
                {service.navTitle}
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

      <p className="max-w-xl text-sm leading-relaxed text-[var(--muted)]">
        Continue to your email app with these details filled in. Review the draft,
        then send it from your own account.
      </p>

      <div>
        <button
          type="submit"
          className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-brand-red px-7 py-4 font-sans text-[0.95rem] font-medium text-cream"
        >
          <span>Continue to email</span>
          <Icon name="arrow" size={16} />
        </button>
      </div>

      {draftHref && (
        <div
          ref={successCard}
          aria-live="polite"
          className="mt-3 flex flex-col items-start gap-4 rounded-2xl border border-brand-red/20 bg-[color-mix(in_srgb,var(--color-brand-red)_5%,transparent)] p-8"
        >
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-red text-cream">
            <Icon name="compliance" size={22} />
          </span>
          <h3 className="font-serif text-2xl text-espresso">
            Your email is ready to send.
          </h3>
          <p className="max-w-md text-[var(--muted)]">
            We opened a draft addressed to m.sridaran@msaccountants.com.au. Please
            review it and press send. If no draft appeared, use the button below.
          </p>
          <a
            href={draftHref}
            className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-brand-red px-6 py-3.5 font-sans text-[0.95rem] font-medium text-cream"
          >
            Open email draft
            <Icon name="arrow" size={16} />
          </a>
        </div>
      )}
    </form>
  );
}
