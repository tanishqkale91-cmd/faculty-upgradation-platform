# Issue #5: Unit Tests for Credit & Achievement Utility

- **Difficulty**: Easy
- **Priority**: Medium
- **Category**: Backend / Testing
- **Estimated Effort**: 3 hours
- **Skills Required**: Node.js, `node:test`, `node:assert`, Mongoose Mocking
- **Suggested Labels**: `good first issue`, `backend`, `testing`

---

## Problem Statement

The utility `backend/utils/creditCalculator.js` calculates credits earned and evaluates achievement rules when a course is completed. While basic model tests exist, unit tests specifically targeting the achievement logic rules are needed.

---

## Evidence & Source Paths

- Utility File: `backend/utils/creditCalculator.js`
- Test Directory: `backend/tests/`

---

## Proposed Scope

- Create `backend/tests/creditCalculator.test.js`.
- Write unit tests for `ACHIEVEMENT_RULES`:
  - Verify `first_course` rule fires when completed course count === 1.
  - Verify `five_courses` rule fires when completed course count === 5.
  - Verify `ten_courses` rule fires when completed course count === 10.
- Verify rules do not fire for non-matching counts (e.g. count === 2).

---

## Out of Scope

- Modifying existing achievement title definitions.

---

## Acceptance Criteria

- [ ] `backend/tests/creditCalculator.test.js` created.
- [ ] Tests cover all 3 achievement rule conditions.
- [ ] `npm test` passes cleanly in `backend/`.

---

## Required Tests

- Run `npm test` from `backend/` and verify all tests pass.

---

## Dependencies

None.

---

## Manual Verification Steps

1. In `backend/`, run `npm test`.
2. Ensure `creditCalculator.test.js` is executed and passes.
