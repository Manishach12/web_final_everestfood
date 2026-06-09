# Everest Food App

Full-stack authentication scaffold: **Express + MongoDB** backend and **Next.js (App Router)** frontend with JWT auth via secure HTTP-only cookies.

## Stack

| Layer    | Tech                                              |
| -------- | ------------------------------------------------- |
| Backend  | Node.js, Express, TypeScript, Mongoose, bcrypt, JWT |
| Frontend | Next.js 15, React 19, TypeScript, TailwindCSS, Zod |
| DevOps   | Docker, docker-compose, GitHub Actions, Husky     |

## Project structure

```
everest-food-app/
├── backend/          # Express API (port 5000)
├── frontend/         # Next.js app (port 3000)
├── postman/          # API collection + examples
├── .github/workflows # CI pipeline
├── docker-compose.yml
└── .env.example
```

## Quick start (local)

### 1. Prerequisites

- Node.js 20+
- MongoDB (local or Docker)

### 2. Install

```bash
git clone <repo-url> everest-food-app
cd everest-food-app
cp .env.example .env
npm install
```

### 3. Start MongoDB (Docker)

```bash
docker compose -f docker-compose.dev.yml up -d
```

### 4. Run dev servers

```bash
npm run dev
```

- Frontend: http://localhost:3000
- Backend:  http://localhost:5000
- Health:   http://localhost:5000/health

### 5. Auth flow

1. Open http://localhost:3000/register and create an account
2. You are redirected to `/dashboard` on success
3. Sign out, then sign in at http://localhost:3000/login
4. Protected `/dashboard` requires a valid auth cookie

## Environment variables

Copy `.env.example` to `.env` at the repo root. Both backend and frontend read from the root `.env`.

| Variable              | Used by   | Description                          |
| --------------------- | --------- | ------------------------------------ |
| `MONGODB_URI`         | Backend   | MongoDB connection string            |
| `JWT_SECRET`          | Backend   | Secret for signing JWTs (32+ chars)  |
| `JWT_EXPIRES_IN`      | Backend   | Token expiry (e.g. `7d`)             |
| `COOKIE_NAME`         | Both      | HTTP-only cookie name                |
| `CORS_ORIGIN`         | Backend   | Allowed frontend origin              |
| `PORT`                | Backend   | API port (default `5000`)            |
| `NEXT_PUBLIC_API_URL` | Frontend  | Backend URL for API calls            |
| `NEXT_PUBLIC_APP_URL` | Frontend  | Frontend URL (server actions/BFF)    |

## API endpoints

| Method | Path            | Auth | Description              |
| ------ | --------------- | ---- | ------------------------ |
| POST   | `/api/register` | No   | Register new user        |
| POST   | `/api/login`    | No   | Login, sets auth cookie  |
| POST   | `/api/logout`   | No   | Clears auth cookie       |
| GET    | `/api/me`       | Yes  | Current user profile     |
| GET    | `/health`       | No   | Health check             |

### Example: Register

**Request**

```http
POST /api/register
Content-Type: application/json

{
  "name": "Demo User",
  "email": "demo@everestfood.com",
  "password": "SecurePass123!"
}
```

**Response (201)**

```json
{
  "success": true,
  "message": "Registration successful",
  "user": {
    "id": "...",
    "name": "Demo User",
    "email": "demo@everestfood.com",
    "createdAt": "2026-06-09T12:00:00.000Z"
  }
}
```

Sets `everest_token` HTTP-only cookie.

### Example: Login

**Request**

```http
POST /api/login
Content-Type: application/json

{
  "email": "demo@everestfood.com",
  "password": "SecurePass123!"
}
```

**Response (200)** — same shape as register; cookie set on success.

**Response (401)**

```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

Import `postman/everest-food-app-auth.postman_collection.json` into Postman for ready-made requests.

> **Note:** Page view components live in `frontend/src/page-views/` and are imported via the `@/pages/*` alias. Next.js reserves `src/pages/` for the Pages Router, so we use `page-views/` to avoid routing conflicts.

## Frontend architecture

```
Component (RegisterPage / LoginPage)
    → Server Action (app/actions/auth.ts)
        → Service (services/auth.service.ts)
            → Backend API (/api/register, /api/login)
```

- **Zod** schemas in `src/schemas/`
- **BFF routes** at `src/app/api/auth/*` proxy cookies for client-side calls
- **Middleware** protects `/dashboard`
- **TailwindCSS** for responsive UI

## Docker (production-like)

```bash
cp .env.example .env
# Set JWT_SECRET to a strong value
docker compose up --build
```

Services: `mongo`, `backend` (5000), `frontend` (3000).

## Scripts

| Command            | Description                    |
| ------------------ | ------------------------------ |
| `npm run dev`      | Start backend + frontend       |
| `npm run build`    | Build both workspaces          |
| `npm run lint`     | ESLint across monorepo         |
| `npm run format`   | Prettier write                 |
| `npm run test`     | Backend unit tests (Vitest)    |

## CI/CD

GitHub Actions (`.github/workflows/ci.yml`) runs on push/PR:

- Install dependencies
- Lint + format check
- Build backend & frontend
- Run backend tests (MongoDB service container)

## Git hooks

Husky pre-commit runs ESLint via `lint-staged`.

## License

MIT
