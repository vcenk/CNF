import {
  SeoGuide,
  buildSeoGuideMetadata,
  type SeoGuideFaq,
  type SeoGuideSection,
} from "@/components/marketing/seo-guide";
import { FragranceAllergenAlert } from "@/components/marketing/fragrance-allergen-alert";

const pathname = "/cosmetic-notification-form-canada";
const title = "Cosmetic Notification Form (CNF) Canada — A Practical Guide";
const description =
  "What the Health Canada Cosmetic Notification Form is, who has to file it, what information you need to gather, and how to prepare your submission with less rework.";
const lastReviewed = "September 14, 2026";

const sections: SeoGuideSection[] = [
  {
    heading: "What the Cosmetic Notification Form is",
    body: (
      <>
        <p>
          The Cosmetic Notification Form (CNF) is the mandatory filing Health
          Canada expects from anyone who manufactures or imports a cosmetic
          product for sale in Canada. It is required under the Food and Drugs
          Act and the Cosmetic Regulations, and it applies to virtually every
          cosmetic product sold on the Canadian market — from handmade cold
          process soap to professionally formulated serums.
        </p>
        <p>
          The CNF collects company identity, product identity, intended use,
          and a full ingredient list with concentrations. Health Canada uses
          this information to monitor what cosmetic products and ingredients
          are on the Canadian market, and to follow up quickly when a safety
          concern arises.
        </p>
        <p>
          Filing a CNF does not certify or pre-approve a product. It is a
          notification, not a product licence. Health Canada does not review
          and approve each filing before the product goes on sale. The
          manufacturer or importer remains fully responsible for ensuring the
          product is safe, properly labelled, and compliant with the Cosmetic
          Regulations and the Cosmetic Ingredient Hotlist.
        </p>
      </>
    ),
  },
  {
    heading: "Who needs to file a CNF",
    body: (
      <>
        <p>
          The obligation applies to the manufacturer or importer of a cosmetic
          product first sold in Canada. For indie makers who formulate and sell
          their own products, that means you — regardless of how small your
          operation is, whether you sell online or at markets, and whether you
          are incorporated or operating as a sole proprietor.
        </p>
        <p>
          Product types that require CNF notification include: bar soap, liquid
          soap, shampoo bars, body wash, body lotion, body butter, face serum,
          moisturizer, toner, face wash, scrub, bath bomb, bath salts, lip
          balm, lip gloss, deodorant, solid perfume, eau de parfum, hair
          conditioner, hair mask, and any other product intended to be applied
          to the body for cleansing, conditioning, or aesthetic effect.
        </p>
        <p>
          Products making therapeutic claims — treating eczema, killing
          bacteria, relieving inflammation — may be regulated as Natural Health
          Products or Drugs instead of cosmetics, which involves a different
          and more complex regulatory pathway. Most indie makers deliberately
          avoid therapeutic claims to remain in the cosmetic framework.
        </p>
      </>
    ),
  },
  {
    heading: "When the CNF must be filed",
    body: (
      <>
        <p>
          Health Canada generally expects the CNF to be filed within 10 days
          of the product&apos;s first sale as a cosmetic in Canada. &quot;First
          sale&quot; includes selling at a farmers market, craft fair, pop-up
          shop, or online — any transaction where a Canadian consumer purchases
          the product.
        </p>
        <p>
          In practice, this means the CNF information needs to be ready before
          you make your first sale, not after. You cannot finalize percentages,
          INCI names, and product classification after the fact with the
          accuracy that a correct filing requires. Treat CNF preparation as
          part of formula finalization — not as an administrative step you do
          after launch.
        </p>
        <p>
          If the formula changes materially after the initial notification —
          new ingredients, significant concentration changes, change of
          function — the CNF should be updated. A label reprint that changes
          the INCI list is usually a signal that the CNF needs updating too.
        </p>
      </>
    ),
  },
  {
    heading: "What information to prepare before you start",
    body: (
      <p>
        Most of the work in a CNF happens before you ever open the Health
        Canada portal. Makers who have their information organized in advance
        complete submissions faster and with fewer errors. The portal will ask
        for three categories of information: company details, product details,
        and ingredient details.
      </p>
    ),
    bullets: [
      "Company legal name, business address, and contact information (phone and email)",
      "Role: manufacturer, importer, or both",
      "Product name as it appears on the label",
      "Product category — for example, leave-on skin care, rinse-off hair care, bar soap",
      "Product form — cream, lotion, gel, bar, powder, spray",
      "Intended use and area of application (face, body, hair, lips)",
      "Full ingredient list using INCI names in descending order of concentration",
      "Percentage or concentration range for each ingredient",
      "For restricted ingredients: the specific condition of use and concentration limit",
      "Site of manufacture — address where the product is made",
      "Label text or a representative label sample",
    ],
  },
  {
    heading: "INCI names and concentrations — the most common problem area",
    body: (
      <>
        <p>
          The ingredient section of the CNF is where most rework happens. Every
          ingredient must be listed by its INCI (International Nomenclature of
          Cosmetic Ingredients) name — the standardized Latin-based name used
          on Canadian cosmetic labels. Using a common name, trade name, or
          supplier blend name instead of the INCI name is one of the most
          frequent filing errors.
        </p>
        <p>
          Each ingredient also needs a concentration or concentration range.
          &quot;Trace amount&quot; or &quot;QS&quot; is not sufficient for the
          CNF. For most indie makers, this means having a working formula with
          accurate percentages — not a recipe expressed in grams or ounces
          without a percentage column.
        </p>
        <p>
          Blended ingredients require special attention. Botanical extracts and
          multi-component functional blends generally need their component
          ingredients entered rather than only a supplier trade name. Fragrance
          and flavour ingredients have specific grouping rules, but fragrance
          allergens above the disclosure threshold must still be entered
          separately. Ask the supplier for enough composition documentation to
          complete the CNF accurately.
        </p>
        <p>
          Soap made by saponifying oils needs particular care because the final
          material differs from the starting oils and alkali. Do not infer the
          filing names from a recipe label alone. Validate each ingredient in
          the current CNF ingredient search and keep supplier and manufacturing
          records that support the names and concentrations you enter.
        </p>
      </>
    ),
  },
  {
    heading: "Fragrance components and allergen disclosure",
    body: (
      <>
        <p>
          The CNF permits most fragrance ingredients to be grouped under
          &quot;fragrance&quot; or &quot;parfum&quot;. However, fragrance
          allergens above the disclosure threshold must be entered separately,
          even when they are part of a fragrance blend, essential oil, or
          botanical extract. Ask your supplier for the composition information
          needed to calculate those finished-product concentrations.
        </p>
        <p>
          Since April 12, 2026, Health Canada also requires that specific fragrance
          allergens be disclosed individually on the label when present above
          the threshold — 0.001% in leave-on products, 0.01% in rinse-off
          products. The allergen list expanded to 81 substances for new
          products starting August 1, 2026. Any product with essential oils or
          fragrance blends needs a full allergen review before labelling can be
          finalized and the CNF prepared accurately.
        </p>
        <p>
          Common essential oils used in soap and skincare — lavender, lemongrass,
          rose, clary sage, bergamot, ylang ylang — contain multiple regulated
          allergens. Linalool and Linalool Hydroperoxides (found in lavender),
          Limonene (in most citrus oils), and Citral (in lemongrass, lemon
          myrtle) are among the most frequently encountered allergens that now
          require individual label disclosure in Canada.
        </p>
      </>
    ),
  },
  {
    heading: "Hotlist compliance before filing",
    body: (
      <>
        <p>
          The Health Canada Cosmetic Ingredient Hotlist lists substances
          prohibited from use in Canadian cosmetics, and substances permitted
          only under specific conditions — restricted concentrations, particular
          product types, or mandatory warnings. Every ingredient in your formula
          should be checked against the current Hotlist before you file.
        </p>
        <p>
          For restricted ingredients, the CNF must include the concentration
          used and the condition of use that the formula complies with.
          Submitting a restricted ingredient without noting its concentration
          and applicable restriction is an incomplete filing.
        </p>
        <p>
          The Hotlist is updated periodically. An ingredient that was compliant
          when you first formulated a product may have had its status changed.
          If you have products on the market that have not had a Hotlist review
          in the past year, it is worth checking before your next sale or
          before updating your CNF.
        </p>
      </>
    ),
  },
  {
    heading: "How to file the CNF with Health Canada",
    body: (
      <>
        <p>
          CNF submissions go through the Health Canada Cosmetic Notification
          System, accessed via the Canada.ca website. You will need a
          My CFIA / Health Canada online account or an HC Portal account to
          log in and submit. The system is web-based — no software installation
          required.
        </p>
        <p>
          The portal walks through company information, then product
          information, then the ingredient list. The ingredient section is the
          most time-consuming part. Having your full ingredient list with INCI
          names and percentages in a spreadsheet or formulation tool before you
          start makes this significantly faster — you are copying in organized
          data rather than looking things up mid-session.
        </p>
        <p>
          After submission, Health Canada may contact you with questions or
          requests for clarification. This is more common when ingredient
          information is incomplete or when a restricted ingredient is listed
          without its applicable condition. A clean, complete first submission
          typically does not generate follow-up.
        </p>
      </>
    ),
  },
  {
    heading: "What happens after you file",
    body: (
      <>
        <p>
          Health Canada does not send a formal approval letter after a CNF
          filing. You will receive a confirmation that the notification was
          received. The product can remain on sale — again, the CNF is a
          notification, not a prerequisite approval.
        </p>
        <p>
          Keep a copy of your CNF submission and all supporting information
          (the formula version used, the label version, supplier COAs for that
          batch) in your records. If Health Canada ever follows up on a product
          safety matter, your filing records and source documentation are what
          you will need to produce.
        </p>
        <p>
          If you reformulate a product significantly — change an ingredient,
          adjust a concentration that moves it across a Hotlist threshold, or
          change the product type — update the CNF for that product. A new
          product with a different name or formula is a new CNF, not an update
          to an existing one.
        </p>
      </>
    ),
  },
  {
    heading: "Where makers get stuck",
    body: (
      <>
        <p>
          The most common reasons a CNF takes longer than it should:
        </p>
        <p>
          <strong>Incorrect INCI names.</strong> A supplier ingredient list
          using common names, trade names, or Latin botanical names that do not
          match the INCI standard requires research before each ingredient can
          be entered. Resolving INCI names at formulation time — not at CNF
          time — removes this bottleneck entirely.
        </p>
        <p>
          <strong>Missing percentages.</strong> A recipe in grams or ounces is
          not a CNF-ready formula. Converting batch weights to percentages is
          straightforward but adds time if you have not already done it.
        </p>
        <p>
          <strong>Fragrance allergens not calculated.</strong> The CNF permits
          fragrance ingredients to be grouped under fragrance or parfum, but
          regulated allergens above the applicable finished-product threshold
          must be entered separately. Ask the supplier for allergen composition
          data rather than assuming the fragrance line covers them.
        </p>
        <p>
          <strong>CNF left until after first sale.</strong> The 10-day window
          is short. Makers who treat CNF preparation as an afterthought
          routinely file late. Building CNF prep into the pre-launch checklist
          is the fix.
        </p>
      </>
    ),
  },
  {
    heading: "How FormulaNorth helps with CNF preparation",
    body: (
      <>
        <p>
          FormulaNorth is a workspace for organizing the inputs to a Canadian
          cosmetic CNF. The ingredient database gives INCI names and Hotlist
          context for each ingredient. The formula builder keeps ingredient
          percentages organized and reusable across product versions. The
          fragrance allergen calculator identifies which allergens require
          individual label disclosure and at what threshold.
        </p>
        <p>
          The CNF preparation workflow in FormulaNorth walks through company,
          product, and ingredient information so you can enter it into the
          Health Canada portal with fewer surprises. It exports a structured
          summary of your formula in the format the portal asks for.
        </p>
        <p>
          FormulaNorth does not submit to Health Canada and does not guarantee
          acceptance of any filing. It is preparation and organization support —
          you review and submit through the official Health Canada portal
          yourself.
        </p>
      </>
    ),
  },
];

