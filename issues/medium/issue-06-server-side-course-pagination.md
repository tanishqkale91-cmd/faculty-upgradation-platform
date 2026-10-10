# Issue #6: Server-Side Course Pagination & Page Controls

- **Difficulty**: Medium
- **Priority**: High
- **Category**: Full-Stack / Performance
- **Estimated Effort**: 4-6 hours
- **Skills Required**: Node.js, Express, MongoDB Mongoose (`skip`/`limit`), React
- **Suggested Labels**: `medium`, `full-stack`, `performance`

---

## Problem Statement

Currently, `GET /api/courses` returns all matching course records in a single query response. As the catalog grows to hundreds of courses, returning all records will degrade API performance and client rendering speed.

---

## Evidence & Source Paths

- Backend Controller: `backend/controllers/courseController.js` (`getCourses` function)
- Frontend Page: `frontend/src/pages/faculty/CourseBrowser.jsx`
- Frontend API helper: `frontend/src/api/courseApi.js`

---

## Proposed Scope

- Update `getCourses` in `backend/controllers/courseController.js`:
  - Accept `page` (default 1) and `limit` (default 9) query parameters.
  - Implement `.skip((page - 1) * limit).limit(limit)`.
  - Return pagination metadata in JSON response: `{ success: true, count, totalPages, currentPage, courses }`.
- Update `frontend/src/pages/faculty/CourseBrowser.jsx`:
  - Pass `page` and `limit` to `getCourses(params)`.
  - Add Pagination UI control bar (Previous, Next, Page X of Y buttons).

---

## Out of Scope

- Infinite scrolling (stick to clear page numbers UI).

---

## Acceptance Criteria

- [ ] `GET /api/courses?page=1&limit=6` returns exactly 6 courses with `totalPages` and `currentPage`.
- [ ] Frontend CourseBrowser renders pagination control buttons.
- [ ] Clicking "Next" loads page 2 courses from the server.
- [ ] `npm test` passes in `backend/` and `npm run build` passes in `frontend/`.

---

## Required Tests

- Test API with `page=1&limit=2` and verify response structure.
- Test UI page navigation buttons.

---

## Dependencies

None.

---

## Manual Verification Steps

1. Run `npm run seed` in backend to populate courses.
2. Open `http://localhost:5173/courses`.
3. Verify pagination controls render and navigate between course pages.
