import {
  Newsreader,
  Schibsted_Grotesk,
  Space_Mono,
  Archivo,
} from "next/font/google";

// Headlines AND display — one editorial newspaper serif with a wide optical
// size axis (6..72) plus true italics for the signature emphasis device
// ("Ours *wrote the thesis* on it"). High-opsz cuts carry the oversized
// statement moments that Instrument Serif used to.
export const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz"],
});

// Body / UI — distinctive editorial grotesque (NOT Inter/Manrope).
export const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted",
  display: "swap",
});

// Eyebrows / mono labels — editorial micro-detail.
export const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

// Logo wordmark — heavy grotesque, intentional contrast with the serif.
export const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export const fontVariables = [
  newsreader.variable,
  schibsted.variable,
  spaceMono.variable,
  archivo.variable,
].join(" ");
