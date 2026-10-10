# Issue #13: Institutional Credit Audit Log & Admin Manual Adjustment

- **Difficulty**: Hard
- **Priority**: High
- **Category**: Full-Stack / Auditability
- **Estimated Effort**: 6-8 hours
- **Skills Required**: Node.js, Express, Mongoose Transactions, React
- **Suggested Labels**: `hard`, `full-stack`, `security`

---

## Problem Statement

Credits are currently awarded automatically when a course is completed. However, administrators lack the ability to manually award bonus credits (e.g. for external workshops, conferences, or publications) or revoke improperly awarded credits with a clear audit trail.

---

## Evidence & Source Paths

- Backend Controller: `backend/controllers/creditController.js`
- Backend Model: `backend/models/Credit.js`
- Frontend Page: `frontend/src/pages/admin/CreditManagement.jsx`

---

## Proposed Scope

- Enhance `backend/models/Credit.js` schema to include `type` (`auto_course`, `admin_bonus`, `admin_adjustment`), `issuedBy` (user reference), and `reason` string.
- Implement backend endpoint `POST /api/credits/admin/adjust` (protect + admin):
  - Accepts `facultyId`, `creditsEarned` (positive or negative), and `reason`.
  - Atomically creates credit ledger entry.
- Replace placeholder in `frontend/src/pages/admin/CreditManagement.jsx`:
  - Credit ledger audit table listing all credit transactions across the platform.
  - "Issue Bonus Credits / Adjustment" modal with faculty dropdown and justification field.

---

## Out of Scope

- Integrating with external university ERP systems.

---

## Acceptance Criteria

- [ ] Admin can manually award or deduct credits with an explicit justification.
- [ ] Manual adjustments appear in the faculty member's credit history (`/credits`).
- [ ] Credit history cannot be deleted or mutated directly (append-only ledger).
- [ ] `npm test` passes in `backend/` and `npm run build` passes in `frontend/`.

---

## Required Tests

- Test `POST /api/credits/admin/adjust` with positive and negative credit values.
- Verify faculty credits total sum is updated correctly.

---

## Dependencies

None.

---

## Manual Verification Steps

1. Log in as admin (`admin@example.com` / `admin123`).
2. Open `http://localhost:5173/admin/credits`.
3. Issue 2 bonus credits to a faculty member with reason "Workshop Speaker".
4. Log in as faculty and check `/credits` page.
