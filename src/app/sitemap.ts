import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getAllIngredientSlugs } from "@/lib/supabase/queries/ingredients";
import { getAllSupplierSlugs } from "@/lib/supabase/queries/suppliers";
import { getAllProductSlugs } from "@/lib/supabase/queries/shop";
import { getAllPostSlugs } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [ingredientSlugs, supplierSlugs, productSlugs] = await Promise.all([
    getAllIngredientSlugs(),
    getAllSupplierSlugs(),
    getAllProductSlugs(),
  ]);

  const postSlugs = getAllPostSlugs();

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteConfig.url, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/ingredients`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${siteConfig.url}/ingredients/hotlist`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.url}/suppliers`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/shop`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteConfig.url}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteConfig.url}/resources`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteConfig.url}/pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/guides`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteConfig.url}/guides/health-canada-cosmetic-notification`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  const ingredientPages: MetadataRoute.Sitemap = ingredientSlugs.map((slug) => ({
    url: `${siteConfig.url}/ingredients/${slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7,
  }));

  const supplierPages: MetadataRoute.Sitemap = supplierSlugs.map((slug) => ({
    url: `${siteConfig.url}/suppliers/${slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6,
  }));

  const shopPages: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: `${siteConfig.url}/shop/${slug}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = postSlugs.map((slug) => ({
    url: `${siteConfig.url}/blog/${slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6,
  }));

  return [...staticPages, ...ingredientPages, ...supplierPages, ...shopPages, ...blogPages];
}
