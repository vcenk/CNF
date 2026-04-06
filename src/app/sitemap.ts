import type { MetadataRoute } from "next";
import { marketingPages } from "@/lib/marketing-pages";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${siteConfig.url}/intake`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8
    },
    {
      url: `${siteConfig.url}/guides`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7
    },
    ...marketingPages.map((page) => ({
      url: `${siteConfig.url}${page.href}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: page.href.startsWith("/guides/") ? 0.7 : 0.9
    }))
  ];
}
