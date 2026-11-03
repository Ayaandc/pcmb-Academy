# PCMB Academy

This repository is organized as a simple full-stack workspace:

- `frontend/` contains the React + TypeScript app
- `backend/` contains the Node + Express API

## Run Frontend

1. Set `VITE_API_URL` in `frontend/.env.local` when the API is not at `http://localhost:5000`.
2. Start the frontend:
   `npm run dev:frontend`

## Run Backend

1. Create `backend/.env` from `backend/.env.example` and configure `MONGODB_URI`, a long random `JWT_SECRET`, `GEMINI_API_KEY`, and `CLIENT_ORIGIN`.
2. Start the backend:
   `npm run dev:backend`

Gemini and database credentials belong only in `backend/.env`; never put them in the frontend.
