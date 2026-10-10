# Faculty Upgradation Platform

> **SIH Problem Statement: SIH260022**

A digital platform designed to help faculty members improve their skills through online courses, track their learning and performance, and earn credits that may contribute toward appraisals and performance-based incentives.

## Live Deployment

- **Frontend:** https://faculty-upgradation-platform.vercel.app
- **Backend API:** https://faculty-upgradation-platform.onrender.com
- **API health check:** https://faculty-upgradation-platform.onrender.com/api/health
- **Source code:** https://github.com/tanishqkale91-cmd/faculty-upgradation-platform

The backend root URL may return `Route not found: GET /`. This is expected if no root route is defined. Use the health-check URL above to verify the API.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 8 |
| Styling | Tailwind CSS v4 |
| Routing | React Router v7 |
| HTTP client | Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT |

## Current Implementation Status

The frontend and backend are deployed, and the backend is connected to MongoDB Atlas. Registration and login are implemented with JWT authentication.

| Area | Status |
|---|---|
| Project foundation and application structure | Complete |
| Frontend and backend deployment | Complete |
| MongoDB Atlas connection | Complete |
| JWT registration and login | Implemented |
| Authenticated-user endpoint and protected access | Implemented; verify against the current branch |
| Course catalog and course management | Planned / verify existing code before starting |
| Enrollment and learning progress | Planned / verify existing code before starting |
| Credits and achievements | Planned |
| Faculty and administrator dashboards | Planned |
| Automated test coverage and hardening | Ongoing |

> This status describes the current known implementation. Check the code and open GitHub Issues before assuming a planned feature is entirely absent.

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm
- MongoDB local instance or a MongoDB Atlas cluster

### 1. Clone the repository

```bash
git clone https://github.com/tanishqkale91-cmd/faculty-upgradation-platform.git
cd faculty-upgradation-platform
```

### 2. Configure and run the backend

```bash
cd backend
cp .env.example .env
npm install
```

Open `backend/.env` and set the required values using your own local development credentials:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=replace_with_a_long_random_secret
CLIENT_URL=http://localhost:5173
```

Use the actual variable names required by the current backend code and `.env.example`. Never commit `.env` or paste production secrets into issues or pull requests.

Start the backend:

```bash
npm run dev
```

If the project does not define a `dev` script in your current checkout, use `npm start`.

Backend URL: `http://localhost:5000`

Health check:

```bash
curl http://localhost:5000/api/health
```

### 3. Configure and run the frontend

Open a second terminal from the repository root:

```bash
cd frontend
npm install
```

Create `frontend/.env` if required by your setup and configure the API base URL:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Frontend URL: `http://localhost:5173`

The frontend Axios client reads `VITE_API_BASE_URL`. If it is not set, it falls back to `/api`; use the local Vite proxy if your current Vite configuration provides one.

## Production Environment Variables

Configure production variables in the hosting dashboards, not in committed files.

### Render backend

| Variable | Purpose |
|---|---|
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Long, random secret used to sign JWTs |
| `CLIENT_URL` | Exact deployed frontend origin, such as `https://faculty-upgradation-platform.vercel.app` |
| `NODE_ENV` | Set to `production` |
| `PORT` | Normally supplied by Render; the server should use `process.env.PORT` |

### Vercel frontend

| Variable | Value |
|---|---|
| `VITE_API_BASE_URL` | `https://faculty-upgradation-platform.onrender.com/api` |

After changing a Vercel environment variable, redeploy the frontend so the new value is included in the build. After changing Render environment variables, redeploy or restart the backend as appropriate.

The backend CORS configuration must allow the exact frontend origin used in the browser. Avoid allowing every origin in production. If you use Vercel preview deployments, decide explicitly whether and how those origins should be allowed.

## Project Structure

```text
faculty-upgradation-platform/
├── backend/
│   ├── config/        # Database configuration
│   ├── middlewares/   # Authentication and error handling
│   ├── models/        # Mongoose models
│   ├── routes/        # API route definitions
│   ├── utils/         # Shared backend utilities
│   └── server.js      # Express entry point
└── frontend/
    └── src/
        ├── api/       # Axios instance and API modules
        ├── components/# Reusable UI components
        ├── context/   # Application/auth context
        ├── pages/     # Page components
        └── App.jsx    # Application routing and layout
```

Folder contents may evolve. Check the current repository if a path differs from this overview.

## Roadmap

| Phase | Scope | Status |
|---|---|---|
| 1 — Foundation | Project structure, initial models and application setup | Complete |
| 2 — Authentication | Registration/login, JWT handling and protected access | Implemented; add/verify automated tests |
| 3 — Courses | Course catalog, course details and authorized course management | Planned / verify existing implementation |
| 4 — Enrollment | Enrollment and module/course progress tracking | Planned |
| 5 — Credits and achievements | Rules for awarding credits and badges | Planned |
| 6 — Dashboards | Faculty and administrator summaries | Planned |
| 7 — Quality and polish | Validation, error states, accessibility, tests and documentation | Ongoing |

## Contributing

Contributions are welcome. Before starting work:

1. Review the existing code and open Issues to avoid duplicating work.
2. Comment on an issue and coordinate with the maintainers before beginning substantial changes.
3. Create a focused branch, for example `feat/course-catalog` or `fix/api-error-responses`.
4. Keep pull requests focused on one issue.
5. Include test steps and screenshots for user-interface changes.
6. Never commit `.env` files, credentials, tokens, or real user data.

Create and track work in the [GitHub Issues](https://github.com/tanishqkale91-cmd/faculty-upgradation-platform/issues) page.

## Security Notes

- Keep production secrets in Render environment variables.
- Keep frontend `VITE_` variables limited to values safe to expose in a browser. Never put database credentials or JWT signing secrets in Vercel frontend variables.
- Use a strong, random production `JWT_SECRET`.
- Configure MongoDB Atlas network access deliberately; do not treat unrestricted IP access as a permanent production solution.
- Review dependency audit output before applying potentially breaking updates.
