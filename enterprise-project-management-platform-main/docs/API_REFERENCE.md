# API Reference

Base URL for local API: `http://localhost:8080`

Protected demo routes use HTTP Basic by default:

- Username: `admin@aurorapm.io`
- Password: `Admin@123`

## Authentication

### POST `/api/auth/login`

Logs in with a supported demo account.

Request:

```json
{
  "email": "admin@aurorapm.io",
  "password": "Admin@123"
}
```

Successful response:

```json
{
  "token": "demo-token-admin",
  "user": {
    "id": "u4",
    "name": "Iris Morgan",
    "email": "admin@aurorapm.io",
    "role": "Admin"
  }
}
```

Invalid credentials return `401 Unauthorized`.

Member demo request:

```json
{
  "email": "member@aurorapm.io",
  "password": "Member@123"
}
```

## Dashboard

### GET `/api/dashboard`

Returns the complete workspace summary.

Authentication: HTTP Basic

Response includes:

- Organization
- Users
- Teams
- Projects
- Sprints
- Tasks
- Notifications
- Analytics

Example:

```bash
curl -u admin@aurorapm.io:Admin@123 http://localhost:8080/api/dashboard
```

## Projects

### GET `/api/projects`

Returns all projects.

Authentication: HTTP Basic

Example:

```bash
curl -u admin@aurorapm.io:Admin@123 http://localhost:8080/api/projects
```

## Tasks

### GET `/api/tasks`

Returns all tasks.

Authentication: HTTP Basic

### PATCH `/api/tasks/{taskId}/status`

Updates task status.

Authentication: HTTP Basic

Request:

```json
{
  "status": "In Progress"
}
```

Supported statuses:

- Backlog
- Todo
- In Progress
- Review
- Done

## Comments

### GET `/api/comments`

Returns comments.

Authentication: HTTP Basic

### POST `/api/comments`

Adds a comment.

Authentication: HTTP Basic

Request:

```json
{
  "taskId": "task-1",
  "body": "Backend contract looks ready."
}
```

## Search

### GET `/api/search?q={query}`

Returns matching tasks.

Authentication: HTTP Basic

Example:

```bash
curl -u admin@aurorapm.io:Admin@123 "http://localhost:8080/api/search?q=redis"
```

## Analytics

### GET `/api/analytics`

Returns delivery analytics.

Authentication: HTTP Basic

Response fields:

- `completed`
- `inFlight`
- `criticalOpen`
- `totalPoints`
- `completedPoints`

## Uploads

### POST `/api/uploads/presign`

Returns an S3-style presigned upload contract.

Authentication: HTTP Basic

Request:

```json
{
  "fileName": "release-plan.pdf",
  "contentType": "application/pdf",
  "sizeBytes": 204800,
  "projectId": "p1"
}
```

Response:

```json
{
  "uploadUrl": "https://s3.example.com/upload",
  "storageKey": "projects/p1/release-plan.pdf",
  "expiresIn": "15m"
}
```

Production implementation should replace the placeholder URL with a real AWS S3 presigned URL.

