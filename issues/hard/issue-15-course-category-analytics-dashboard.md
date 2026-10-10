# Issue #15: Platform Analytics Dashboard & Metrics Aggregation

- **Difficulty**: Hard
- **Priority**: High
- **Category**: Full-Stack / Business Intelligence
- **Estimated Effort**: 7-9 hours
- **Skills Required**: MongoDB Aggregation Pipeline, Express, React, Data Visualization
- **Suggested Labels**: `hard`, `full-stack`, `dashboard`

---

## Problem Statement

The admin dashboard (`frontend/src/pages/admin/AdminDashboard.jsx`) is currently a placeholder. Administrators need high-level institutional metrics: total faculty count, total active courses, overall completion rate, credits awarded per department, and course engagement by category.

---

## Evidence & Source Paths

- Backend Route: `backend/routes/facultyRoutes.js` / analytics routes
- Frontend Page: `frontend/src/pages/admin/AdminDashboard.jsx`

---

## Proposed Scope

- Implement backend endpoint `GET /api/admin/stats` (protect + admin):
  - Uses MongoDB `$facet` / aggregation pipelines to compute:
    - Total faculty members & active percentage.
    - Total courses (published vs draft).
    - Total enrollments & completion percentage.
    - Department-wise credit distribution.
    - Category-wise enrollment breakdown.
- Replace placeholder in `frontend/src/pages/admin/AdminDashboard.jsx`:
  - Metrics cards (Faculty, Courses, Enrollments, Credits).
  - Department credit breakdown bar charts / progress bars.
  - Category engagement breakdown.

---

## Out of Scope

- Integrating external charting libraries if lightweight SVG / Tailwind bars suffice.

---

## Acceptance Criteria

- [ ] `GET /api/admin/stats` calculates accurate real-time aggregates from MongoDB.
- [ ] Admin Dashboard renders metrics cards and department breakdown.
- [ ] Data updates dynamically when enrollments or courses are added.
- [ ] `npm test` passes in `backend/` and `npm run build` passes in `frontend/`.

---

## Required Tests

- Test `GET /api/admin/stats` aggregation output against seed data counts.

---

## Dependencies

None.

---

## Manual Verification Steps

1. Log in as admin (`admin@example.com` / `admin123`).
2. Open `http://localhost:5173/admin/dashboard`.
3. Verify metric card totals match current database contents.
