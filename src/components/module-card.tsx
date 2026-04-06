import { ProductPillar } from "@/domain/cnf";
import styles from "./module-card.module.css";

type ModuleCardProps = {
  pillar: ProductPillar;
};

export function ModuleCard({ pillar }: ModuleCardProps) {
  return (
    <article className={styles.card}>
      <p className={styles.label}>{pillar.stage}</p>
      <h2 className={styles.title}>{pillar.name}</h2>
      <p className={styles.description}>{pillar.description}</p>
      <ul className={styles.list}>
        {pillar.outcomes.map((outcome) => (
          <li key={outcome}>{outcome}</li>
        ))}
      </ul>
    </article>
  );
}

