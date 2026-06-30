import type { Metadata } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { site } from "@/lib/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Preloader } from "@/components/motion/Preloader";
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
    "Your accountant should know tax. Ours wrote the thesis on it, and is a lawyer too. A boutique Sydney firm where Dr Sridaran (chartered accountant, lawyer, PhD in Australian tax law) handles any tax problem at every level, from advice to investigations and litigation.",
  openGraph: {
    type: "website",
    siteName: "MS Accountants",
    locale: "en_AU",
    url: site.url,
    title:
      "MS Accountants · Sydney tax specialists led by Dr Maheswaran Sridaran",
    description:
      "Your accountant should know tax. Ours wrote the thesis on it, and is a lawyer too.",
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
    "Boutique Sydney tax and accounting firm led by Dr Maheswaran Sridaran, a chartered accountant and lawyer with a PhD in Australian tax law.",
  url: site.url,
  areaServed: "Sydney, Australia",
  knowsAbout: [
    "Tax law",
    "Capital gains tax",
    "Tax planning",
    "Tax disputes",
    "Tax-authority investigations",
    "Tax litigation",
    "ATO audits",
    "Business advisory",
    "Self-managed superannuation",
  ],
  founder: {
    "@type": "Person",
    name: "Dr Maheswaran Sridaran",
    jobTitle: "Principal",
    description:
      "Chartered accountant, lawyer and registered tax agent. PhD in Australian tax law (Macquarie University), LLB (Macquarie University), Master of Taxation (UNSW). Over 45 years across more than five countries, the early years with two of the Big Four, the last 25 in Australia.",
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
        <Preloader heroSrc="/generated/lib2-1.jpg" />
        <Header />
        <div className="grain-overlay" aria-hidden="true" />
        <SmoothScroll>
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
