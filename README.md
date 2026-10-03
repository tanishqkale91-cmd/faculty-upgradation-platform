# Faculty Upgradation Platform

> **SIH Problem Statement: SIH260022**
>
> A digital platform that helps faculty members improve their skills through online courses, track their learning and performance, and earn credits that can contribute towards appraisals and performance-based incentives.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite 8 |
| Styling | Tailwind CSS v4 |
| Routing | React Router v7 |
| HTTP Client | Axios |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT (Phase 2) |

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- MongoDB (local or [Atlas](https://www.mongodb.com/cloud/atlas))

---

### 1. Clone the repo

```bash
git clone https://github.com/your-org/faculty-upgradation-platform.git
cd faculty-upgradation-platform
```

---

### 2. Start the Backend

```bash
cd backend

# Copy and edit the environment file
cp .env.example .env
# Edit .env and set your MONGO_URI

# Install dependencies (first time only)
npm install

# Start in development mode (with auto-reload)
npm run dev

# Or start without auto-reload
npm start
```

The server will be available at **http://localhost:5000**

Verify it's running:
```bash
curl http://localhost:5000/api/health
```

---

### 3. Start the Frontend

```bash
cd frontend

# Copy the environment file (optional for local dev)
cp .env.example .env

# Install dependencies (first time only)
npm install

# Start in development mode
npm run dev
```

The app will be available at **http://localhost:5173**

> **Note:** The Vite dev server automatically proxies `/api` requests to `http://localhost:5000`, so you don't need to configure CORS separately during development.

---

## Project Structure

```
faculty-upgradation-platform/
├── backend/          # Node.js + Express server
│   ├── config/       # Database connection
│   ├── middlewares/  # Auth, error handling
│   ├── models/       # Mongoose models
│   ├── routes/       # API route definitions
│   └── server.js     # Entry point
│
└── frontend/         # React + Vite app
    └── src/
        ├── api/      # Axios instance + API modules
        ├── components/   # Reusable UI components
        ├── context/  # AuthContext
        ├── pages/    # Page components (auth, faculty, admin)
        └── App.jsx   # Router + layout
```

---

## Implementation Phases

| Phase | Description | Status |
|---|---|---|
| 1 — Foundation | Project scaffolding, models, basic structure | ✅ Complete |
| 2 — Auth | JWT login/register, protected routes | 🔜 Next |
| 3 — Courses | Course CRUD, modules, browse/filter | 🔜 |
| 4 — Enrollment | Enroll, progress tracking, module completion | 🔜 |
| 5 — Credits & Achievements | Auto-award credits, badges | 🔜 |
| 6 — Dashboards | Faculty + Admin dashboards with stats | 🔜 |
| 7 — Polish | Validation, error states, contributor docs | 🔜 |

---

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before submitting a pull request.

---

## License

MIT
