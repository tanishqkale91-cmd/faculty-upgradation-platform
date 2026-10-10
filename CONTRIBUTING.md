# Contributing to Faculty Upgradation Platform

Thank you for your interest in contributing to the **Faculty Upgradation Platform** (`SIH260022`)! This document provides comprehensive guidelines and instructions for setting up your local environment, contributing code, testing, and submitting pull requests.

---

## 1. Project Overview & Architecture

The Faculty Upgradation Platform is a full-stack MERN application built to facilitate faculty professional development, course enrollment, credit accumulation, and performance tracking.

### Architecture Summary

```
faculty-upgradation-platform/
├── backend/                  # Express.js REST API Server
│   ├── config/               # Database connection (Mongoose)
│   ├── controllers/          # Business logic (auth, courses, enrollments, credits, achievements)
│   ├── middlewares/          # Authentication (JWT), RBAC authorization, and error handling
│   ├── models/               # Mongoose schemas (User, Course, Enrollment, Credit, Achievement)
│   ├── routes/               # API route definitions
│   ├── seed.js               # Idempotent DB seed script for test accounts & courses
│   ├── tests/                # Automated backend unit & integration tests
│   └── server.js             # Server entry point
│
├── frontend/                 # React 19 + Vite 8 SPA Client
│   ├── src/
│   │   ├── api/              # Axios instance and API call modules
│   │   ├── components/       # Common UI elements & ProtectedRoute guards
│   │   ├── context/          # AuthContext for session management
│   │   ├── pages/            # Page components (Faculty & Admin views)
│   │   └── index.css         # Tailwind v4 & global design tokens
│   └── vite.config.js        # Vite configuration & dev proxy
│
└── issues/                   # Contributor Issue Backlog (Easy, Medium, Hard)
```

---

## 2. Prerequisites & Supported Runtimes

- **Node.js**: `v18.0.0` or higher (LTS recommended)
- **npm**: `v9.0.0` or higher
- **MongoDB**: Community Server `v6.0+` locally OR [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) URI

---

## 3. How to Clone & Run the Frontend Locally

1. Open a terminal in the project root:
   ```bash
   git clone https://github.com/tanishqkale91-cmd/faculty-upgradation-platform.git
   cd faculty-upgradation-platform/frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Copy environment configuration:
   ```bash
   cp .env.example .env
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The client will be running at `http://localhost:5173`. Request paths starting with `/api` are automatically proxied to the backend at `http://localhost:5000`.

---

## 4. How to Configure & Run the Backend Locally

1. Open a terminal in the backend directory:
   ```bash
   cd faculty-upgradation-platform/backend
   ```
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Copy the environment configuration file:
   ```bash
   cp .env.example .env
   ```
4. Update `.env` with your local MongoDB URI and a secure JWT secret:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/faculty_upgradation
   JWT_SECRET=super_secret_jwt_key_change_in_production
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   ```
5. Start the backend in development mode (with auto-reload):
   ```bash
   npm run dev
   ```
   Verify backend health: `curl http://localhost:5000/api/health`

---

## 5. MongoDB Setup Instructions

### Local MongoDB:
1. Ensure the MongoDB service is running:
   ```bash
   sudo systemctl status mongod
   ```
2. Set `MONGO_URI=mongodb://127.0.0.1:27017/faculty_upgradation` in `backend/.env`.

### MongoDB Atlas (Cloud):
1. Create a free cluster on MongoDB Atlas.
2. Obtain your connection string.
3. Replace `<password>` and set `MONGO_URI` in `backend/.env`.

---

## 6. Environment Variables Documentation

### Backend (`backend/.env`):
| Variable | Description | Default / Example |
|---|---|---|
| `PORT` | Port number for Express server | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/faculty_upgradation` |
| `JWT_SECRET` | Secret key for JWT signing & verification | Set a long random string |
| `NODE_ENV` | Environment identifier (`development`/`production`) | `development` |
| `CLIENT_URL` | Allowed CORS origin | `http://localhost:5173` |

### Frontend (`frontend/.env`):
| Variable | Description | Default |
|---|---|---|
| `VITE_API_BASE_URL` | Base URL path for Axios API requests | `/api` |

---

## 7. How to Create & Authenticate Test Users Safely

You can register a new faculty account via the UI at `http://localhost:5173/register` or run the database seed script to populate standard test credentials:

- **Admin Account**: `admin@example.com` / `admin123`
- **Faculty Account**: `faculty@example.com` / `faculty123`

