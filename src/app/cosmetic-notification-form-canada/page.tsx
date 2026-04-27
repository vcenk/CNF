import {
  SeoGuide,
  buildSeoGuideMetadata,
  type SeoGuideFaq,
  type SeoGuideSection,
} from "@/components/marketing/seo-guide";

const pathname = "/cosmetic-notification-form-canada";
const title = "Cosmetic Notification Form (CNF) Canada — A Practical Guide";
const description =
  "What the Health Canada Cosmetic Notification Form is, who has to file it, what information you need to gather, and how to prepare your submission with less rework.";
const lastReviewed = "April 27, 2026";

const sections: SeoGuideSection[] = [
  {
    heading: "What the Cosmetic Notification Form is",
    body: (
      <>
        <p>
          The Cosmetic Notification Form (CNF) is the form Health Canada
          expects manufacturers and importers to file for cosmetic products
          sold in Canada under the Cosmetic Regulations. It collects company
          identity, product identity, intended use, and ingredient information
          so Health Canada can monitor what is on the Canadian market.
        </p>
        <p>
          Filing a CNF does not certify or pre-approve a product. It is a
          notification, not an approval. The maker remains responsible for
          ensuring the product is safe, properly labelled, and complies with
          the Cosmetic Regulations and the Cosmetic Ingredient Hotlist.
        </p>
      </>
    ),
  },
  {
    heading: "Who needs to file a CNF",
    body: (
      <p>
        Anyone manufacturing or importing a cosmetic for sale in Canada is
        generally expected to notify Health Canada. That includes home-based
        soap, body butter, scrub, bath bomb, shampoo bar, lotion, balm,
        deodorant, and perfume makers selling at markets, online, or
        wholesale. The notification is generally expected within 10 days of
        first sale in Canada. Always verify the current rule on the Health
        Canada website before submitting.
      </p>
    ),
  },
  {
    heading: "What information to prepare before you start",
    body: (
      <p>
        Most of the work happens before you ever open the portal. The cleanest
        submissions come from makers who have already organized their company
        details, product identity, and ingredient list in one place.
      </p>
    ),
    bullets: [
      "Company legal name, mailing address, and contact details",
      "Product name and product category (for example, leave-on lotion or rinse-off cleanser)",
      "Intended use and product form description",
      "Full ingredient list using INCI names",
      "Ingredient percentages or concentration ranges",
      "Any restricted-ingredient concentrations and conditions of use",
      "Site of manufacture details if applicable",
    ],
  },
  {
    heading: "Where makers get stuck",
    body: (
      <p>
        The most common rework triggers are inconsistent INCI naming, missing
        percentages, fragrance components that are not broken out, and
        ingredients that fall under the Health Canada Cosmetic Ingredient
        Hotlist without the maker realizing it. Catching these before
        notification saves time and avoids back-and-forth with Health Canada.
      </p>
    ),
  },
  {
    heading: "How FormulaNorth helps with CNF preparation",
    body: (
      <>
        <p>
          FormulaNorth is a workspace for organizing the inputs to a Canadian
          cosmetic notification. The ingredient database gives you INCI names
          and hotlist context. The formula builder helps you keep ingredient
          percentages clean and reusable. The CNF preparation workflow walks
          through company, product, and ingredient information so you can
          enter it into the Health Canada portal with fewer surprises.
        </p>
        <p>
          FormulaNorth does not submit to Health Canada and does not guarantee
          acceptance. It is preparation support — you still review and submit
          through the official portal yourself.
        </p>
      </>
    ),
  },
];

const faqs: SeoGuideFaq[] = [
  {
    question: "Is there a fee to file a CNF in Canada?",
    answer:
      "Health Canada does not charge a fee for cosmetic notification filings. The form is submitted online through Health Canada's cosmetic notification system at no cost.",
  },
  {
    question: "Do home-based soap or skincare makers need to file a CNF?",
    answer:
      "If you are selling cosmetic products in Canada — including handmade soap, body butter, lotion, scrub, bath bombs, balms, or perfume — you are generally expected to notify Health Canada. Always confirm against the current Health Canada guidance for your specific product.",
  },
  {
    question: "When does a CNF need to be filed?",
    answer:
      "Health Canada generally expects notification within 10 days of the product first being sold in Canada. If formula or labelling information changes materially, the notification should be updated.",
  },
  {
    question: "Does FormulaNorth submit my CNF directly to Health Canada?",
    answer:
      "No. FormulaNorth helps you prepare and organize the information you need. Submission goes through the official Health Canada cosmetic notification system.",
  },
  {
    question: "Does filing a CNF mean my product is approved?",
    answer:
      "No. Cosmetic notification is not an approval. The maker is responsible for product safety, labelling, and compliance with the Cosmetic Regulations and Cosmetic Ingredient Hotlist.",
  },
];

export const metadata = buildSeoGuideMetadata({ title, description, pathname });

export default function CosmeticNotificationFormCanadaPage() {
  return (
    <SeoGuide
      eyebrow="Health Canada"
      title={title}
      description={description}
      pathname={pathname}
      datePublished="2026-04-27"
      dateModified="2026-04-27"
      lastReviewed={lastReviewed}
      breadcrumbs={[{ label: "Cosmetic Notification Form Canada" }]}
      intro={
        <>
          <p>
            The Cosmetic Notification Form (CNF) is how Health Canada is
            informed about cosmetic products sold in Canada. This guide
            explains what the form is, who is expected to file it, what
            information to gather first, and how to keep your prep organized
            so the actual submission takes less time.
          </p>
          <p>
            FormulaNorth is built to help with that preparation work. It is
            not legal or regulatory advice and does not replace Health Canada
            guidance.
          </p>
        </>
      }
      sections={sections}
      faqs={faqs}
      primaryCta={{
        label: "Browse the ingredient database",
        href: "/ingredients",
        description:
          "Start your CNF prep with structured INCI lookup and hotlist context",
      }}
      relatedLinks={[
        {
          label: "Cosmetic label requirements in Canada",
          href: "/cosmetic-label-requirements-canada",
          description:
            "Bilingual label content, INCI lists, and warnings to plan alongside your CNF.",
        },
        {
          label: "Health Canada Cosmetic Ingredient Hotlist",
          href: "/health-canada-cosmetic-hotlist",
          description:
            "What the hotlist is, how it affects your formula, and how to spot restricted ingredients early.",
        },
        {
          label: "Ingredient database",
          href: "/ingredients",
          description:
            "Search by INCI name, function, and Canadian supplier availability.",
        },
        {
          label: "Canadian cosmetic ingredient suppliers",
          href: "/suppliers",
          description: "Directory of Canadian suppliers with location and catalog links.",
        },
      ]}
    />
  );
}
