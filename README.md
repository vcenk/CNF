# CNF Builder

CNF Builder is an AI-assisted submission workflow for Health Canada Cosmetic Notification Forms. This repository is scaffolded around three product pillars from the PRD:

- AI-assisted product and ingredient entry
- Structured CNF storage and validation
- `.hcxs` export for portal upload

## Stack

- Next.js App Router
- TypeScript
- CSS modules and global CSS
- Domain-first folder structure for AI, validation, and export modules

## Getting started

1. Install dependencies with `npm install`
2. Run the app with `npm run dev`
3. Open `http://localhost:3000`

## Repository shape

- `docs/prd/`: implementation brief derived from the project plan
- `docs/architecture/`: system boundaries and delivery guidance
- `src/app/`: app routes and top-level UI
- `src/components/`: shared presentation components
- `src/domain/`: typed CNF models and state contracts
- `src/features/`: workflow-oriented modules
- `src/services/`: AI, validation, export, and persistence interfaces
- `tests/`: placeholders for unit, integration, and e2e tests

## Recommended first vertical slice

Build a product intake draft flow that:

1. Collects company and product basics
2. Saves a normalized draft
3. Runs draft validation
4. Shows export readiness for a future `.hcxs` generator

