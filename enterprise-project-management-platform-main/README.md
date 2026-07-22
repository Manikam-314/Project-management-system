# AuroraPM

Enterprise AI-powered project management platform — **Phase 0 Foundation**.

## Phase 0 Scope

- Maven multi-module backend (Java 21, Spring Boot 3.4)
- Next.js 15 frontend shell with shadcn/ui, TanStack Query, Zustand
- PostgreSQL (pgvector), Redis, MinIO via Docker Compose
- Flyway baseline migration, Swagger/OpenAPI, RFC 7807 errors
- Spring Security configuration (no authentication yet)
- TenantContext stub, GitHub Actions CI

Authentication, organizations, and work items arrive in Phase 1+.

## Repository Layout

```text
backend/                 Maven multi-module Spring Boot API
  aurorapm-common/       Shared kernel (BaseEntity, exceptions, TenantContext)
  aurorapm-identity/     Identity module skeleton (Phase 1)
  aurorapm-organization/ Organization module skeleton (Phase 1)
  aurorapm-authorization/ Authorization module skeleton (Phase 1)
  aurorapm-api/          Spring Boot application entry point
apps/web/                Next.js 15 frontend
infra/docker/            Dockerfiles
infra/k8s/               Kubernetes manifests
.github/workflows/       CI pipelines
```

## Prerequisites

- Java 21+
- Maven 3.9+
- Node.js 22+
- Docker & Docker Compose (for full stack)

## Quick Start (Docker Compose)

```bash
docker compose up --build
```

| Service   | URL |
|-----------|-----|
| Web       | http://localhost:3000 |
| API       | http://localhost:8080 |
| Swagger   | http://localhost:8080/swagger-ui.html |
| MinIO     | http://localhost:9001 (minioadmin / minioadmin) |

## Local Development

### Backend

```bash
# Start infrastructure only
docker compose up postgres redis minio -d

# Run API
cd backend
mvn -pl aurorapm-api -am spring-boot:run
```

### Frontend

```bash
cd apps/web
npm install
npm run dev
```

Copy environment examples:

```bash
cp backend/aurorapm-api/.env.example backend/aurorapm-api/.env
cp apps/web/.env.example apps/web/.env.local
```

## API Endpoints (Phase 0)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/system/health` | Application health |
| GET | `/actuator/health` | Spring Actuator health |
| GET | `/actuator/prometheus` | Prometheus metrics |
| GET | `/swagger-ui.html` | OpenAPI documentation |

Optional header: `X-Organization-Id: <uuid>` — tenant context stub.

## Test Commands

```bash
# Backend
cd backend && mvn verify

# Frontend
cd apps/web && npm run lint && npm run test && npm run build
```

## CI/CD

GitHub Actions runs on every push/PR:

- Backend: `mvn verify` (Java 21)
- Frontend: lint, unit tests, production build
- Docker image builds
- Kubernetes manifest validation
