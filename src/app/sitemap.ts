import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getIndexableIngredientSlugs, getIngredientFunctions } from "@/lib/supabase/queries/ingredients";
import { getAllSupplierSlugs } from "@/lib/supabase/queries/suppliers";
import { getAllProductSlugs } from "@/lib/supabase/queries/shop";
import { BLOG_POST_MANIFEST } from "@/content/blog/manifest";
import { SOAP_RECIPES } from "@/lib/soap-recipes";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [ingredientSlugs, supplierSlugs, productSlugs, ingredientFunctions] = await Promise.all([
    getIndexableIngredientSlugs(),
    getAllSupplierSlugs(),
    getAllProductSlugs(),
    getIngredientFunctions(),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteConfig.url, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/ingredients`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${siteConfig.url}/ingredients/hotlist`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.url}/suppliers`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/shop`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteConfig.url}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteConfig.url}/pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/guides`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteConfig.url}/guides/health-canada-cosmetic-notification`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/cosmetic-notification-form-canada`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteConfig.url}/cosmetic-label-requirements-canada`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteConfig.url}/health-canada-cosmetic-hotlist`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteConfig.url}/inci-name-lookup-canada`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.url}/cosmetic-ingredient-suppliers-canada`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.url}/how-to-sell-handmade-soap-in-canada`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.url}/handmade-skincare-business-canada`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.url}/sell-body-butter-canada`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/sell-sugar-scrub-canada`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/sell-bath-bombs-canada`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/tools`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/tools/cnf-readiness-checker`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteConfig.url}/tools/inci-list-formatter`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.url}/tools/cosmetic-cost-calculator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.url}/tools/cosmetic-label-checklist`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.url}/tools/soap-calculator`, lastModified: new Date("2026-09-13"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteConfig.url}/soap-sap-values-chart`, lastModified: new Date("2026-09-13"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.url}/tools/soap-calculator/recipes`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteConfig.url}/bc`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/bc/farmers-market-cosmetic-vendor-checklist`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/bc/sell-handmade-soap-at-markets`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/bc/vancouver-market-vendor-checklist`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/bc/cosmetic-business-license-guide`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/bc/handmade-skincare-insurance`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/bc/temporary-food-vs-cosmetic-vendor`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/feedback`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteConfig.url}/about`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    { url: `${siteConfig.url}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    { url: `${siteConfig.url}/data-sources`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteConfig.url}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteConfig.url}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteConfig.url}/disclaimer`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
  ];

  const ingredientFunctionPages: MetadataRoute.Sitemap = ingredientFunctions.map((fn) => ({
    url: `${siteConfig.url}/ingredients/function/${fn.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8,
  }));

  const ingredientPages: MetadataRoute.Sitemap = ingredientSlugs.map((slug) => ({
    url: `${siteConfig.url}/ingredients/${slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7,
  }));

  const supplierPages: MetadataRoute.Sitemap = supplierSlugs.map((slug) => ({
    url: `${siteConfig.url}/suppliers/${slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6,
  }));

  const shopPages: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: `${siteConfig.url}/shop/${slug}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = BLOG_POST_MANIFEST.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const soapRecipePages: MetadataRoute.Sitemap = SOAP_RECIPES.map((r) => ({
    url: `${siteConfig.url}/tools/soap-calculator/recipes/${r.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...ingredientFunctionPages,
    ...ingredientPages,
    ...supplierPages,
    ...shopPages,
    ...blogPages,
    ...soapRecipePages,
  ];
}
