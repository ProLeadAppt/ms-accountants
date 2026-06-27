import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default:
      "MS Accountants — Sydney tax specialists led by Dr Maheswaran Sridaran",
    template: "%s — MS Accountants",
  },
  description:
    "Your accountant should know capital gains tax. Ours wrote the thesis on it. A boutique Sydney firm where Dr Sridaran — PhD (Tax), M.Tax, CA — personally oversees every engagement.",
  openGraph: {
    type: "website",
    siteName: "MS Accountants",
    locale: "en_AU",
    url: site.url,
    title:
      "MS Accountants — Sydney tax specialists led by Dr Maheswaran Sridaran",
    description:
      "Your accountant should know capital gains tax. Ours wrote the thesis on it.",
  },
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
      className={`${fraunces.variable} ${hanken.variable} ${plexMono.variable}`}
    >
      <body className="antialiased" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
        <main>{children}</main>
      </body>
    </html>
  );
}
