export const ADSENSE_CLIENT = "ca-pub-2430261037866035";

const ADSENSE_CONTENT_PATHS = new Set([
  "/",
  "/blog",
  "/ingredients",
  "/ingredients/hotlist",
  "/guides",
  "/cosmetic-notification-form-canada",
  "/cosmetic-label-requirements-canada",
  "/health-canada-cosmetic-hotlist",
  "/inci-name-lookup-canada",
  "/cosmetic-ingredient-suppliers-canada",
  "/how-to-sell-handmade-soap-in-canada",
  "/handmade-skincare-business-canada",
  "/sell-body-butter-canada",
  "/sell-sugar-scrub-canada",
  "/sell-bath-bombs-canada",
  "/soap-sap-values-chart",
]);

const ADSENSE_CONTENT_PREFIXES = [
  "/blog/",
  "/bc/",
  "/tools/soap-calculator/recipes/",
];

export function isAdSenseContentPath(pathname: string): boolean {
  return (
    ADSENSE_CONTENT_PATHS.has(pathname) ||
    ADSENSE_CONTENT_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  );
}
