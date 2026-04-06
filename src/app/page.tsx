import { ModuleCard } from "@/components/module-card";
import { MilestoneList } from "@/components/milestone-list";
import { firstSliceMilestones, productPillars } from "@/features/product-intake/intake-blueprint";
import { siteConfig } from "@/lib/site-config";
import styles from "./page.module.css";

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: siteConfig.description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    },
    featureList: [
      "AI-assisted cosmetic product entry",
      "Structured CNF draft validation",
      "Health Canada portal export preparation"
    ]
  };

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section className={styles.hero}>
        <p className={styles.kicker}>CNF Builder</p>
        <h1 className={styles.title}>A sharper starting point for AI-assisted cosmetic notifications.</h1>
        <p className={styles.summary}>
          CNF Builder helps cosmetic teams prepare Health Canada submissions faster with guided AI
          entry, structured validation, and a future-ready `.hcxs` export pipeline.
        </p>
        <div className={styles.heroMeta}>
          <span>Built for Health Canada cosmetic notification workflows</span>
          <span>AI-assisted intake with validation-first architecture</span>
        </div>
      </section>

      <section className={styles.sectionIntro} aria-labelledby="pillars-heading">
        <p className={styles.sectionLabel}>Product Pillars</p>
        <h2 id="pillars-heading" className={styles.sectionTitle}>
          Structured around the workflow that matters.
        </h2>
        <p className={styles.sectionCopy}>
          The frontend is intentionally organized around the three differentiators in the project
          plan so future pages, content, and search visibility all reinforce the same product story.
        </p>
      </section>

      <section className={styles.grid} aria-label="Product pillars">
        {productPillars.map((pillar) => (
          <ModuleCard key={pillar.name} pillar={pillar} />
        ))}
      </section>

      <section className={styles.roadmap} aria-labelledby="slice-heading">
        <div>
          <p className={styles.sectionLabel}>First Vertical Slice</p>
          <h2 id="slice-heading" className={styles.sectionTitle}>
            From product basics to export readiness.
          </h2>
          <p className={styles.sectionCopy}>
            The next meaningful feature is a product intake draft that can be saved, normalized, and
            validated before any export format is generated.
          </p>
        </div>
        <MilestoneList items={firstSliceMilestones} />
      </section>

      <section className={styles.seoBlock} aria-labelledby="seo-heading">
        <div>
          <p className={styles.sectionLabel}>Search Positioning</p>
          <h2 id="seo-heading" className={styles.sectionTitle}>
            Clear signals for what CNF Builder does.
          </h2>
        </div>
        <p className={styles.sectionCopy}>
          This foundation now exposes semantic headings, canonical metadata, indexable robots rules,
          a generated sitemap, and software structured data so the product can grow into a strong SEO
          footprint as feature pages are added.
        </p>
      </section>
    </main>
  );
}
