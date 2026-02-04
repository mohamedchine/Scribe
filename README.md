# Scribe

A full-stack blog and content platform built with React and Node.js. Users can create posts, comment, manage categories, and handle authentication with email verification and password reset.

---

## Tech Stack

| Layer      | Stack |
|-----------|--------|
| **Frontend** | React 18, React Router, Context API, Axios, Bootstrap Icons, React Toastify |
| **Backend**  | Node.js, Express, Mongoose |
| **Database** | MongoDB |
| **Storage**  | Cloudinary (images) |
| **Cache**    | Redis (rate limiting) |
| **Auth**     | JWT (access + refresh tokens), bcrypt, nodemailer |

---

## Project Structure

```
Scribe/
├── backend/          # Express API
│   ├── config/       # DB, Redis, Cloudinary
│   ├── controllers/
│   ├── middleware/   # Auth, validation, rate limit, reCAPTCHA (partial)
│   ├── models/
│   ├── routes/
│   └── utils/
└── frontend/         # React SPA
    └── src/
        ├── components/
        ├── contexts&apicalls/
        ├── pages/
        └── utils/
```

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB
- Redis Account (for rate limiting)
- Cloudinary account (for image uploads)
- Gmail (for emails)
- reCAPTCHA v3 keys (you can get them from here https://www.google.com/recaptcha/admin/create)

### Backend 

```bash
cd backend
npm install
```

### Environment Variables

Create a `.env` file by copying the example file:

```bash
cp .env.example .env
```

Then update `.env` with your credentials.

### Run the Server

```bash
nodemon sever.js     

```

### Frontend

```bash
cd frontend
npm install
```

### Environment Variables

Create a `.env` file in the `frontend` directory and add:

```env
REACT_APP_RECAPTCHA_SITE_KEY=your_recaptcha_public_key
```
Set your API base URL ( in `src/utils/api.js` )

```bash
npm start
```

---

## Security Notice

**This application is not production-hardened.** Use it as a learning or portfolio project. Before any production use you should:

- Add **reCAPTCHA** (or similar) to all sensitive backend endpoints.
- Apply **per-endpoint rate limits** (e.g. posts, comments, auth).
- Require **current password** when changing password in profile/account updates.



---

## Roadmap & TODOs

### Backend

| Item | Status | Notes |
|------|--------|--------|
| reCAPTCHA on all endpoints | Partial | reCAPTCHA middleware exists; apply to **all sensitive routes** (auth, password reset, posts, comments, profile updates, etc.). |
| Rate limits per endpoint | Partial | Global + login limiters exist (Redis). Add **endpoint-specific limits**, e.g.: |
| | | • **Posts:** e.g. 10 posts per user per day |
| | | • **Comments:** e.g. 50 comments per user per day |
| | | • **Password reset / forgot:** strict per-IP limits |
| Per-user limits (token-based) | Not done | Enforce limits **per user ID** extracted from JWT (not only per IP), e.g. posts/comments per user per time window. expl(15post per day) |
| Token revocation | Not done | Add **refresh token invalidation** (e.g. store active tokens or token versions in DB/Redis) to support logout from all devices when resetting a password for example   |
| Account deactivation | Not done | Allow admins to **deactivate accounts**; block login and API access when `isActive=false` while preserving data. |
| Require current password on profile update | Not done | When changing password in profile, require and verify **current password** before applying the new one. |


### Frontend & Features

The app is **not 100% developed**. Possible improvements:

- **reCAPTCHA** – Ensure all forms that hit protected endpoints send and use reCAPTCHA tokens.
- **Profile / account** – Add “current password” field in the update-profile form when changing password; show clear validation errors.
- **Social**
  - **Follow system** – Follow/unfollow users; feed of followed users’ posts.
  - **Likes** – Like posts; **“See who liked your post”** (list/modal of likers).
- **Messaging** – **Text chat** (e.g. real-time or polling) between users.
- **UX**
  - Notifications (in-app or email) for comments, likes, new followers.
  - Search (posts, users, categories).
  -like and reply to comments etc

---

## License

This project is open source. Anyone can use, modify, and distribute it freely
