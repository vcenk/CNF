"use client";

import { useMemo, useState } from "react";
import { ProductDraft, productCategories, ValidationIssue } from "@/domain/cnf";
import { validateDraft } from "@/services/validation-engine";
import styles from "./intake-form.module.css";

type DraftField = keyof Pick<
  ProductDraft,
  "companyName" | "name" | "category" | "usageType" | "description"
>;

function createEmptyDraft(): ProductDraft {
  return {
    id: crypto.randomUUID(),
    companyName: "",
    name: "",
    category: undefined,
    usageType: undefined,
    description: "",
    ingredients: [],
    validationIssues: [],
    exportReady: false
  };
}

export function IntakeForm() {
  const [draft, setDraft] = useState<ProductDraft>(createEmptyDraft);
  const [ingredientInput, setIngredientInput] = useState("");
  const [hasSaved, setHasSaved] = useState(false);

  const validationIssues = useMemo(() => validateDraft(draft), [draft]);
  const errorCount = validationIssues.filter((issue) => issue.severity === "error").length;
  const warningCount = validationIssues.filter((issue) => issue.severity === "warning").length;
  const exportReady = errorCount === 0 && warningCount === 0;

  function updateField(field: DraftField, value: string) {
    setDraft((current) => ({
      ...current,
      [field]: value || undefined,
      validationIssues,
      exportReady
    }));
  }

  function updateDescription(value: string) {
    setDraft((current) => ({
      ...current,
      description: value,
      validationIssues,
      exportReady
    }));
  }

  function addIngredient() {
    const trimmed = ingredientInput.trim();

    if (!trimmed) {
      return;
    }

    setDraft((current) => ({
      ...current,
      ingredients: [
        ...current.ingredients,
        {
          id: crypto.randomUUID(),
          inciName: trimmed,
          aiSuggested: false
        }
      ],
      validationIssues,
      exportReady
    }));
    setIngredientInput("");
  }

  function removeIngredient(id: string) {
    setDraft((current) => ({
      ...current,
      ingredients: current.ingredients.filter((ingredient) => ingredient.id !== id),
      validationIssues,
      exportReady
    }));
  }

  function saveDraft() {
    setDraft((current) => ({
      ...current,
      validationIssues,
      exportReady
    }));
    setHasSaved(true);
  }

  const issueGroups = validationIssues.reduce<Record<string, ValidationIssue[]>>((groups, issue) => {
    const existing = groups[issue.field] ?? [];
    groups[issue.field] = [...existing, issue];
    return groups;
  }, {});

  return (
    <div className={styles.layout}>
      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.eyebrow}>Step 01</p>
            <h1 className={styles.heading}>Build a submission-ready product draft.</h1>
          </div>
          <button type="button" className={styles.saveButton} onClick={saveDraft}>
            Save draft snapshot
          </button>
        </div>

        <div className={styles.fieldGrid}>
          <label className={styles.field}>
            <span>Company name</span>
            <input
              value={draft.companyName}
              onChange={(event) => updateField("companyName", event.target.value)}
              placeholder="Northern Coast Formulations"
            />
            <FieldIssues issues={issueGroups.companyName} />
          </label>

          <label className={styles.field}>
            <span>Product name</span>
            <input
              value={draft.name}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="Sea fennel hydration mist"
            />
            <FieldIssues issues={issueGroups.name} />
          </label>

          <label className={styles.field}>
            <span>Category</span>
            <select
              value={draft.category ?? ""}
              onChange={(event) => updateField("category", event.target.value)}
            >
              <option value="">Select category</option>
              {productCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <FieldIssues issues={issueGroups.category} />
          </label>

          <label className={styles.field}>
            <span>Usage type</span>
            <select
              value={draft.usageType ?? ""}
              onChange={(event) => updateField("usageType", event.target.value)}
            >
              <option value="">Select usage</option>
              <option value="rinse-off">Rinse-off</option>
              <option value="leave-on">Leave-on</option>
            </select>
            <FieldIssues issues={issueGroups.usageType} />
          </label>
        </div>

        <label className={styles.field}>
          <span>Plain-language product description</span>
          <textarea
            value={draft.description}
            onChange={(event) => updateDescription(event.target.value)}
            rows={6}
            placeholder="Describe the product, its intended use, hero ingredients, and anything that might help the AI map it to CNF fields."
          />
          <FieldIssues issues={issueGroups.description} />
        </label>

        <div className={styles.ingredientsBlock}>
          <div className={styles.ingredientsHeader}>
            <div>
              <span className={styles.blockTitle}>Ingredients</span>
              <p className={styles.blockCopy}>
                Start capturing INCI ingredients now. This is the first step toward validation and
                future export readiness.
              </p>
            </div>
            <div className={styles.ingredientComposer}>
              <input
                value={ingredientInput}
                onChange={(event) => setIngredientInput(event.target.value)}
                placeholder="Add an INCI ingredient"
              />
              <button type="button" onClick={addIngredient}>
                Add
              </button>
            </div>
          </div>
          <FieldIssues issues={issueGroups.ingredients} />
          <ul className={styles.ingredientList}>
            {draft.ingredients.map((ingredient) => (
              <li key={ingredient.id}>
                <span>{ingredient.inciName}</span>
                <button type="button" onClick={() => removeIngredient(ingredient.id)}>
                  Remove
                </button>
              </li>
            ))}
            {draft.ingredients.length === 0 ? (
              <li className={styles.emptyState}>No ingredients added yet.</li>
            ) : null}
          </ul>
        </div>
      </section>

      <aside className={styles.sidebar}>
        <section className={styles.statusCard}>
          <p className={styles.eyebrow}>Validation status</p>
          <h2>{exportReady ? "Draft is export-ready" : "Draft still needs work"}</h2>
          <p className={styles.statusCopy}>
            {exportReady
              ? "This draft has no blocking issues and is ready for the future export pipeline."
              : "Use this checklist to drive the first vertical slice from intake toward CNF readiness."}
          </p>
          <div className={styles.metrics}>
            <div>
              <strong>{errorCount}</strong>
              <span>Errors</span>
            </div>
            <div>
              <strong>{warningCount}</strong>
              <span>Warnings</span>
            </div>
            <div>
              <strong>{draft.ingredients.length}</strong>
              <span>Ingredients</span>
            </div>
          </div>
        </section>

        <section className={styles.statusCard}>
          <p className={styles.eyebrow}>Draft snapshot</p>
          <dl className={styles.snapshot}>
            <div>
              <dt>Company</dt>
              <dd>{draft.companyName || "Not set"}</dd>
            </div>
            <div>
              <dt>Product</dt>
              <dd>{draft.name || "Not set"}</dd>
            </div>
            <div>
              <dt>Category</dt>
              <dd>{draft.category || "Not set"}</dd>
            </div>
            <div>
              <dt>Usage</dt>
              <dd>{draft.usageType || "Not set"}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{hasSaved ? "Snapshot saved locally" : "Not saved yet"}</dd>
            </div>
          </dl>
        </section>

        <section className={styles.statusCard}>
          <p className={styles.eyebrow}>Next engineering step</p>
          <ul className={styles.checklist}>
            {validationIssues.map((issue) => (
              <li key={issue.code}>
                <strong>{issue.field}</strong>
                <span>{issue.message}</span>
              </li>
            ))}
            {validationIssues.length === 0 ? (
              <li>
                <strong>Ready</strong>
                <span>Connect this draft to persistence and the export boundary next.</span>
              </li>
            ) : null}
          </ul>
        </section>
      </aside>
    </div>
  );
}

function FieldIssues({ issues }: { issues?: ValidationIssue[] }) {
  if (!issues?.length) {
    return null;
  }

  return (
    <ul className={styles.issueList}>
      {issues.map((issue) => (
        <li key={issue.code} data-severity={issue.severity}>
          {issue.message}
        </li>
      ))}
    </ul>
  );
}
