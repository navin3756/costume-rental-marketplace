# Costume Rental Marketplace

A monorepo for a full-stack costume rental marketplace featuring a Next.js 14 web app, Expo mobile client, Express + MongoDB API, and shared TypeScript contracts. The stack wires together Firebase Auth, Stripe, AWS S3, React Query, and Zustand so teams can launch faster.

## Project structure

```
.
├── backend   # Express + MongoDB API (TypeScript)
├── frontend  # Next.js 14 + Tailwind customer/admin portal
├── mobile    # Expo / React Native companion app
├── shared    # Cross-platform types & utilities
├── docker-compose.yml
└── README.md
```

## Tech highlights

- **Database:** MongoDB + Mongoose models for users, costumes, bookings, payments, and reviews
- **Authentication:** Firebase Auth (email/password + OAuth providers)
- **Payments:** Stripe Payment Intents for deposits and payouts
- **Storage:** AWS S3 client ready for media uploads
- **State management:** React Query for server cache + Zustand for local filters/preferences
- **Tooling:** TypeScript everywhere, ESLint + Prettier, Husky git hooks, Swagger docs, Docker Compose services

## MVP features scaffolded

- Authenticated user profiles with Firebase token verification middleware
- Costume listing/search endpoints with owner CRUD hooks
- Booking creation/listing tied to MongoDB models
- Stripe payment intent helper + persistence
- Review + rating endpoints and sample admin dashboard metrics
- Next.js app router pages for marketing, browsing, bookings, dashboards, and admin overview
- Expo mobile app showing health checks and next-step CTA cards

## Getting started

### 1. Clone and bootstrap

```bash
npm install
npm run prepare # installs Husky hooks
cp .env.example .env
```

> **Note:** `npm install` must be run from the repository root to install workspace dependencies for every package.

### 2. Environment variables

All variables live in `.env`. Copy `.env.example` and fill in the following:

| Service | Variable | Purpose |
| --- | --- | --- |
| Shared | `NODE_ENV`, `PORT`, `NEXT_PUBLIC_API_URL` | Runtime + API base URLs |
| Firebase | `NEXT_PUBLIC_FIREBASE_*`, `FIREBASE_SERVICE_ACCOUNT_KEY` | Web + admin credentials |
| Stripe | `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY` | Payment intents + checkout |
| AWS S3 | `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `S3_BUCKET_NAME`, `NEXT_PUBLIC_S3_BUCKET` | Media uploads |
| Mongo | `MONGO_URI` | Connection string for API + Docker |
| Admin | `ADMIN_EMAILS` | Comma-separated list with elevated permissions |
| Mobile | `EXPO_PUBLIC_API_URL`, `EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Expo runtime config |

### 3. Service commands

| Service | Dev | Build | Start |
| --- | --- | --- | --- |
| Shared | `npm run build -w shared` | `npm run build -w shared` | importable typings |
| Backend | `npm run dev -w backend` | `npm run build -w backend` | `npm run start -w backend` |
| Frontend | `npm run dev -w frontend` | `npm run build -w frontend` | `npm run start -w frontend` |
| Mobile | `npm run start -w mobile` | `npm run build -w mobile` (tsc) | Expo client / EAS |

### 4. Docker Compose

```bash
docker compose up --build
```

Services:

- `mongo`: MongoDB 7 with persisted volume
- `backend`: Express API with live reload
- `frontend`: Next.js dev server on port 3000
- `mobile`: Expo dev server (tunnel) on port 8081

Stop everything with `docker compose down` (add `-v` to remove the Mongo volume).

### 5. API documentation

Swagger UI is available at `http://localhost:4000/api/docs` once the backend is running.

## Database schemas

Mongoose schemas live under `backend/src/models`:

- `user.model.ts`: profile + address fields and roles
- `costume.model.ts`: variants, pricing, categories, and media assets
- `booking.model.ts`: renter/owner references with status tracking
- `payment.model.ts`: Stripe intent linkage and settlement status
- `review.model.ts`: booking-based reviews + ratings

## Development workflow

1. Update shared contracts in `shared/src` and run `npm run build -w shared` to emit `dist/` typings.
2. Use React Query hooks (`frontend/app/(routes)` and `mobile/App.tsx`) to call backend endpoints via the Axios client.
3. Keep code formatted via `npm run format` and linted with `npm run lint` (Husky runs lint on every commit).
4. Use the provided Dockerfiles when deploying services independently.

## Next steps

- Wire Firebase Auth client flows (email/OAuth) to persist ID tokens in local storage / async storage
- Connect Stripe webhooks for booking lifecycle + payouts
- Implement AWS S3 signed upload URLs for costume galleries
- Replace mocked React Query data with real backend calls once endpoints are live
- Expand the Expo app with booking calendars, push notifications, and offline persistence
