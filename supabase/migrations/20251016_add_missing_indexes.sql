-- Add Missing Database Indexes for Performance
-- Critical for auth performance and query optimization

-- Index on sessions table (most critical - queried on every request)
CREATE INDEX IF NOT EXISTS idx_sessions_session_token ON sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires);

-- Index on accounts table (queried during OAuth)
CREATE INDEX IF NOT EXISTS idx_accounts_user_id ON accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_accounts_provider_account ON accounts(provider, provider_account_id);

-- Index on verification_tokens for faster lookup
CREATE INDEX IF NOT EXISTS idx_verification_tokens_token ON verification_tokens(token);
CREATE INDEX IF NOT EXISTS idx_verification_tokens_identifier ON verification_tokens(identifier);

-- Add constraint to prevent negative credits
ALTER TABLE users ADD CONSTRAINT check_credits_non_negative CHECK (credits >= 0);

-- Comment
COMMENT ON INDEX idx_sessions_session_token IS 'Critical index for session lookup on every authenticated request';
COMMENT ON INDEX idx_accounts_user_id IS 'Optimize OAuth account lookups';

