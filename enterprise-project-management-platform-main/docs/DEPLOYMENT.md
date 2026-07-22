# Deployment Guide

## Frontend Demo Deployment

Current live demo:

```text
https://web-gamma-dun-44.vercel.app
```

The frontend is deployed from `apps/web` to Vercel.

Redeploy command:

```bash
cd apps/web
npx vercel@latest --prod --yes
```

The Vercel project currently reports:

- Target: production
- Status: Ready
- Framework: Next.js

## Local Full Stack

Requirements:

- Docker
- Docker Compose

Command:

```bash
docker compose up --build
```

Services:

| Service | Port | Purpose |
| --- | --- | --- |
| Web | `3000` | Next.js frontend |
| API | `8080` | Spring Boot backend |
| PostgreSQL | `5432` | Database |
| Redis | `6379` | Cache |
| MinIO | `9000`, `9001` | S3-compatible local storage |

## Backend Local Run

Requirements:

- Java 11
- Maven
- PostgreSQL if running with real database connectivity
- Redis if running cache-backed flows

Command:

```bash
cd services/api
mvn spring-boot:run
```

## Kubernetes Deployment

Manifests live in `infra/k8s`.

Included resources:

- Namespace
- ConfigMap
- Secret example
- PostgreSQL
- Redis
- API deployment and service
- Web deployment and service
- Ingress
- HorizontalPodAutoscaler
- Kustomization entrypoint

### Steps

1. Build and publish container images.

```bash
docker build -t ghcr.io/aishu-star/enterprise-project-management-platform-web:latest apps/web
docker build -t ghcr.io/aishu-star/enterprise-project-management-platform-api:latest services/api
```

2. Update image tags in:

```text
infra/k8s/web.yaml
infra/k8s/api.yaml
```

3. Create real secrets from:

```text
infra/k8s/secrets.example.yaml
```

4. Apply manifests.

```bash
kubectl apply -f infra/k8s
```

5. Verify rollout.

```bash
kubectl -n aurora-pm get pods
kubectl -n aurora-pm get svc
kubectl -n aurora-pm get ingress
```

## Required Production Secrets

| Secret | Purpose |
| --- | --- |
| `DATABASE_URL` | PostgreSQL JDBC connection |
| `POSTGRES_USER` | Database user |
| `POSTGRES_PASSWORD` | Database password |
| `API_BASIC_USER` | Temporary demo protected-route user |
| `API_BASIC_PASSWORD` | Temporary demo protected-route password |
| `AWS_ACCESS_KEY_ID` | S3 access key |
| `AWS_SECRET_ACCESS_KEY` | S3 secret key |

## Production Hardening Checklist

- Replace demo credentials with OAuth/OIDC or SSO.
- Use managed PostgreSQL with backups.
- Use managed Redis.
- Use a real S3 bucket and least-privilege IAM.
- Store secrets in a cloud secret manager or sealed Kubernetes secrets.
- Configure TLS and production ingress.
- Add monitoring, metrics, and logs.
- Add rate limiting for auth and upload routes.
- Configure container image scanning.
- Enable database migration automation.

## CI/CD

Current GitHub Actions jobs:

- Web checks
- API checks
- Kubernetes manifest render
- Docker image builds

The Docker image job ensures both web and API Dockerfiles build successfully on a clean runner.
 