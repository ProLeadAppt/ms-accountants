import {
  Fraunces,
  Instrument_Serif,
  Schibsted_Grotesk,
  Space_Mono,
  Archivo,
} from "next/font/google";

// Headlines — warm literary serif with optical sizing + italic for the
// signature emphasis device ("Ours *wrote the thesis* on it").
export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz"],
});

// Signature display — reserved for a few oversized statement moments.
export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
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
  fraunces.variable,
  instrumentSerif.variable,
  schibsted.variable,
  spaceMono.variable,
  archivo.variable,
].join(" ");
