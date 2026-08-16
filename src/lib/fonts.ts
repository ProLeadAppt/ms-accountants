import localFont from "next/font/local";

// Display + headline serif — Zodiak (Indian Type Foundry via Fontshare).
// Sharp, high-contrast; the barrister's serif. Variable weight + true italic.
export const zodiak = localFont({
  src: [
    { path: "../fonts/Zodiak-Variable.woff2", style: "normal" },
    { path: "../fonts/Zodiak-VariableItalic.woff2", style: "italic" },
  ],
  variable: "--font-zodiak",
  weight: "300 700",
  display: "swap",
});

// UI grotesk — General Sans. Nav, labels, body, buttons.
export const generalSans = localFont({
  src: [
    { path: "../fonts/GeneralSans-Variable.woff2", style: "normal" },
    { path: "../fonts/GeneralSans-VariableItalic.woff2", style: "italic" },
  ],
  variable: "--font-general-sans",
  weight: "200 700",
  display: "swap",
});

// Eyebrows / mono labels — kept for tabular/footnote figures only.
export const spaceMono = localFont({
  src: [
    { path: "../fonts/SpaceMono-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/SpaceMono-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-space-mono",
  display: "swap",
});

// Logo wordmark — heavy grotesque, vendored locally for deterministic builds.
export const archivo = localFont({
  src: [{ path: "../fonts/Archivo-Variable.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-archivo",
  display: "swap",
});

export const fontVariables = [
  zodiak.variable,
  generalSans.variable,
  spaceMono.variable,
  archivo.variable,
].join(" ");
