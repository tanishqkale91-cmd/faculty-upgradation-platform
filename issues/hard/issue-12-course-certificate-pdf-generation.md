# Issue #12: PDF Course Completion Certificate Generation & Download

- **Difficulty**: Hard
- **Priority**: High
- **Category**: Full-Stack / Feature
- **Estimated Effort**: 7-9 hours
- **Skills Required**: Node.js, PDFkit / HTML-to-PDF, Express, React, Blob Downloads
- **Suggested Labels**: `hard`, `full-stack`, `feature`

---

## Problem Statement

When a faculty member completes 100% of a course's modules, their enrollment status transitions to `'completed'`. However, there is no digital certificate generated for the faculty member to download or present for official institution appraisal.

---

## Evidence & Source Paths

- Backend Controller: `backend/controllers/enrollmentController.js`
- Frontend Component: `frontend/src/pages/faculty/MyCourses.jsx`

---

## Proposed Scope

- Implement backend endpoint `GET /api/enrollments/:id/certificate` (protect):
  - Verify enrollment exists, belongs to authenticated faculty, and has `status === 'completed'`.
  - Dynamically generate a PDF certificate containing: Faculty Name, Course Title, Provider/Instructor, Credits Awarded, Date of Completion, and Certificate Verification ID.
  - Return PDF binary buffer with `Content-Type: application/pdf` and `Content-Disposition: attachment`.
- Update `frontend/src/pages/faculty/MyCourses.jsx`:
  - Show "Download Certificate 📜" button on completed course cards.

---

## Out of Scope

- Digital cryptographic PKI signatures (use unique verification code hash instead).

---

## Acceptance Criteria

- [ ] Uncompleted enrollments return 400 Bad Request if certificate requested.
- [ ] Completed enrollments generate and download a valid PDF file.
- [ ] Certificate displays correct faculty name, course title, and credits.
- [ ] `npm test` passes in `backend/` and `npm run build` passes in `frontend/`.

---

## Required Tests

- Unit test certificate endpoint authorization and completion state verification.

---

## Dependencies

- PDF generation library (e.g. `pdfkit`).

---

## Manual Verification Steps

1. Complete all modules in a course.
2. Click "Download Certificate" in My Courses.
3. Open downloaded PDF and verify contents.
