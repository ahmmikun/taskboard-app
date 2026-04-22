# Taskboard App

Full-stack notes app built with:

- Frontend: React + Vite + Tailwind CSS + DaisyUI
- Backend: Node.js + Express + MongoDB + Upstash rate limiting

## Features

- Create, read, update, and delete notes
- Responsive UI with loading/empty/error states
- Rate-limit handling with dedicated frontend UI
- Environment-based API configuration
- Health endpoint for backend (`/api/health`)

## Project Structure

- `frontend/` React client
- `backend/` Express API

## Prerequisites

- Node.js 20+
- npm
- MongoDB (local or hosted)

## Backend Setup

1. Open `backend/.env.example` and create `backend/.env`.
2. Fill required values (`MONGO_URI` at minimum).
3. Install dependencies and run server:

```bash
cd backend
npm install
npm run dev
```

Backend runs on `http://localhost:5001` by default.

## Frontend Setup

1. Open `frontend/.env.example` and create `frontend/.env`.
2. Keep `VITE_API_BASE_URL` pointed to backend API.
3. Install dependencies and run frontend:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173` by default.

## Production Build

```bash
cd backend
npm start
```

```bash
cd frontend
npm run build
npm run preview
```