const faqs: SeoGuideFaq[] = [
  {
    question: "Is there a fee to file a CNF in Canada?",
    answer:
      "Health Canada does not charge a fee for cosmetic notification filings. The form is submitted online through the Health Canada cosmetic notification system at no cost.",
  },
  {
    question: "Do home-based soap or skincare makers need to file a CNF?",
    answer:
      "If you are selling cosmetic products in Canada — including handmade soap, body butter, lotion, scrub, bath bombs, balms, or perfume — you are generally expected to notify Health Canada within 10 days of first sale. The obligation applies regardless of business size, venue, or sales channel. Always confirm against the current Health Canada guidance for your specific product.",
  },
  {
    question: "When does a CNF need to be filed?",
    answer:
      "Health Canada generally expects notification within 10 days of the product first being sold in Canada. If formula or labelling information changes materially after the initial filing, the notification should be updated.",
  },
  {
    question: "Does FormulaNorth submit my CNF directly to Health Canada?",
    answer:
      "No. FormulaNorth helps you prepare and organize the information you need. Submission goes through the official Health Canada cosmetic notification system.",
  },
  {
    question: "Does filing a CNF mean my product is approved?",
    answer:
      "No. Cosmetic notification is not an approval. Health Canada does not pre-approve cosmetic products for sale. The maker is responsible for product safety, labelling, and compliance with the Cosmetic Regulations and Cosmetic Ingredient Hotlist.",
  },
  {
    question: "Do I need a separate CNF for each product?",
    answer:
      "Each distinct product with its own formula generally requires its own CNF. A body lotion and a face serum are two separate notifications. Products with identical formulas sold under different names may be handled differently — review current Health Canada guidance for your specific situation.",
  },
  {
    question: "How should saponified soap ingredients be entered?",
    answer:
      "Saponification changes the identity of the starting oils and alkali, so do not guess filing names from the recipe alone. Validate each entry in Health Canada's current CNF ingredient search and retain supplier and manufacturing records that support the ingredient names and concentrations you submit.",
  },
  {
    question: "What information do I need from a fragrance supplier?",
    answer:
      "Ask for documentation that identifies regulated fragrance allergens and their concentration in the supplied blend. You need that information to calculate whether each allergen exceeds the threshold in the finished cosmetic. Most other fragrance ingredients may be grouped under fragrance or parfum under the current CNF rules.",
  },
  {
    question: "Do I need to update my CNF if I change a formula?",
    answer:
      "If the formula changes materially — a new ingredient added, a concentration changed significantly, or a restricted ingredient's usage condition changed — the CNF should be updated to reflect the current formula. A new product name or product type is a new CNF, not an update.",
  },
  {
    question: "What is the Health Canada Cosmetic Ingredient Hotlist?",
    answer:
      "The Cosmetic Ingredient Hotlist is a list maintained by Health Canada of substances prohibited or restricted in Canadian cosmetics. Prohibited substances cannot be used at all. Restricted substances can only be used under specific conditions — defined concentrations, product types, or required warnings. All ingredients in a formula should be checked against the current Hotlist before filing a CNF.",
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
      dateModified="2026-09-14"
      lastReviewed={lastReviewed}
      sources={[
        {
          label: "Notification of Cosmetics: Guide for Cosmetic Notifications",
          href: "https://www.canada.ca/en/health-canada/services/consumer-product-safety/cosmetics/notification-cosmetics/guide.html",
          publisher: "Health Canada",
          note: "Filing deadlines, amendments, ingredient entry, concentration ranges, and fragrance allergens.",
        },
        {
          label: "Cosmetic Regulations, C.R.C., c. 869",
          href: "https://laws-lois.justice.gc.ca/eng/regulations/C.R.C.,_c._869/",
          publisher: "Justice Laws Website, Government of Canada",
          note: "Controlling regulatory text, including section 30 notification requirements.",
        },
        {
          label: "Cosmetic Ingredient Hotlist",
          href: "https://www.canada.ca/en/health-canada/services/consumer-product-safety/cosmetics/cosmetic-ingredient-hotlist-prohibited-restricted-ingredients.html",
          publisher: "Health Canada",
          note: "Current prohibited and restricted ingredient conditions.",
        },
      ]}
      breadcrumbs={[{ label: "Cosmetic Notification Form Canada" }]}
      intro={
        <>
          <p>
            The Cosmetic Notification Form (CNF) is how Health Canada is
            informed about cosmetic products sold in Canada. This guide
            explains what the form is, who is expected to file it, what
            information to gather first, how to handle INCI names and
            fragrance components, and how to keep your prep organized so
            the actual submission takes less time.
          </p>
          <p>
            FormulaNorth is built to help with that preparation work. It is
            not legal or regulatory advice and does not replace Health Canada
            guidance.
          </p>
          <FragranceAllergenAlert variant="compact" source="cnf-guide" />
        </>
      }
      sections={sections}
      faqs={faqs}
      primaryCta={{
        label: "Start CNF preparation",
        href: "/formulas",
        description:
          "Organize INCI names, percentages, and hotlist status in one place before you open the Health Canada portal",
      }}
      relatedLinks={[
        {
          label: "Health Canada Cosmetic Ingredient Hotlist",
          href: "/health-canada-cosmetic-hotlist",
          description:
            "What the Hotlist is, how it affects your formula, and how to spot restricted ingredients early.",
        },
        {
          label: "INCI name lookup Canada",
          href: "/inci-name-lookup-canada",
          description:
            "Find the correct INCI name for any cosmetic ingredient before building your CNF.",
        },
        {
          label: "Cosmetic label requirements in Canada",
          href: "/cosmetic-label-requirements-canada",
          description:
            "Bilingual label content, INCI lists, net quantity, and warnings to plan alongside your CNF.",
        },
        {
          label: "Starting a handmade skincare business in Canada",
          href: "/handmade-skincare-business-canada",
          description:
            "Full setup guide — registration, formulation, labelling, costing, and CNF in order.",
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
