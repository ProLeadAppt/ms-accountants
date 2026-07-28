import type { Metadata } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { site } from "@/lib/site";
import { rootGraph } from "@/lib/schema";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { ScrollReset } from "@/components/motion/ScrollReset";
import { Preloader } from "@/components/motion/Preloader";
import { HERO_STILL } from "@/lib/heroAsset";
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
              "document.documentElement.classList.remove('no-js');document.documentElement.classList.add('js');" +
              // Decide before the overlay below paints: skip it if it already ran
              // this session or the visitor prefers reduced motion. This runs
              // ahead of the server-rendered #ms-preloader, so the skip case
              // never flashes the loader.
              "try{if(sessionStorage.getItem('ms-preloaded')==='1'||matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('preloader-done');}}catch(e){}",
          }}
        />
        <GoogleAnalytics />
        <ConversionTracking />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootGraph) }}
        />
        <Preloader heroSrc={HERO_STILL} />
        <ScrollReset />
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