> **Note**: Admin accounts cannot be created directly via the public `/api/auth/register` route. They must be created via `npm run seed` or directly by a database administrator.

---

## 8. How to Seed Demo Courses in Local/Test Database

Run the idempotent seed script from the `backend/` directory:

```bash
cd backend
npm run seed
```

This script:
- Creates `admin@example.com` and `faculty@example.com` if they do not exist.
- Seeds 5 realistic sample courses (4 published, 1 draft) with structured modules.
- **Does not overwrite or delete existing user data**.
- Is safe to execute multiple times.

---

## 9. API Endpoint Overview & Access Control

| Method | Endpoint | Access Level | Description |
|---|---|---|---|
| `GET` | `/api/health` | Public | System health check |
| `POST` | `/api/auth/register` | Public | Register new faculty user |
| `POST` | `/api/auth/login` | Public | Authenticate user & return JWT |
| `GET` | `/api/auth/me` | Protected | Get authenticated user profile |
| `GET` | `/api/courses` | Protected | List courses (Faculty: published/active; Admin: all) |
| `GET` | `/api/courses/:id` | Protected | Get course details by ID |
| `POST` | `/api/courses` | Protected (Admin) | Create new course with modules |
| `PUT` | `/api/courses/:id` | Protected (Admin) | Update existing course or publish status |
| `DELETE` | `/api/courses/:id` | Protected (Admin) | Soft-delete / deactivate course |
| `POST` | `/api/enrollments/:courseId` | Protected (Faculty) | Enroll in a course |
| `GET` | `/api/enrollments/my-courses` | Protected (Faculty) | List authenticated user's enrollments |
| `GET` | `/api/enrollments/:id` | Protected (Faculty) | Get single enrollment details |
| `PUT` | `/api/enrollments/:id/progress` | Protected (Faculty) | Update module progress & award credits |

---

## 10. How to Run Frontend Build & Lint Checks

From `frontend/`:
```bash
# Run oxlint syntax and code quality checks
npm run lint

# Build production bundle
npm run build
```

Both commands must pass with zero errors before submitting code.

---

## 11. How to Run Backend Tests

From `backend/`:
```bash
npm test
```

This executes Node's built-in test runner (`node --test tests/*.test.js`) verifying models, schema validation, error handlers, and business rules.

---

## 12. Branch Naming Conventions

Use lowercase branch names with category prefixes:
- `feature/course-pagination`
- `bugfix/jwt-expiration-handler`
- `docs/contributing-guide`
- `refactor/enrollment-controller`

---

## 13. Commit & Pull Request Guidelines

1. Follow standard Conventional Commit messages:
   - `feat: add course difficulty filter to catalog`
   - `fix: resolve responsive margin bug in mobile sidebar`
   - `test: add unit test for negative course credits`
   - `docs: update setup instructions in README`
2. Keep pull requests focused on a single logical change or issue.
3. Include clear description of changes and manual test steps in the PR description.

---

## 14. Issue Assignment & Collaboration Expectations

- Check the `issues/` directory for available candidate tasks classified by difficulty (`easy/`, `medium/`, `hard/`).
- Comment on an open issue before starting work to avoid duplicate efforts.
- Keep discussion professional, constructive, and clear.

---

## 15. Definition of Done (DoD)

A pull request is ready for review when:
1. Code fulfills all acceptance criteria specified in the issue.
2. `npm run lint` and `npm run build` pass in `frontend/`.
3. `npm test` passes in `backend/`.
4. No sensitive secrets or credentials are included in code or commits.
5. Code style matches the existing project aesthetics and patterns.

---

## 16. Security Rules

- **Never commit credentials**: Do not commit `.env` files, JWT secrets, database connection strings, or production tokens.
- **Sanitize inputs**: All external links, search inputs, and MongoDB queries must be validated and sanitized.
- **RBAC enforcement**: Administrative endpoints MUST be guarded with `protect` and `authorise('admin')` middleware.

---

## 17. UI Contribution Guidelines

- Preserve the dark slate theme (`#0f172a`), indigo (`#4f46e5`), and cyan (`#06b6d4`) palette.
- Ensure all interactive elements have visible focus states and accessible labels.
- Test UI responsiveness on mobile (375px), tablet (768px), and desktop (1280px+).
- Attach responsive screenshots or a demo video when submitting UI pull requests.

---

## 18. Guidance for Reporting Bugs & Requesting Features

- **Bugs**: Provide steps to reproduce, expected behavior, actual behavior, and error tracebacks.
- **Features**: Provide rationale, proposed implementation scope, and user benefit.
