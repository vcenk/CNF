# CNF Builder Implementation Brief

## Product goal

CNF Builder reduces the work required to submit cosmetic notifications to Health Canada by turning freeform product details into validated CNF data and exportable portal payloads.

## Core product pillars

### 1. AI-assisted entry

- Accept plain-language product descriptions
- Suggest INCI names, concentration ranges, product category, and rinse or leave-on classification
- Flag likely hotlist or compliance concerns during entry

### 2. Structured storage

- Normalize user input into a stable CNF field map
- Persist drafts, company profiles, ingredients, variants, and validation status
- Support compliance and completeness checks before export

### 3. `.hcxs` export

- Generate a portal-ready file from validated CNF data
- Guide the user through upload, review, and declaration steps
- Treat export reliability as the key differentiator

## Primary entities

- Company profile
- Product draft
- Ingredient entry
- Variant
- Validation issue
- Export job

## Suggested delivery phases

### Phase 1

- Bootstrap app shell
- Draft data model
- Product intake form
- Basic validation summary

### Phase 2

- AI inline suggestion layer
- Ingredient normalization workflow
- Draft persistence

### Phase 3

- Compliance rules engine
- Export readiness gate
- `.hcxs` generator spike

### Phase 4

- Submission guidance UI
- History, amendments, and reusable profiles

## Non-goals for the first build

- Full reverse-engineered `.hcxs` fidelity on day one
- Batch import and migration tools
- Advanced analytics or billing

