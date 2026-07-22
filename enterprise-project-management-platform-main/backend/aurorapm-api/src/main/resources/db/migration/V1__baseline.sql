-- AuroraPM Phase 0 baseline migration
-- Enables required PostgreSQL extensions for future AI (pgvector) and UUID generation.

CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "vector";

-- Schema version marker for operational visibility
CREATE TABLE IF NOT EXISTS aurorapm_schema_info (
    id          SMALLINT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    version     VARCHAR(32)  NOT NULL,
    description TEXT         NOT NULL,
    applied_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

INSERT INTO aurorapm_schema_info (version, description)
VALUES ('0.1.0', 'Phase 0 foundation — extensions and schema marker')
ON CONFLICT (id) DO NOTHING;
