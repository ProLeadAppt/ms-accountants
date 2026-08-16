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

        <div className="mt-14 flex flex-col gap-3 border-t border-[var(--hairline)] pt-7 text-xs text-[var(--muted)] sm:flex-row sm:justify-between">
          <span>© {year} MS Accountants. All rights reserved.</span>
          <span>{site.credentialLine}</span>
        </div>
      </Container>
    </footer>
  );
}
