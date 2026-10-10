# Issue #7: Faculty Profile Update API & UI Form Binding

- **Difficulty**: Medium
- **Priority**: Medium
- **Category**: Full-Stack / User Profile
- **Estimated Effort**: 4-5 hours
- **Skills Required**: Node.js, Express, Mongoose, React, Axios
- **Suggested Labels**: `medium`, `full-stack`, `user-profile`

---

## Problem Statement

The faculty profile page (`frontend/src/pages/faculty/Profile.jsx`) displays user details (name, email, department, designation), but editing and saving profile details is not yet connected to a backend endpoint.

---

## Evidence & Source Paths

- Backend Route: `backend/routes/facultyRoutes.js`
- Backend Controller: `backend/controllers/facultyController.js`
- Frontend Page: `frontend/src/pages/faculty/Profile.jsx`

---

## Proposed Scope

- Implement `PUT /api/faculty/profile` endpoint in `backend/controllers/facultyController.js`:
  - Allow updating `name`, `department`, `designation`, `profilePicture`.
  - Validate non-empty name and safe inputs.
  - Return updated user object.
- Update `frontend/src/api/facultyApi.js` to export `updateProfile(data)`.
- Wire `frontend/src/pages/faculty/Profile.jsx` form submission to `updateProfile`, updating local `AuthContext` state upon success.

---

## Out of Scope

- Password reset workflow (keep that in auth routes).
- Avatar image file uploads (use URL string for profilePicture).

---

## Acceptance Criteria

- [ ] `PUT /api/faculty/profile` updates user record in MongoDB.
- [ ] Profile page form saves changes and displays success notification.
- [ ] Page refresh preserves updated user info.
- [ ] `npm test` passes in `backend/` and `npm run build` passes in `frontend/`.

---

## Required Tests

- Test `PUT /api/faculty/profile` with valid payload and verify DB update.
- Submit profile form in UI and verify context state update.

---

## Dependencies

None.

---

## Manual Verification Steps

1. Log in as faculty (`faculty@example.com` / `faculty123`).
2. Navigate to `http://localhost:5173/profile`.
3. Update designation to "Senior Associate Professor" and click Save. Verify update.
