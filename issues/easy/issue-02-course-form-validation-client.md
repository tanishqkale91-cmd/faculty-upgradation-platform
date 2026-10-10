# Issue #2: Client-Side Course Form URL & Image Validation

- **Difficulty**: Easy
- **Priority**: Low
- **Category**: Frontend / Form Validation
- **Estimated Effort**: 2-3 hours
- **Skills Required**: React, JavaScript Regex, Form Handling
- **Suggested Labels**: `good first issue`, `frontend`, `validation`

---

## Problem Statement

In `frontend/src/pages/admin/CourseManagement.jsx`, the administrator can enter arbitrary text into "Thumbnail Image URL" and "External Resource URL" inputs. Invalid or non-HTTP URLs can cause broken images or invalid links on the course detail page.

---

## Evidence & Source Paths

- Component File: `frontend/src/pages/admin/CourseManagement.jsx`
- Current behavior: Basic text/url inputs without pre-submit protocol validation (`http://` or `https://`).

---

## Proposed Scope

- Add a URL validation helper function in the course form modal.
- If an administrator types `www.example.com` or `example.com`, automatically prefix it with `https://`.
- If an invalid scheme (e.g. `javascript:`) is entered, show a clear validation error: `"URLs must start with http:// or https://"`.

---

## Out of Scope

- Server-side image uploading or storage.
- Modifying backend Mongoose models.

---

## Acceptance Criteria

- [ ] Typing non-HTTP URLs displays a friendly error before submitting the form.
- [ ] Valid image/external URLs are automatically sanitized and formatted.
- [ ] `npm run lint` and `npm run build` pass in `frontend/`.

---

## Required Tests

- Attempt submitting a course with `javascript:alert(1)` as thumbnail URL; verify it is blocked.
- Submit a valid URL (`https://images.unsplash.com/...`); verify course saves cleanly.

---

## Dependencies

None.

---

## Manual Verification Steps

1. Log in as admin (`admin@example.com` / `admin123`).
2. Navigate to `http://localhost:5173/admin/courses`.
3. Click "Add New Course" and enter invalid URL strings. Verify error banner.
