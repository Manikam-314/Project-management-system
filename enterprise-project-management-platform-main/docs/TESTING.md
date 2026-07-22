# Testing and QA

## Test Coverage

AuroraPM includes tests across the frontend, backend, e2e workflow, manifests, and Docker build surfaces.

## Frontend Tests

Location:

```text
apps/web/tests
```

Tools:

- Vitest
- Testing Library
- Playwright

Covered behavior:

- Demo login
- Invalid credentials
- Logout
- Global search
- Kanban task movement
- Comment creation
- File upload simulation
- Domain analytics logic
- Demo account validation

Commands:

```bash
cd apps/web
npm run lint
npm run test
npm run build
npm run test:e2e
```

## Backend Tests

Location:

```text
services/api/src/test/java/com/aurora/pm/ApiSmokeTest.java
```

Tools:

- Spring Boot Test
- MockMvc
- Spring Security Test

Covered behavior:

- Admin demo login returns token
- Invalid demo credentials return `401`
- Dashboard requires authentication
- Authenticated search returns expected task

Command:

```bash
cd services/api
mvn test
```

## CI Tests

GitHub Actions workflow:

```text
.github/workflows/ci.yml
```

Jobs:

| Job | Purpose |
| --- | --- |
| Web checks | Installs dependencies, lints, runs Vitest, builds Next.js |
| API checks | Runs Maven tests |
| Kubernetes manifests | Renders manifests with Kustomize |
| Docker images | Builds web and API Docker images |

## Verified Workflows

The following flows are covered by local and CI validation:

- Login as admin
- Reject invalid credentials
- Logout
- Search for Redis notification task
- Move task `CPT-87` to `In Progress`
- Add a comment
- Add a sample file
- Build frontend production bundle
- Build backend application
- Build Docker images
- Render Kubernetes manifests

## Manual Smoke Test

1. Open the live demo.

```text
https://web-gamma-dun-44.vercel.app
```

2. Login as admin.

```text
admin@aurorapm.io
Admin@123
```

3. Confirm dashboard loads.

4. Search `redis`.

5. Move `CPT-87` to `In Progress`.

6. Add a comment.

7. Add a sample file.

8. Logout.

## Known Limits

- The deployed frontend uses seeded demo data.
- Full backend cloud runtime requires real production secrets and infrastructure.
- S3 upload endpoint currently returns a contract-style response for integration handoff.
.