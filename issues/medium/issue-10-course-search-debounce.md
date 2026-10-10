# Issue #10: Debounced Search Input & URL Query Parameter Sync

- **Difficulty**: Medium
- **Priority**: Medium
- **Category**: Frontend / UX & URL State
- **Estimated Effort**: 3-4 hours
- **Skills Required**: React, Custom Hooks (`useDebounce`), React Router `useSearchParams`
- **Suggested Labels**: `medium`, `frontend`, `ux`

---

## Problem Statement

In `frontend/src/pages/faculty/CourseBrowser.jsx`, filtering occurs instantly on every keystroke. Additionally, current search and category filters are lost when reloading the page or sharing the URL.

---

## Evidence & Source Paths

- Component File: `frontend/src/pages/faculty/CourseBrowser.jsx`
- Current behavior: Search query stored purely in local React `useState` without URL query synchronization.

---

## Proposed Scope

- Create a `useDebounce` hook in `frontend/src/hooks/useDebounce.js` (300ms delay).
- Sync `search`, `category`, and `difficulty` state with URL query parameters using React Router `useSearchParams` (e.g. `/courses?search=ai&category=Technology`).
- Pre-populate filter inputs from URL search params on initial mount so shareable deep-links work seamlessly.

---

## Out of Scope

- Changing backend route handlers.

---

## Acceptance Criteria

- [ ] Typing in search box updates state after 300ms debounce delay.
- [ ] Changing category or search query updates browser URL parameters without page reload.
- [ ] Refreshing `/courses?category=Pedagogy` automatically selects "Pedagogy" filter.
- [ ] `npm run lint` and `npm run build` pass in `frontend/`.

---

## Required Tests

- Load `http://localhost:5173/courses?search=pedagogy` and verify filtered results match search query.

---

## Dependencies

None.

---

## Manual Verification Steps

1. Open `http://localhost:5173/courses`.
2. Type "machine learning" into search box. Verify URL updates to `?search=machine+learning`.
3. Copy URL into a new tab and verify search query is preserved.
