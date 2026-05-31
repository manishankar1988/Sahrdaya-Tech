# Sahrdaya Tech

Sahrdaya Tech is a student-friendly React tech blog and campus opportunity desk.

## Structure

- `front end/`: React + Vite frontend
- `backend/`: Express + MongoDB API, models, controllers, routes, and cron jobs

The frontend currently uses local fallback data when the backend is offline. When the backend is running, set `VITE_API_BASE_URL=http://localhost:5000/api` in the frontend environment.

## Frontend

```bash
cd "front end"
npm install
npm run dev
```

Open `http://127.0.0.1:5173/`.

## Backend

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

Put MongoDB and admin credentials in `backend/.env`:

```env
MONGO_URI=mongodb://127.0.0.1:27017/sahrdaya-tech
ADMIN_EMAIL=admin@sahrdaya.ac.in
ADMIN_PASSWORD=change-this-password
JWT_SECRET=change-this-secret
```

The backend exposes:

- `GET /api/news`
- `GET /api/videos`
- `GET /api/placements`
- `GET /api/internships`
- `GET /api/achievements`
- `GET /api/departments`
- `GET /api/events`
- `GET /api/research`
- `GET /api/projects`
- `POST /api/videos`
- `POST /api/placements`
- `POST /api/internships`
- `POST /api/research`
- `POST /api/departments`
- `POST /api/projects`
- `POST /api/achievements`
- `POST /api/sync`
- `POST /api/auth/login`
- `POST /api/submissions`
- `GET /api/admin/submissions/pending`
- `PATCH /api/admin/submissions/:id/approve`
- `PATCH /api/admin/submissions/:id/reject`

## Automatic Sources

- News: add `NEWS_API_KEY` for NewsAPI technology headlines.
- YouTube: add `YOUTUBE_API_KEY` for YouTube search results.
- LinkedIn: official job data needs approved LinkedIn API access. The adapter is isolated in `backend/services/linkedinService.js` so approved endpoints can be connected later without changing the UI.

Automatic sync runs every day at 6:00 AM, 6:15 AM, and 6:30 AM server time for news, YouTube videos, and career posts.

Admin write routes require the bearer token returned from `/api/auth/login`. Student submissions are saved as `pending` and published only after admin approval.
