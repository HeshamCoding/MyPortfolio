# MyPortfolio – COMP229 Assignment 2

Hesham Aryan's portfolio. The React frontend from Assignment 1 is in `client/`.
This assignment adds a Node.js + Express + MongoDB (Mongoose) REST API with JWT authentication.

## Folder structure

```
MyPortfolio/
├── client/                  React + Vite frontend (Assignment 1, unchanged except the "dev" script)
├── server/
│   ├── config/config.js     reads settings from .env
│   ├── express.js           Express app: middleware, routes, error handling
│   ├── helpers/dbErrorHandler.js
│   ├── models/              contact, project, qualification, user (Mongoose)
│   ├── controllers/         CRUD logic + auth (signin, signout, requireSignin)
│   └── routes/              /api/contacts, /api/projects, /api/qualifications, /api/users, /auth
├── postman/                 Postman collection for testing every endpoint
├── server.js                starts the server and connects to MongoDB
├── .env.example             template for your secrets (copy to .env)
└── package.json             backend dependencies
```

## Setup (macOS)

```bash
cd MyPortfolio
npm install                 # backend packages
cd client && npm install    # frontend packages
cd ..
cp .env.example .env        # then open .env and fill in your values
```

`.env` values:

| Key | Value |
|---|---|
| `PORT` | `3000` |
| `MONGODB_URI` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | A long random string: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `ADMIN_EMAIL` | The email you will sign up with. This account becomes the admin. |

## Run

```bash
cd client
npm run dev          # starts the React app (5173) and the API (3000) together
```

Other options: `node server.js` (backend only, run from the root), or `npm run dev:client` in `client/` (frontend only).

## API

Database: **Portfolio**. Collections: **contacts, projects, qualifications, users**

| Resource | GET all | GET :id | POST | PUT :id | DELETE :id | DELETE all |
|---|---|---|---|---|---|---|
| `/api/contacts` | admin | admin | public | admin | admin | admin |
| `/api/projects` | public | public | admin | admin | admin | admin |
| `/api/qualifications` | public | public | admin | admin | admin | admin |
| `/api/users` | admin | owner/admin | public (sign up) | owner/admin | owner/admin | admin |

Authentication:

| Method | URL | Action |
|---|---|---|
| POST | `/auth/signin` | `{ email, password }` returns a JWT and also sets the `t` cookie |
| GET | `/auth/signout` | clears the `t` cookie |

To call a protected route, send the header `Authorization: Bearer <token>`.
`401` means you are not signed in. `403` means you are signed in but not allowed.

## Security notes

- Passwords are hashed with bcrypt and never returned in responses.
- Secrets live in `.env`, which is git-ignored.
- Invalid IDs return `400`, missing records return `404`, and validation errors return `400`.
- JWTs expire after 1 day. Sign-out clears the cookie. The client should also delete any token it stored.
