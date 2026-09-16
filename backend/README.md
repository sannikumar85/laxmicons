# Laxmi Construction Backend

MERN backend API for the Laxmi Construction website.

## Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT authentication
- bcrypt password hashing
- Multer file uploads
- Nodemailer (optional)
- Helmet, CORS, rate limiting

## 1. Install

```bash
cd backend
npm install
```

## 2. Configure `.env`

The project includes a `.env` template. Replace at minimum:

- `MONGO_URI`
- `JWT_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

For production also set a real `CLIENT_URL`.

Email and AI variables are optional.

## 3. Run

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

API:
`http://localhost:5000`

Health check:
`http://localhost:5000/api/health`

## Frontend connection

Set the frontend `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## Main API groups

- `/api/auth`
- `/api/users`
- `/api/projects`
- `/api/service-requests`
- `/api/labour`
- `/api/jobs`
- `/api/admin`
- `/api/contact`
- `/api/chatbot`

## Authentication

Send:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

Admin is automatically seeded from `ADMIN_EMAIL` and `ADMIN_PASSWORD` on server startup.

## Important frontend response shape

Successful API responses follow:

```json
{
  "success": true,
  "message": "Success",
  "data": {}
}
```

Errors follow:

```json
{
  "success": false,
  "message": "Error message"
}
```

## Uploads

Uploaded images/resumes are stored in `uploads/` during development.

For production, replace local uploads with a cloud object-storage provider such as Azure Blob Storage, AWS S3, Cloudinary, etc.

## AI chatbot

Without AI credentials, `/api/chatbot/chat` uses a local FAQ response.

To connect a compatible provider, configure:

```env
AI_API_URL=
AI_API_KEY=
AI_MODEL=
```

Do not put an AI API key in the React frontend.

## Security checklist before deployment

1. Use a strong random `JWT_SECRET`.
2. Use a strong admin password.
3. Use HTTPS.
4. Set a specific production `CLIENT_URL`.
5. Move file uploads to cloud storage.
6. Configure SMTP credentials only on the backend.
7. Add MongoDB network/IP restrictions.
8. Review rate limits and upload limits.
9. Never commit `.env`.
