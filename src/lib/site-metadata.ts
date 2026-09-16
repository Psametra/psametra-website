import type { Metadata } from "next";
import type { PageKey, SiteContent } from "@/content/site-schema";

export function pageMetadata(site: SiteContent, page: PageKey): Metadata {
  const metadata = site.seo[page];
  return {
    title: page === "home" ? { absolute: metadata.title } : metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      type: "website",
      siteName: site.name,
    },
  };
}
