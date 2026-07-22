-- Phase 2 & 3: Projects, Work Items, Boards & Sprints

CREATE TABLE projects (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    key             VARCHAR(20) NOT NULL,
    name            VARCHAR(200) NOT NULL,
    description     TEXT,
    lead_id         UUID REFERENCES users(id),
    status          VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by      UUID,
    updated_by      UUID,
    version         BIGINT NOT NULL DEFAULT 0,
    UNIQUE(organization_id, key)
);

CREATE INDEX idx_projects_org ON projects(organization_id);

CREATE TABLE project_members (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id      UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role            VARCHAR(30) NOT NULL DEFAULT 'MEMBER',
    joined_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(project_id, user_id)
);

CREATE TABLE sprints (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id      UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name            VARCHAR(200) NOT NULL,
    goal            TEXT,
    status          VARCHAR(20) NOT NULL DEFAULT 'PLANNED',
    start_date      TIMESTAMPTZ,
    end_date        TIMESTAMPTZ,
    completed_at    TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by      UUID,
    updated_by      UUID,
    version         BIGINT NOT NULL DEFAULT 0
);

CREATE INDEX idx_sprints_project ON sprints(project_id);

CREATE TABLE boards (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id      UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name            VARCHAR(200) NOT NULL,
    is_default      BOOLEAN NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by      UUID,
    updated_by      UUID,
    version         BIGINT NOT NULL DEFAULT 0
);

CREATE TABLE board_columns (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    board_id        UUID NOT NULL REFERENCES boards(id) ON DELETE CASCADE,
    name            VARCHAR(100) NOT NULL,
    position        INT NOT NULL DEFAULT 0,
    wip_limit       INT NOT NULL DEFAULT 0,
    category        VARCHAR(30) NOT NULL DEFAULT 'TODO'
);

CREATE INDEX idx_board_columns_board ON board_columns(board_id);

CREATE TABLE work_items (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    project_id      UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    key             VARCHAR(50) NOT NULL UNIQUE,
    title           VARCHAR(300) NOT NULL,
    description     TEXT,
    type            VARCHAR(30) NOT NULL DEFAULT 'STORY',
    status          VARCHAR(50) NOT NULL DEFAULT 'To Do',
    priority        VARCHAR(30) NOT NULL DEFAULT 'MEDIUM',
    story_points    INT NOT NULL DEFAULT 0,
    assignee_id     UUID REFERENCES users(id),
    reporter_id     UUID REFERENCES users(id),
    parent_id       UUID REFERENCES work_items(id) ON DELETE SET NULL,
    sprint_id       UUID REFERENCES sprints(id) ON DELETE SET NULL,
    board_column_id UUID REFERENCES board_columns(id) ON DELETE SET NULL,
    position        DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    due_date        TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by      UUID,
    updated_by      UUID,
    version         BIGINT NOT NULL DEFAULT 0
);

CREATE INDEX idx_work_items_org ON work_items(organization_id);
CREATE INDEX idx_work_items_project ON work_items(project_id);
CREATE INDEX idx_work_items_sprint ON work_items(sprint_id);
CREATE INDEX idx_work_items_assignee ON work_items(assignee_id);
CREATE INDEX idx_work_items_parent ON work_items(parent_id);

CREATE TABLE labels (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name            VARCHAR(100) NOT NULL,
    color           VARCHAR(20) NOT NULL DEFAULT '#3b82f6',
    UNIQUE(organization_id, name)
);

CREATE TABLE work_item_labels (
    work_item_id    UUID NOT NULL REFERENCES work_items(id) ON DELETE CASCADE,
    label_id        UUID NOT NULL REFERENCES labels(id) ON DELETE CASCADE,
    PRIMARY KEY (work_item_id, label_id)
);

CREATE TABLE acceptance_criteria (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    work_item_id    UUID NOT NULL REFERENCES work_items(id) ON DELETE CASCADE,
    text            TEXT NOT NULL,
    completed       BOOLEAN NOT NULL DEFAULT FALSE,
    position        INT NOT NULL DEFAULT 0
);
