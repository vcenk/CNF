import styles from "./milestone-list.module.css";

type MilestoneListProps = {
  items: string[];
};

export function MilestoneList({ items }: MilestoneListProps) {
  return (
    <ol className={styles.list}>
      {items.map((item) => (
        <li key={item} className={styles.item}>
          {item}
        </li>
      ))}
    </ol>
  );
}

