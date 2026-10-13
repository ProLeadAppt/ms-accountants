import type { Metadata } from "next";
import { site } from "./site";

export const shareImage = {
  url: "/share-image",
  width: 1200,
  height: 630,
  alt: "MS Accountants — a boutique Sydney tax and accounting firm",
};

/** Keep approved page copy while giving each page its own sharing identity. */
export function withPageSocial(metadata: Metadata, path: string): Metadata {
  const rawTitle = typeof metadata.title === "string"
    ? metadata.title
    : metadata.title && "absolute" in metadata.title ? metadata.title.absolute
    : metadata.title && "default" in metadata.title ? metadata.title.default
    : site.name;
  const title = rawTitle.includes(site.name) ? rawTitle : `${rawTitle} · ${site.name}`;
  const images = metadata.openGraph?.images ?? [shareImage];
  const imageList = Array.isArray(images) ? images : [images];
  const imageUrls = imageList.map((image) => typeof image === "string" || image instanceof URL ? image : image.url);
  return {
    ...metadata,
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_AU",
      ...metadata.openGraph,
      title: metadata.openGraph?.title ?? title,
      description: metadata.openGraph?.description ?? metadata.description ?? undefined,
      url: `${site.url}${path}`,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.openGraph?.title ?? title,
      description: metadata.openGraph?.description ?? metadata.description ?? undefined,
      images: imageUrls,
      ...metadata.twitter,
    },
  };
}
