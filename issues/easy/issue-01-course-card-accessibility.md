# Issue #1: Course Card Accessibility & Keyboard Navigation

- **Difficulty**: Easy
- **Priority**: Low
- **Category**: Frontend / Accessibility (a11y)
- **Estimated Effort**: 2-3 hours
- **Skills Required**: React, HTML5 Accessibility, ARIA, CSS Focus States
- **Suggested Labels**: `good first issue`, `frontend`, `accessibility`

---

## Problem Statement

Course cards in `frontend/src/pages/faculty/CourseBrowser.jsx` lack explicit `aria-label` attributes and screen-reader announcements for key metadata badges (credits, duration, difficulty). Additionally, keyboard focus outlines on interactive controls are subtle.

---

## Evidence & Source Paths

- Component File: `frontend/src/pages/faculty/CourseBrowser.jsx`
- Current behavior: `<CourseCard>` wraps the card in a `<Link>` tag without explicit ARIA labels describing the course title and credit value.

---

## Proposed Scope

- Add descriptive `aria-label` to course card links (e.g. `aria-label="View course: Advanced Pedagogy, 4 credits, intermediate level"`).
- Ensure explicit `role="region"` or `role="article"` tags on course cards.
- Add visible `:focus-visible` ring styling in `frontend/src/index.css` for keyboard navigators.

---

## Out of Scope

- Changing card layout or color theme.
- Modifying backend course APIs.

---

## Acceptance Criteria

- [ ] All course cards have accessible `aria-label` text describing course title, credits, and difficulty.
- [ ] Navigating cards using `Tab` key highlights active card with a clear focus outline (`2px solid var(--color-primary-light)`).
- [ ] Screen readers read course metadata without stuttering or unlabelled icon announcements.
- [ ] `npm run lint` and `npm run build` pass in `frontend/`.

---

## Required Tests

- Test keyboard navigation (`Tab` and `Enter` key) through all course cards in Chrome and Firefox.
- Test with NVDA or VoiceOver screen reader.

---

## Dependencies

None.

---

## Manual Verification Steps

1. Open `http://localhost:5173/courses`.
2. Press `Tab` repeatedly to cycle focus through course cards.
3. Verify visible focus ring and screen reader accessibility name.
