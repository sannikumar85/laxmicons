# Frontend API Contract

Base URL: `http://localhost:5000/api`

## Auth
POST `/auth/register`
POST `/auth/login`
GET `/auth/me`
POST `/auth/forgot-password`
POST `/auth/reset-password/:token`
PUT `/auth/change-password`

## User
GET `/users/me`
PUT `/users/me` (multipart, optional `avatar`)
DELETE `/users/me`
GET `/users/notifications`
PATCH `/users/notifications/:id/read`
PATCH `/users/notifications/read-all`
DELETE `/users/notifications/:id`
PATCH `/users/notification-preferences`

## Projects
GET `/projects`
GET `/projects/:id`
GET `/projects/mine`
POST `/projects` admin, multipart
PUT `/projects/:id` admin, multipart
DELETE `/projects/:id` admin

## Service Requests
POST `/service-requests`
GET `/service-requests/mine`
GET `/service-requests/:id`
PATCH `/service-requests/:id/cancel`
GET `/service-requests` admin
PATCH `/service-requests/:id/status` admin
DELETE `/service-requests/:id` admin

## Labour
GET `/labour`
GET `/labour/:id`
POST `/labour/requests`
GET `/labour/requests/mine`
GET `/labour/requests/:id`
PATCH `/labour/requests/:id/cancel`
GET `/labour/admin/requests` admin
PATCH `/labour/admin/requests/:id/status` admin
POST `/labour/admin` admin, multipart
PUT `/labour/admin/:id` admin, multipart
DELETE `/labour/admin/:id` admin

## Jobs
GET `/jobs`
GET `/jobs/:id`
POST `/jobs/:id/apply` multipart
GET `/jobs/applications/mine`
GET `/jobs/applications/:id`
POST `/jobs` admin
PUT `/jobs/:id` admin
DELETE `/jobs/:id` admin
GET `/jobs/admin/applications/all` admin
PATCH `/jobs/admin/applications/:id/status` admin
DELETE `/jobs/admin/applications/:id` admin

## Admin
GET `/admin/stats`
GET `/admin/dashboard`
GET `/admin/settings`
PUT `/admin/settings`

## Contact
POST `/contact`
GET `/contact` admin
GET `/contact/:id` admin
PATCH `/contact/:id/read` admin
DELETE `/contact/:id` admin

## Chatbot
POST `/chatbot/chat`
