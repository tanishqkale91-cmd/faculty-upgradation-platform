# Issue #4: CLI Options & Flags for Database Seed Script

- **Difficulty**: Easy
- **Priority**: Low
- **Category**: Backend / Developer Experience
- **Estimated Effort**: 2-3 hours
- **Skills Required**: Node.js, CLI argument parsing (`process.argv`), Mongoose
- **Suggested Labels**: `good first issue`, `backend`, `dx`

---

## Problem Statement

The seed script `backend/seed.js` currently executes a fixed seed routine. Developers often need flags to re-seed only courses (`--courses-only`), reset test users (`--reset-users`), or run in quiet mode (`--quiet`).

---

## Evidence & Source Paths

- Backend File: `backend/seed.js`
- Current behavior: Runs default seed sequentially without accepting command-line arguments.

---

## Proposed Scope

- Parse `process.argv` in `backend/seed.js`.
- Add `--courses-only`: skips user seeding and only seeds course catalog.
- Add `--users-only`: skips course seeding and only seeds test accounts.
- Add `--reset`: clears existing seed courses before recreating sample records (protected with confirmation check).
- Display a helpful `--help` output when requested.

---

## Out of Scope

- Running seed script automatically on production deployments.

---

## Acceptance Criteria

- [ ] Running `node seed.js --help` prints available options.
- [ ] Running `node seed.js --courses-only` seeds courses without touching user accounts.
- [ ] `npm test` passes in `backend/`.

---

## Required Tests

- Run `node seed.js --courses-only` and inspect database output.

---

## Dependencies

None.

---

## Manual Verification Steps

1. In `backend/`, run `node seed.js --help`.
2. Test each flag and verify console output.
