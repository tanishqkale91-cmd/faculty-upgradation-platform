# Issue #8: Admin Faculty Management View & Status Control

- **Difficulty**: Medium
- **Priority**: High
- **Category**: Full-Stack / Admin
- **Estimated Effort**: 5-6 hours
- **Skills Required**: Node.js, Express, React, Tailwind CSS
- **Suggested Labels**: `medium`, `full-stack`, `admin`

---

## Problem Statement

The admin page `frontend/src/pages/admin/FacultyManagement.jsx` is currently a placeholder component. Administrators need an interface to list registered faculty members, search by name or department, and activate or deactivate faculty accounts.

---

## Evidence & Source Paths

- Backend Controller: `backend/controllers/facultyController.js`
- Backend Route: `backend/routes/facultyRoutes.js`
- Frontend Page: `frontend/src/pages/admin/FacultyManagement.jsx`

---

## Proposed Scope

- Implement backend endpoint `GET /api/faculty/admin/list` (protect + admin) returning all faculty accounts.
- Implement backend endpoint `PUT /api/faculty/admin/:id/status` (protect + admin) to set `isActive: boolean`.
- Replace placeholder in `frontend/src/pages/admin/FacultyManagement.jsx` with a complete management view:
  - Faculty directory table (Name, Email, Department, Designation, Status, Actions).
  - Search input for filtering by name or department.
  - Activate / Deactivate account toggle with confirmation dialog.

---

## Out of Scope

- Deleting faculty accounts permanently (only soft-delete / deactivate via `isActive`).

---

## Acceptance Criteria

- [ ] Admin can view all registered faculty members.
- [ ] Deactivating a faculty member sets `isActive: false` in database.
- [ ] Deactivated faculty members are blocked from logging in (handled by existing `authMiddleware`).
- [ ] `npm test` passes in `backend/` and `npm run build` passes in `frontend/`.

---

## Required Tests

- Test `PUT /api/faculty/admin/:id/status` endpoint with admin JWT.
- Attempt logging in with deactivated faculty account and verify 401 response.

---

## Dependencies

None.

---

## Manual Verification Steps

1. Log in as admin (`admin@example.com` / `admin123`).
2. Open `http://localhost:5173/admin/faculty`.
3. Toggle status of a faculty member and verify effect.
