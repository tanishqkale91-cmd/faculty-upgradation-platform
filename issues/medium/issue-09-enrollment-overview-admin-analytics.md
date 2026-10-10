# Issue #9: Admin Enrollment Overview & Filterable Directory

- **Difficulty**: Medium
- **Priority**: Medium
- **Category**: Full-Stack / Admin Analytics
- **Estimated Effort**: 4-5 hours
- **Skills Required**: Node.js, Mongoose Population, React, Axios
- **Suggested Labels**: `medium`, `full-stack`, `admin`

---

## Problem Statement

The page `frontend/src/pages/admin/EnrollmentOverview.jsx` is currently a placeholder. Administrators require a centralized view of all course enrollments across the institution to monitor faculty progress, completion rates, and active courses.

---

## Evidence & Source Paths

- Backend Controller: `backend/controllers/enrollmentController.js`
- Frontend Page: `frontend/src/pages/admin/EnrollmentOverview.jsx`

---

## Proposed Scope

- Implement backend endpoint `GET /api/enrollments/admin/all` (protect + admin):
  - Populates faculty (`name`, `email`, `department`) and course (`title`, `credits`, `category`).
  - Supports filtering by status (`enrolled`, `in-progress`, `completed`, `dropped`).
- Replace placeholder in `frontend/src/pages/admin/EnrollmentOverview.jsx`:
  - Summary stats banner (Total Enrollments, In-Progress, Completed, Total Credits Awarded).
  - Searchable and filterable enrollments data table.

---

## Out of Scope

- Exporting report data to CSV/Excel (save for hard tier issue).

---

## Acceptance Criteria

- [ ] Admin can view all enrollments across all faculty members.
- [ ] Status filter correctly filters table by `enrolled`, `in-progress`, or `completed`.
- [ ] Summary statistics display correct aggregate counts.
- [ ] `npm run lint` and `npm run build` pass in `frontend/`.

---

## Required Tests

- Test `GET /api/enrollments/admin/all` with admin JWT.
- Verify status filter logic in UI table.

---

## Dependencies

None.

---

## Manual Verification Steps

1. Log in as admin (`admin@example.com` / `admin123`).
2. Open `http://localhost:5173/admin/enrollments`.
3. Test search and status filter options.
