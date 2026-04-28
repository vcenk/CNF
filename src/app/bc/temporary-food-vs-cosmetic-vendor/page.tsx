import {
  SeoGuide,
  buildSeoGuideMetadata,
  type SeoGuideFaq,
  type SeoGuideSection,
} from "@/components/marketing/seo-guide";
import { BcScopeCallout } from "@/components/marketing/bc-scope-callout";

const pathname = "/bc/temporary-food-vs-cosmetic-vendor";
const title = "BC Temporary Food vs Cosmetic Vendor — How to Tell the Difference";
const description =
  "Lip balm, body butter, bath bombs, sugar scrubs — when a BC market vendor is selling cosmetics vs food, and which permits and notifications apply.";
const lastReviewed = "April 27, 2026";

const sections: SeoGuideSection[] = [
  {
    heading: "Why the distinction matters",
    body: (
      <p>
        BC markets often have separate vendor categories for food and
        non-food sellers. Temporary food vendors usually deal with the
        local public health authority (food permits, hand-washing
        stations, allergen disclosure). Cosmetic vendors deal with Health
        Canada cosmetic notification, the Cosmetic Ingredient Hotlist, and
        cosmetic labelling rules. Mixing the categories at a booth can
        create confusion at jury-time.
      </p>
    ),
  },
  {
    heading: "Cosmetic, not food — common indie products",
    bullets: [
      "Lip balm and lip butter (cosmetic — even though applied to lips)",
      "Body butter, lotion, and balm",
      "Sugar scrub and salt scrub",
      "Bath bomb and bath salt",
      "Soap (cold process, hot process, melt-and-pour)",
      "Hair shampoo and conditioner bars",
      "Perfume and body spray",
    ],
  },
  {
    heading: "Food, not cosmetic — examples",
    bullets: [
      "Edible products such as cookies, jam, infused oils for cooking",
      "Honey and bee products sold for consumption",
      "Tea, herbal blends, and tinctures with consumption claims",
      "Anything sold for ingestion",
    ],
  },
  {
    heading: "Grey areas",
    body: (
      <p>
        Some products straddle categories. A balm marketed as a lip
        moisturizer is a cosmetic. The same balm marketed as &quot;edible
        honey lip food&quot; with consumption claims could be treated as
        food. A herbal infusion in oil for skin use is cosmetic; the same
        oil in a salad-dressing context is food. Marketing claims and
        positioning matter as much as the recipe.
      </p>
    ),
  },
  {
    heading: "Where a single vendor sells both",
    body: (
      <p>
        Some BC indie makers sell both food (jam, baked goods) and
        cosmetics (lip balm, body butter). In that case, both the food
        permit and the cosmetic-side responsibilities apply, and they are
        kept separate at the booth (different signage, separate label
        styles, separate inventory).
      </p>
    ),
  },
];

const faqs: SeoGuideFaq[] = [
  {
    question: "Are lip balms food or cosmetics in Canada?",
    answer:
      "Lip balms used to moisturize and protect lips are treated as cosmetics in Canada. They follow cosmetic notification, hotlist, and labelling rules.",
  },
  {
    question: "Are bath bombs cosmetics or something else?",
    answer:
      "Bath bombs sold to the public in Canada are generally treated as rinse-off cosmetics, even when they look or smell like food. Marketing them as edible can move them into food regulation, which is more complex.",
  },
  {
    question: "Do food vendor permits cover cosmetics?",
    answer:
      "No. Local food permits cover food handling. Cosmetic notification, ingredient review, and cosmetic labelling are separate Health Canada responsibilities.",
  },
  {
    question: "Can one BC market booth sell both food and cosmetics?",
    answer:
      "It is possible at some markets, but each set of responsibilities applies independently. Confirm the vendor agreement and check with the local public health authority for the food side.",
  },
];

export const metadata = buildSeoGuideMetadata({ title, description, pathname });

export default function TemporaryFoodVsCosmeticVendorPage() {
  return (
    <SeoGuide
      eyebrow="BC vendors"
      title={title}
      description={description}
      pathname={pathname}
      datePublished="2026-04-27"
      dateModified="2026-04-27"
      lastReviewed={lastReviewed}
      breadcrumbs={[
        { label: "BC resources", href: "/bc" },
        { label: "Temporary food vs cosmetic vendor" },
      ]}
      intro={
        <>
          <p>
            Lip balm vs honey, body butter vs body cream, bath bomb vs
            bath salt — at a BC market the food vs cosmetic distinction
            decides which permits and notifications apply. This guide
            walks through the common indie product categories and where
            things tend to get fuzzy.
          </p>
          <BcScopeCallout />
        </>
      }
      sections={sections}
      faqs={faqs}
      primaryCta={{
        label: "Run a CNF Readiness Check",
        href: "/tools/cnf-readiness-checker",
        description: "Confirm cosmetic-side prep before your first market",
      }}
      relatedLinks={[
        {
          label: "Sell Bath Bombs in Canada",
          href: "/sell-bath-bombs-canada",
          description: "Bath bombs are cosmetics, not food.",
        },
        {
          label: "Sell Sugar Scrub in Canada",
          href: "/sell-sugar-scrub-canada",
          description: "Rinse-off cosmetic — not edible.",
        },
        {
          label: "Cosmetic Notification Form (CNF) Canada",
          href: "/cosmetic-notification-form-canada",
          description: "Federal cosmetic notification responsibilities.",
        },
        {
          label: "Farmers Market Cosmetic Vendor Checklist (BC)",
          href: "/bc/farmers-market-cosmetic-vendor-checklist",
          description: "Local vendor preparation for BC markets.",
        },
      ]}
    />
  );
}
