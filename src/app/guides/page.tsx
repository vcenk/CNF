import type { Metadata } from "next";
import Link from "next/link";
import { marketingPages } from "@/lib/marketing-pages";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Browse CNF Builder guides covering Health Canada cosmetic notification workflows, submission preparation, and export planning."
};

export default function GuidesIndexPage() {
  const guidePages = marketingPages.filter((page) => page.href.startsWith("/guides/"));

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Guides</p>
        <h1 className={styles.title}>Search-friendly resources for cosmetic notification work.</h1>
        <p className={styles.summary}>
          This guide hub supports informational search intent and routes readers toward the core
          product pages and workflow entry points.
        </p>
      </section>

      <section className={styles.grid}>
        {guidePages.map((page) => (
          <Link key={page.href} href={page.href} className={styles.card}>
            <strong>{page.title}</strong>
            <span>{page.description}</span>
          </Link>
        ))}
      </section>
    </main>
  );
}

