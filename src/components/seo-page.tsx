import Link from "next/link";
import styles from "./seo-page.module.css";

export type SeoFaq = {
  question: string;
  answer: string;
};

export type SeoSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

type SeoPageProps = {
  eyebrow: string;
  title: string;
  summary: string;
  primaryKeyword: string;
  sections: SeoSection[];
  faqs: SeoFaq[];
  relatedLinks: Array<{ href: string; label: string; description: string }>;
  cta: { href: string; label: string };
};

export function SeoPage({
  eyebrow,
  title,
  summary,
  primaryKeyword,
  sections,
  faqs,
  relatedLinks,
  cta
}: SeoPageProps) {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.summary}>{summary}</p>
        <div className={styles.heroMeta}>
          <span>Primary keyword: {primaryKeyword}</span>
          <span>Static page for search visibility</span>
        </div>
        <Link href={cta.href} className={styles.primaryAction}>
          {cta.label}
        </Link>
      </section>

      <section className={styles.content}>
        <div className={styles.mainColumn}>
          {sections.map((section) => (
            <section key={section.title} className={styles.section}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets ? (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          <section className={styles.section}>
            <h2>Frequently asked questions</h2>
            <div className={styles.faqs}>
              {faqs.map((faq) => (
                <article key={faq.question} className={styles.faq}>
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className={styles.sidebar}>
          <section className={styles.sideCard}>
            <p className={styles.sideLabel}>Related pages</p>
            <div className={styles.relatedLinks}>
              {relatedLinks.map((link) => (
                <Link key={link.href} href={link.href} className={styles.relatedLink}>
                  <strong>{link.label}</strong>
                  <span>{link.description}</span>
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </section>
    </main>
  );
}

