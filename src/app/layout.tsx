import type { Metadata } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { site } from "@/lib/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { ConversionTracking } from "@/components/analytics/ConversionTracking";

const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default:
      "MS Accountants · Sydney tax specialists led by Dr Maheswaran Sridaran",
    template: "%s · MS Accountants",
  },
  description:
    "Your accountant should know capital gains tax. Ours wrote the thesis on it. A boutique Sydney firm where Dr Sridaran (PhD Tax, M.Tax, CA) reviews every engagement himself.",
  openGraph: {
    type: "website",
    siteName: "MS Accountants",
    locale: "en_AU",
    url: site.url,
    title:
      "MS Accountants · Sydney tax specialists led by Dr Maheswaran Sridaran",
    description:
      "Your accountant should know capital gains tax. Ours wrote the thesis on it.",
  },
  verification: googleSiteVerification
    ? { google: googleSiteVerification }
    : undefined,
  alternates: { canonical: "/" },
};

const orgLd = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  name: "MS Accountants",
  description:
    "Boutique Sydney tax and accounting firm led by Dr Maheswaran Sridaran, PhD in Australian capital gains tax.",
  url: site.url,
  areaServed: "Sydney, Australia",
  knowsAbout: [
    "Capital gains tax",
    "Tax planning",
    "Tax disputes",
    "ATO audits",
    "Business advisory",
    "Self-managed superannuation",
  ],
  founder: {
    "@type": "Person",
    name: "Dr Maheswaran Sridaran",
    jobTitle: "Principal",
    description:
      "PhD in Australian capital gains tax (Macquarie University), Master of Taxation (UNSW), Chartered Accountant. 30 years across PwC, Ernst & Young and WHK Horwath in five countries.",
    alumniOf: ["Macquarie University", "UNSW"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-AU"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${fontVariables} no-js`}
    >
      <body className="antialiased" suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.remove('no-js');document.documentElement.classList.add('js');",
          }}
        />
        <GoogleAnalytics />
        <ConversionTracking />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <div className="grain-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
