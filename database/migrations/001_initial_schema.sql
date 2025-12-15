-- AI-EOS Database Schema
-- 4-Layer Context Architecture: Working Context, Session, Memory, Artifacts

-- Enable pgvector extension for semantic search
CREATE EXTENSION IF NOT EXISTS vector;

-- ============================================================================
-- LAYER 2: SESSION CONTEXT (Append-only log)
-- ============================================================================

CREATE TABLE session_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL,
    user_id UUID NOT NULL,
    event_type VARCHAR(50) NOT NULL, -- 'UserMessage', 'AssistantMessage', 'ToolCall', 'MemoryEdit'
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    payload JSONB NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,

    -- Performance indexes
    CONSTRAINT valid_event_type CHECK (event_type IN (
        'UserMessage',
        'AssistantMessage',
        'ToolCall',
        'MemoryEdit',
        'DebateStart',
        'DebateEnd',
        'WorkflowStart',
        'WorkflowEnd'
    ))
);

CREATE INDEX idx_session_events_session_id ON session_events(session_id);
CREATE INDEX idx_session_events_user_id ON session_events(user_id);
CREATE INDEX idx_session_events_timestamp ON session_events(timestamp);
CREATE INDEX idx_session_events_type ON session_events(event_type);
CREATE INDEX idx_session_events_payload ON session_events USING GIN(payload);

-- ============================================================================
-- LAYER 3: LETTA CORE MEMORY (Editable, 2KB limit per user)
-- ============================================================================

CREATE TABLE letta_core_memory (
    user_id UUID PRIMARY KEY,
    core_memory JSONB NOT NULL,
    last_edited_at TIMESTAMPTZ DEFAULT NOW(),
    edit_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),

    -- Enforce 2KB limit
    CONSTRAINT core_memory_size CHECK (pg_column_size(core_memory) <= 2048)
);

-- Example Core Memory structure (for documentation):
-- {
--   "persona": {
--     "name": "Ali Rezaei",
--     "company": "Tehran Tech Solutions",
--     "role": "CEO",
--     "preferences": {
--       "formality": "formal",
--       "calendar": "jalali",
--       "language": "persian"
--     }
--   },
--   "context": {
--     "current_projects": ["ERP Migration", "Marketing Campaign Q1"],
--     "key_goals": ["Reduce costs 15%", "Hire 3 engineers"],
--     "recent_decisions": [
--       {
--         "decision": "Switch to Google Workspace",
--         "date": "1404/08/15",
--         "rationale": "Better collaboration"
--       }
--     ]
--   }
-- }

CREATE INDEX idx_core_memory_edited ON letta_core_memory(last_edited_at);

-- ============================================================================
-- LAYER 3: LETTA ARCHIVAL MEMORY (Unlimited semantic search)
-- ============================================================================

CREATE TABLE letta_archival_memory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    content TEXT NOT NULL,
    embedding vector(1536),  -- OpenAI text-embedding-3-small dimension
    created_at TIMESTAMPTZ DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb,

    -- Source tracking
    source_type VARCHAR(50), -- 'conversation', 'document', 'research'
    source_id UUID
);

CREATE INDEX idx_archival_user_id ON letta_archival_memory(user_id);
CREATE INDEX idx_archival_embedding ON letta_archival_memory USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX idx_archival_created ON letta_archival_memory(created_at);
CREATE INDEX idx_archival_source ON letta_archival_memory(source_type, source_id);

-- ============================================================================
-- LAYER 4: ARTIFACTS (Large files, lazy loading)
-- ============================================================================

CREATE TABLE artifacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    artifact_type VARCHAR(50) NOT NULL, -- 'pdf', 'spreadsheet', 'report', 'contract'
    file_name VARCHAR(500) NOT NULL,
    s3_key VARCHAR(500) NOT NULL,
    file_size_bytes BIGINT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb,

    -- Access tracking
    last_accessed_at TIMESTAMPTZ,
    access_count INT DEFAULT 0
);

CREATE INDEX idx_artifacts_user_id ON artifacts(user_id);
CREATE INDEX idx_artifacts_type ON artifacts(artifact_type);
CREATE INDEX idx_artifacts_created ON artifacts(created_at);

-- ============================================================================
-- AGENT LEARNING (Agent Lightning RL)
-- ============================================================================

CREATE TABLE agent_training_episodes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_name VARCHAR(100) NOT NULL,
    episode_data JSONB NOT NULL,  -- State-action-reward tuples
    reward FLOAT,
    user_feedback VARCHAR(20), -- 'thumbs_up', 'thumbs_down', 'neutral'
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    trained BOOLEAN DEFAULT FALSE,

    CONSTRAINT valid_feedback CHECK (user_feedback IN ('thumbs_up', 'thumbs_down', 'neutral', NULL))
);

