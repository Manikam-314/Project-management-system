# Project Details

## Product Name

AuroraPM Enterprise Project Management Platform

## Product Vision

AuroraPM is designed as a combined planning, execution, documentation, and collaboration workspace for software and operations teams. The product direction is "Jira + Notion + Slack" in one enterprise command center.

## Target Users

| Persona | Needs |
| --- | --- |
| Organization admin | Manage organization access, teams, permissions, and operational visibility |
| Product manager | Plan projects, prioritize work, monitor milestones, and review delivery health |
| Engineering manager | Plan sprint capacity, track throughput, unblock critical work |
| Engineer | Move assigned tasks, comment, search context, upload delivery artifacts |
| Executive stakeholder | Review analytics, project risk, completion rate, and upcoming milestones |

## Feature Scope

### Authentication

- Demo login screen
- Admin and member demo accounts
- Invalid credential error state
- Logout
- Backend `/api/auth/login` endpoint
- HTTP Basic protection for backend demo routes

### Organizations

- Organization summary
- Enterprise command-center framing
- Multi-team workspace model

### Teams

- Team capacity cards
- Team leads
- Sprint planning capacity visualizations

### Projects

- Project health status
- Project progress
- Project key
- Project due date
- Task filtering by project

### Tasks

- Task key
- Task title
- Assignee
- Priority
- Sprint
- Story points
- Due date
- Labels
- Status movement

### Sprint Planning

- Active sprint summary
- Sprint goal
- Committed points
- Velocity percentage
- Team capacity

### Kanban Board

Workflow lanes:

- Backlog
- Todo
- In Progress
- Review
- Done

Supported actions:

- Move task between statuses
- Filter by project
- Search tasks

### Calendar

Milestone types:

- Sprint
- Review
- Release
- Planning

### File Upload

- S3-style storage keys
- Upload simulation in frontend
- Backend presign endpoint contract
- File list in workspace

### Notifications

- Slack-style inbox
- Severity labels
- Time metadata

### Comments

- Threaded discussion panel
- Add-comment workflow
- Test-covered user interaction

### Activity Timeline

- Actor identity
- Action text
- Target entity
- Timestamp

### Search

Search covers:

- Task title
- Task key
- Labels
- Project names
- Assignees
- Status

### Analytics Dashboard

Metrics:

- Completion rate
- In-flight work
- Critical open tasks
- Completed points
- Total points
- Velocity trend

## Demo Credentials

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@aurorapm.io` | `Admin@123` |
| Member | `member@aurorapm.io` | `Member@123` |

## Current Demo Behavior

The deployed frontend uses local seeded workspace data so the demo can run without cloud infrastructure. The backend API exposes matching enterprise surfaces and is validated through automated tests and Docker builds.

## Production Readiness Notes

Already included:

- Production-style frontend build
- Spring Boot API contracts
- Database migration
- Dockerfiles
- Docker Compose
- Kubernetes manifests
- CI checks
- E2E workflow tests

Still required for a real customer deployment:

- Real OAuth/OIDC or JWT auth provider
- Managed PostgreSQL
- Managed Redis
- Real AWS S3 bucket and IAM policy
- Container registry
- Kubernetes cluster
- Domain, TLS, ingress, and secret management
- Monitoring and alerting
