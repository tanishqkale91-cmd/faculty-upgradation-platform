# Issue #3: Reusable Toast Notification Banner Component

- **Difficulty**: Easy
- **Priority**: Medium
- **Category**: Frontend / UI Components
- **Estimated Effort**: 3-4 hours
- **Skills Required**: React, CSS Animations, Context API / Custom Hooks
- **Suggested Labels**: `good first issue`, `frontend`, `ui`

---

## Problem Statement

Currently, page components (`CourseBrowser`, `CourseDetail`, `CourseManagement`) manage inline success and error banners independently. Creating a centralized, auto-dismissing Toast Notification system will standardize feedback across the application.

---

## Evidence & Source Paths

- Component Files: `frontend/src/pages/faculty/CourseDetail.jsx`, `frontend/src/pages/faculty/MyCourses.jsx`
- Current behavior: Duplicate inline `<div>` alert markup across multiple pages.

---

## Proposed Scope

- Create a reusable `Toast.jsx` component in `frontend/src/components/common/Toast.jsx`.
- Support `type="success"`, `type="error"`, `type="info"` with auto-dismiss after 4 seconds.
- Provide a `useToast()` hook or lightweight state wrapper to show toasts from any component.

---

## Out of Scope

- Adding third-party heavy dependencies (e.g. `react-toastify`). Use lightweight native React state and CSS.

---

## Acceptance Criteria

- [ ] `Toast.jsx` component renders floating banner at bottom-right or top-right of screen.
- [ ] Auto-dismiss timer automatically removes toast after 4 seconds.
- [ ] Includes close button (✕) for manual dismissal.
- [ ] `npm run lint` and `npm run build` pass in `frontend/`.

---

## Required Tests

- Render toast with message and verify auto-dismissal.
- Verify dismiss on click.

---

## Dependencies

None.

---

## Manual Verification Steps

1. Trigger enrollment in `CourseDetail.jsx`.
2. Verify floating toast notification appears and auto-dismisses.
