# System Overview

## Architecture principles

- Keep regulatory logic out of UI components
- Treat AI output as suggestions that must be normalized and validated
- Design storage around explicit CNF entities rather than loose form blobs
- Make export generation a separate service boundary

## Proposed modules

### App shell

- Dashboard and intake routes
- Guided workflow navigation
- Progress and readiness surfaces

### Domain layer

- CNF draft schema
- Product and ingredient types
- Validation issue model
- Export readiness status

### AI assistant

- Prompt builders
- Streaming suggestion API
- Mapping from AI suggestions to normalized drafts

### Validation engine

- Required field checks
- Ingredient and category checks
- Submission readiness scoring

### Export engine

- Translate normalized CNF drafts into export payloads
- Encapsulate `.hcxs` generation details away from UI

### Persistence layer

- Draft repository
- Company profile repository
- Export job history

## First implementation target

The first working slice should prove this chain:

`product basics -> normalized draft -> validation summary`

That slice is the smallest useful foundation for AI-assisted intake and future export support.