CREATE INDEX idx_training_agent ON agent_training_episodes(agent_name);
CREATE INDEX idx_training_timestamp ON agent_training_episodes(timestamp);
CREATE INDEX idx_training_untrained ON agent_training_episodes(trained) WHERE trained = FALSE;

-- ============================================================================
-- AGENT POLICIES (Learned from RL)
-- ============================================================================

CREATE TABLE agent_policies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_name VARCHAR(100) NOT NULL,
    policy_weights JSONB NOT NULL,
    trained_at TIMESTAMPTZ DEFAULT NOW(),
    episodes_count INT NOT NULL,
    average_reward FLOAT,

    -- Versioning
    version INT NOT NULL,
    is_active BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_policies_agent ON agent_policies(agent_name);
CREATE INDEX idx_policies_active ON agent_policies(agent_name, is_active) WHERE is_active = TRUE;
CREATE INDEX idx_policies_version ON agent_policies(agent_name, version);

-- ============================================================================
-- USERS & SESSIONS
-- ============================================================================

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    company VARCHAR(255),
    tier VARCHAR(50) DEFAULT 'starter', -- 'starter', 'professional', 'enterprise'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_active_at TIMESTAMPTZ DEFAULT NOW(),

    -- Persian preferences
    preferences JSONB DEFAULT '{
        "language": "persian",
        "calendar": "jalali",
        "formality": "formal"
    }'::jsonb,

    CONSTRAINT valid_tier CHECK (tier IN ('starter', 'professional', 'enterprise'))
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_tier ON users(tier);

CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    started_at TIMESTAMPTZ DEFAULT NOW(),
    ended_at TIMESTAMPTZ,
    archived BOOLEAN DEFAULT FALSE,

    -- Session metadata
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_sessions_user ON sessions(user_id);
CREATE INDEX idx_sessions_active ON sessions(user_id, ended_at) WHERE ended_at IS NULL;
CREATE INDEX idx_sessions_archivable ON sessions(started_at) WHERE archived = FALSE AND ended_at < NOW() - INTERVAL '90 days';

-- ============================================================================
-- COST TRACKING
-- ============================================================================

CREATE TABLE llm_calls (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    session_id UUID REFERENCES sessions(id),
    model VARCHAR(100) NOT NULL, -- 'gemini-2.0-flash', 'claude-sonnet-4-5', etc.
    timestamp TIMESTAMPTZ DEFAULT NOW(),

    -- Token usage
    input_tokens INT NOT NULL,
    output_tokens INT NOT NULL,

    -- Cost calculation
    cost_usd DECIMAL(10, 6) NOT NULL,

    -- Performance
    latency_ms INT,

    -- Classification
    task_type VARCHAR(50), -- 'strategic', 'workflow', 'research'
    complexity_score FLOAT,

    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_llm_calls_user ON llm_calls(user_id);
CREATE INDEX idx_llm_calls_timestamp ON llm_calls(timestamp);
CREATE INDEX idx_llm_calls_model ON llm_calls(model);
CREATE INDEX idx_llm_calls_task_type ON llm_calls(task_type);

-- ============================================================================
-- MULTI-AGENT DEBATES
-- ============================================================================

CREATE TABLE debates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    session_id UUID REFERENCES sessions(id),

    -- Debate content
    user_request TEXT NOT NULL,
    analyst_findings JSONB,
    strategist_plans JSONB,
    critic_concerns JSONB,
    arbiter_decision TEXT,

    -- Confidence scores
    raw_confidences JSONB,
    calibrated_confidences JSONB,
    consensus_confidence FLOAT,

    -- Timing
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    duration_seconds INT,

    -- User feedback
    user_feedback VARCHAR(20),

    CONSTRAINT valid_debate_feedback CHECK (user_feedback IN ('thumbs_up', 'thumbs_down', 'neutral', NULL))
);

CREATE INDEX idx_debates_user ON debates(user_id);
CREATE INDEX idx_debates_session ON debates(session_id);
CREATE INDEX idx_debates_timestamp ON debates(started_at);
CREATE INDEX idx_debates_confidence ON debates(consensus_confidence);

-- ============================================================================
-- WORKFLOW EXECUTIONS
-- ============================================================================

CREATE TABLE workflow_executions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    session_id UUID REFERENCES sessions(id),

    -- Workflow details
    workflow_type VARCHAR(50) NOT NULL, -- 'email', 'meeting', 'document', 'calendar', 'financial'
    agent_name VARCHAR(100) NOT NULL,

    -- Execution
    user_request TEXT NOT NULL,
    tools_called JSONB, -- Array of tool calls
    result TEXT,

    -- Timing
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    duration_seconds INT,

    -- Status
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'in_progress', 'completed', 'failed'
    error_message TEXT,

    CONSTRAINT valid_workflow_status CHECK (status IN ('pending', 'in_progress', 'completed', 'failed'))
);

