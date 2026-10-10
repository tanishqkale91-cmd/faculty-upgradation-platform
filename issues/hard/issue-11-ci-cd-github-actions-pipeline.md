# Issue #11: GitHub Actions CI/CD Automated Workflow Pipeline

- **Difficulty**: Hard
- **Priority**: Critical
- **Category**: DevOps / CI/CD
- **Estimated Effort**: 6-8 hours
- **Skills Required**: GitHub Actions, YAML, Node.js, npm, MongoDB In-Memory Service
- **Suggested Labels**: `hard`, `devops`, `ci/cd`

---

## Problem Statement

The repository currently lacks an automated Continuous Integration (CI) pipeline. Pull requests are not automatically checked for syntax errors, build failures, or broken backend unit tests before merging.

---

## Evidence & Source Paths

- Repository Root: `.github/workflows/` (currently non-existent)
- Frontend Package: `frontend/package.json` (`npm run lint`, `npm run build`)
- Backend Package: `backend/package.json` (`npm test`)

---

## Proposed Scope

- Create `.github/workflows/ci.yml`.
- Configure automated matrix runner (Node `v18.x`, `v20.x`).
- Step 1: Checkout code & setup Node.js.
- Step 2: Install dependencies in both `frontend/` and `backend/`.
- Step 3: Run `npm run lint` and `npm run build` in `frontend/`.
- Step 4: Run `npm test` in `backend/` using a MongoDB service container or in-memory runner.
- Trigger pipeline on `push` to `main` and on `pull_request` to `main`.

---

## Out of Scope

- Production deployment to Render or Vercel (keep CI focused on verification).

---

## Acceptance Criteria

- [ ] `.github/workflows/ci.yml` added to repository.
- [ ] Pipeline runs frontend lint, frontend build, and backend unit tests.
- [ ] Failed tests or lint errors cause CI build to fail with exit code 1.
- [ ] Workflow passes cleanly on local action runners or GitHub test trigger.

---

## Required Tests

- Validate workflow syntax with `actionlint` or test run on a pull request branch.

---

## Dependencies

None.

---

## Manual Verification Steps

1. Create a branch and push a test commit.
2. Verify GitHub Actions workflow executes all steps and reports green status.
