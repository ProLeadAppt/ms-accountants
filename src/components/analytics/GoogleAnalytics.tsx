import { GoogleAnalytics as NextGoogleAnalytics } from "@next/third-parties/google";

export const GA_MEASUREMENT_ID = "G-B4EJMTDL7F";

export function GoogleAnalytics() {
  return <NextGoogleAnalytics gaId={GA_MEASUREMENT_ID} />;
}