CREATE INDEX idx_workflow_user ON workflow_executions(user_id);
CREATE INDEX idx_workflow_type ON workflow_executions(workflow_type);
CREATE INDEX idx_workflow_status ON workflow_executions(status);
CREATE INDEX idx_workflow_timestamp ON workflow_executions(started_at);

-- ============================================================================
-- VIEWS FOR ANALYTICS
-- ============================================================================

-- Daily cost per user
CREATE VIEW daily_costs AS
SELECT
    user_id,
    DATE(timestamp) as date,
    COUNT(*) as call_count,
    SUM(cost_usd) as total_cost,
    AVG(latency_ms) as avg_latency,
    SUM(CASE WHEN model LIKE '%gemini%' THEN 1 ELSE 0 END) as gemini_calls,
    SUM(CASE WHEN model LIKE '%claude%' THEN 1 ELSE 0 END) as claude_calls
FROM llm_calls
GROUP BY user_id, DATE(timestamp);

-- User activity summary
CREATE VIEW user_activity AS
SELECT
    u.id,
    u.email,
    u.tier,
    COUNT(DISTINCT s.id) as total_sessions,
    COUNT(d.id) as total_debates,
    COUNT(w.id) as total_workflows,
    SUM(l.cost_usd) as total_spend,
    MAX(u.last_active_at) as last_active
FROM users u
LEFT JOIN sessions s ON u.id = s.user_id
LEFT JOIN debates d ON u.id = d.user_id
LEFT JOIN workflow_executions w ON u.id = w.user_id
LEFT JOIN llm_calls l ON u.id = l.user_id
GROUP BY u.id, u.email, u.tier;

-- Agent performance metrics
CREATE VIEW agent_performance AS
SELECT
    agent_name,
    COUNT(*) as total_episodes,
    AVG(reward) as avg_reward,
    SUM(CASE WHEN user_feedback = 'thumbs_up' THEN 1 ELSE 0 END)::FLOAT /
        NULLIF(SUM(CASE WHEN user_feedback IS NOT NULL THEN 1 ELSE 0 END), 0) as approval_rate,
    MAX(timestamp) as last_trained
FROM agent_training_episodes
WHERE trained = TRUE
GROUP BY agent_name;

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Function to archive old sessions
CREATE OR REPLACE FUNCTION archive_old_sessions()
RETURNS INTEGER AS $$
DECLARE
    archived_count INTEGER;
BEGIN
    -- Archive sessions older than 90 days
    WITH archived AS (
        UPDATE sessions
        SET archived = TRUE
        WHERE ended_at < NOW() - INTERVAL '90 days'
          AND archived = FALSE
        RETURNING id
    )
    SELECT COUNT(*) INTO archived_count FROM archived;

    RETURN archived_count;
END;
$$ LANGUAGE plpgsql;

-- Function to get user's working context
CREATE OR REPLACE FUNCTION get_working_context(p_user_id UUID, p_session_id UUID)
RETURNS JSONB AS $$
DECLARE
    context JSONB;
BEGIN
    SELECT jsonb_build_object(
        'core_memory', cm.core_memory,
        'recent_events', (
            SELECT jsonb_agg(payload ORDER BY timestamp DESC)
            FROM (
                SELECT payload, timestamp
                FROM session_events
                WHERE session_id = p_session_id
                ORDER BY timestamp DESC
                LIMIT 20
            ) recent
        ),
        'session_start', s.started_at,
        'user_preferences', u.preferences
    )
    INTO context
    FROM users u
    LEFT JOIN letta_core_memory cm ON u.id = cm.user_id
    LEFT JOIN sessions s ON s.id = p_session_id
    WHERE u.id = p_user_id;

    RETURN context;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- SEED DATA (for testing)
-- ============================================================================

-- Insert a test user
INSERT INTO users (email, name, company, tier, preferences)
VALUES (
    'ali.rezaei@tehrantech.ir',
    'Ali Rezaei',
    'Tehran Tech Solutions',
    'professional',
    '{
        "language": "persian",
        "calendar": "jalali",
        "formality": "formal"
    }'::jsonb
) ON CONFLICT (email) DO NOTHING;

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE session_events IS '4-Layer Context: Session layer - append-only event log';
COMMENT ON TABLE letta_core_memory IS '4-Layer Context: Memory layer - editable 2KB profile';
COMMENT ON TABLE letta_archival_memory IS '4-Layer Context: Memory layer - unlimited semantic search';
COMMENT ON TABLE artifacts IS '4-Layer Context: Artifact layer - lazy-loaded large files';
COMMENT ON TABLE agent_training_episodes IS 'Agent Lightning RL: Training episodes with TAD+AIR';
COMMENT ON TABLE debates IS 'Multi-agent strategic debates with ConfMAD calibration';
COMMENT ON TABLE workflow_executions IS 'Single-agent workflow executions (email, meeting, etc.)';
