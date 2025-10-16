-- Add Missing RLS Policies for Complete Security

-- Prevent updates on credit_transactions (should be immutable)
CREATE POLICY "Prevent updates on credit transactions" ON credit_transactions
  FOR UPDATE USING (false);

CREATE POLICY "Prevent deletes on credit transactions" ON credit_transactions
  FOR DELETE USING (false);

-- Allow users to update their own content generations
CREATE POLICY "Users can update own generations" ON content_generations
  FOR UPDATE USING (auth.uid() = user_id);

-- Allow users to delete their own content generations
CREATE POLICY "Users can delete own generations" ON content_generations
  FOR DELETE USING (auth.uid() = user_id);

-- Add missing policies for accounts table
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own accounts" ON accounts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can insert accounts" ON accounts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Prevent account updates" ON accounts
  FOR UPDATE USING (false);

CREATE POLICY "Prevent account deletes" ON accounts
  FOR DELETE USING (false);

-- Add missing policies for sessions table  
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own sessions" ON sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can manage sessions" ON sessions
  FOR ALL USING (true);

-- Add missing policies for verification_tokens
ALTER TABLE verification_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "System can manage verification tokens" ON verification_tokens
  FOR ALL USING (true);

-- Comment
COMMENT ON POLICY "Prevent updates on credit transactions" ON credit_transactions IS 'Credit transactions are immutable for audit trail integrity';

