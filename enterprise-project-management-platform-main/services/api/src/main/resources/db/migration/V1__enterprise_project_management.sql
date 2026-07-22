CREATE TABLE organizations (
  id UUID PRIMARY KEY,
  name VARCHAR(160) NOT NULL,
  plan VARCHAR(80) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE teams (
  id UUID PRIMARY KEY,
  organization_id UUID NOT NULL REFERENCES organizations(id),
  name VARCHAR(160) NOT NULL,
  lead_user_id UUID,
  capacity INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE projects (
  id UUID PRIMARY KEY,
  organization_id UUID NOT NULL REFERENCES organizations(id),
  team_id UUID REFERENCES teams(id),
  project_key VARCHAR(16) NOT NULL,
  name VARCHAR(180) NOT NULL,
  health VARCHAR(40) NOT NULL,
  progress INTEGER NOT NULL DEFAULT 0,
  due_date DATE
);

CREATE TABLE sprints (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES projects(id),
  name VARCHAR(120) NOT NULL,
  goal TEXT,
  starts_at DATE NOT NULL,
  ends_at DATE NOT NULL,
  committed_points INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE tasks (
  id UUID PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES projects(id),
  sprint_id UUID REFERENCES sprints(id),
  task_key VARCHAR(32) NOT NULL,
  title VARCHAR(240) NOT NULL,
  status VARCHAR(60) NOT NULL,
  priority VARCHAR(40) NOT NULL,
  story_points INTEGER NOT NULL DEFAULT 0,
  due_date DATE,
  search_vector tsvector
);

CREATE TABLE comments (
  id UUID PRIMARY KEY,
  task_id UUID NOT NULL REFERENCES tasks(id),
  author_user_id UUID,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE file_assets (
  id UUID PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES projects(id),
  name VARCHAR(240) NOT NULL,
  content_type VARCHAR(120) NOT NULL,
  byte_size BIGINT NOT NULL,
  s3_key TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX tasks_search_vector_idx ON tasks USING gin(search_vector);
CREATE INDEX tasks_project_status_idx ON tasks(project_id, status);
CREATE INDEX comments_task_created_idx ON comments(task_id, created_at DESC);
