# Issue #14: API Rate Limiting, Helmet Security Headers & CORS Lockdown

- **Difficulty**: Hard
- **Priority**: Critical
- **Category**: Security / Infrastructure
- **Estimated Effort**: 5-7 hours
- **Skills Required**: Node.js, Express Security, `helmet`, `express-rate-limit`, CORS
- **Suggested Labels**: `hard`, `backend`, `security`

---

## Problem Statement

`backend/server.js` currently lacks HTTP rate limiting and security response header configurations (e.g. Content-Security-Policy, X-Frame-Options, Strict-Transport-Security). This leaves authentication endpoints vulnerable to brute-force attacks.

---

## Evidence & Source Paths

- Backend Server: `backend/server.js`
- Auth Routes: `backend/routes/authRoutes.js`

---

## Proposed Scope

- Add `helmet` middleware to `backend/server.js` for secure HTTP headers.
- Configure `express-rate-limit` for authentication routes:
  - Strict rate limit on `/api/auth/login` (e.g. max 5 failed attempts per 15 minutes per IP).
  - General rate limit on `/api/*` (e.g. max 100 requests per minute).
- Restrict CORS origins strictly to `process.env.CLIENT_URL` in production mode.
- Prevent HTTP Parameter Pollution with `hpp` middleware.

---

## Out of Scope

- Setting up Web Application Firewall (WAF) infrastructure.

---

## Acceptance Criteria

- [ ] Exceeding 5 login attempts within window returns 429 Too Many Requests status.
- [ ] Response headers include `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`.
- [ ] CORS rejects unauthorized cross-origin requests in production mode.
- [ ] `npm test` passes in `backend/`.

---

## Required Tests

- Write automated test sending 6 rapid login requests to `/api/auth/login` and verifying 429 status response.

---

## Dependencies

- `express-rate-limit`
- `helmet`

---

## Manual Verification Steps

1. Send repeated curl POST requests to `/api/auth/login`.
2. Verify 429 error returned after threshold is exceeded.
