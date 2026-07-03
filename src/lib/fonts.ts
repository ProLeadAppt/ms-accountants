import localFont from "next/font/local";
import { Space_Mono, Archivo } from "next/font/google";

// Display + headline serif — Zodiak (Indian Type Foundry via Fontshare).
// Sharp, high-contrast; the barrister's serif. Variable weight + true italic.
export const zodiak = localFont({
  src: [
    { path: "../fonts/Zodiak-Variable.woff2", style: "normal" },
    { path: "../fonts/Zodiak-VariableItalic.woff2", style: "italic" },
  ],
  variable: "--font-zodiak",
  display: "swap",
});

// UI grotesk — General Sans. Nav, labels, body, buttons.
export const generalSans = localFont({
  src: [
    { path: "../fonts/GeneralSans-Variable.woff2", style: "normal" },
    { path: "../fonts/GeneralSans-VariableItalic.woff2", style: "italic" },
  ],
  variable: "--font-general-sans",
  display: "swap",
});

// Eyebrows / mono labels — kept for tabular/footnote figures only.
export const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

// Logo wordmark — heavy grotesque (unchanged).
export const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export const fontVariables = [
  zodiak.variable,
  generalSans.variable,
  spaceMono.variable,
  archivo.variable,
].join(" ");
