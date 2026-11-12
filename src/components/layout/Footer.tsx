import Link from "next/link";
import { Container } from "./Container";
import { Logo } from "@/components/ui/Logo";
import { site, nav } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="footer" className="scheme-espresso">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Logo sizes="240px" className="w-[15rem] max-w-full" />
            <p className="mt-6 max-w-sm text-base leading-relaxed text-[var(--muted)]">
              {site.footerTrust}
            </p>
          </div>

          <div>
            <p className="eyebrow mb-5">Explore</p>
            <ul className="space-y-3 text-base">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5">Contact</p>
            <ul className="space-y-3 text-base text-[var(--muted)]">
              <li>
                <a
                  href={site.contact.phoneHref}
                  className="link-underline"
                  data-track-event="contact_link_click"
                  data-track-category="conversion"
                  data-track-label="Footer phone"
                >
                  {site.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.contact.mobileHref}
                  className="link-underline"
                  data-track-event="contact_link_click"
                  data-track-category="conversion"
                  data-track-label="Footer mobile"
                >
                  {site.contact.mobile}
                </a>
              </li>
              <li>
                <a
                  href={site.contact.emailHref}
                  className="link-underline"
                  data-track-event="contact_link_click"
                  data-track-category="conversion"
                  data-track-label="Footer email"
                >
                  {site.contact.email}
                </a>
              </li>
              <li>North Strathfield NSW 2137</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex min-w-0 flex-col gap-7 border-t border-[var(--hairline)] pt-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="flex min-w-0 flex-col gap-2 text-xs leading-5 text-[var(--muted)]">
            <span>© {year} MS Accountants. All rights reserved.</span>
            <span>{site.credentialLine}</span>
          </div>
          <a
            href="https://munyal.com.au"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Built by Munyal · Personally crafted by Tyson Kaye"
            className="group inline-flex min-h-11 min-w-0 max-w-full flex-col items-start self-start py-1 text-[var(--fg)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--fg)] lg:max-w-sm"
          >
            <span aria-hidden="true" className="mb-2 block h-px w-10 bg-[var(--accent)] transition-colors group-hover:bg-[var(--fg)]" />
            <span className="font-serif text-base leading-6">Built by <strong className="font-medium">Munyal</strong></span>
            <span className="mt-1 text-[13px] leading-5 text-[var(--muted)]">· Personally crafted by <span className="font-medium text-[var(--fg)]">Tyson Kaye</span></span>
          </a>
        </div>
      </Container>
    </footer>
  );
}

