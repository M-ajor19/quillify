-- Quillify Database Schema
-- Run this in your Supabase SQL editor

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret-here';

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  name TEXT CHECK (LENGTH(name) <= 255),
  email_verified TIMESTAMP WITH TIME ZONE, -- For magic link verification
  image TEXT CHECK (LENGTH(image) <= 500), -- URL length limit
  credits INTEGER DEFAULT 3 CHECK (credits >= 0), -- Prevent negative credits
  -- Professional data from LinkedIn
  job_title TEXT CHECK (LENGTH(job_title) <= 255),
  company TEXT CHECK (LENGTH(company) <= 255),
  industry TEXT CHECK (LENGTH(industry) <= 100),
  -- Auth provider info
  auth_provider TEXT DEFAULT 'email' CHECK (auth_provider IN ('email', 'google', 'linkedin', 'azure')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create verification tokens table for magic links
CREATE TABLE IF NOT EXISTS verification_tokens (
  identifier TEXT NOT NULL,
  token TEXT NOT NULL,
  expires TIMESTAMP WITH TIME ZONE NOT NULL,
  PRIMARY KEY (identifier, token)
);

-- Create accounts table for OAuth
CREATE TABLE IF NOT EXISTS accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  provider TEXT NOT NULL,
  provider_account_id TEXT NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at INTEGER,
  token_type TEXT,
  scope TEXT,
  id_token TEXT,
  session_state TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(provider, provider_account_id)
);

-- Create sessions table for JWT sessions
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_token TEXT NOT NULL UNIQUE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  expires TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create credit_transactions table for tracking purchases
CREATE TABLE IF NOT EXISTS credit_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL CHECK (
    (type = 'purchase' AND amount > 0 AND amount <= 1000) OR 
    (type = 'usage' AND amount < 0 AND amount >= -10) OR
    (type = 'bonus' AND amount > 0 AND amount <= 100)
  ),
  type TEXT NOT NULL CHECK (type IN ('purchase', 'usage', 'bonus')),
  stripe_payment_intent_id TEXT CHECK (LENGTH(stripe_payment_intent_id) <= 100),
  stripe_checkout_session_id TEXT CHECK (LENGTH(stripe_checkout_session_id) <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(stripe_checkout_session_id) -- prevent duplicate processing
);

-- Create content_generations table for tracking usage
CREATE TABLE IF NOT EXISTS content_generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  input_text TEXT NOT NULL CHECK (LENGTH(input_text) <= 10000), -- Reasonable limit
  output_text TEXT NOT NULL CHECK (LENGTH(output_text) <= 50000), -- Generated content limit
  format TEXT NOT NULL CHECK (format IN ('tweet', 'linkedin', 'quote-graphic', 'testimonial', 'review')),
  tone TEXT NOT NULL CHECK (tone IN ('professional', 'enthusiastic', 'witty', 'conversational', 'authoritative')),
  credits_used INTEGER DEFAULT 1 CHECK (credits_used > 0 AND credits_used <= 10), -- Reasonable credit limit
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_generations ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Create policies for credit_transactions table
CREATE POLICY "Users can view own transactions" ON credit_transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can insert transactions" ON credit_transactions
  FOR INSERT WITH CHECK (true);

-- Create policies for content_generations table
CREATE POLICY "Users can view own generations" ON content_generations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own generations" ON content_generations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_auth_provider ON users(auth_provider);
CREATE INDEX IF NOT EXISTS idx_credit_transactions_user_id ON credit_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_credit_transactions_created_at ON credit_transactions(created_at);
CREATE INDEX IF NOT EXISTS idx_credit_transactions_stripe_session ON credit_transactions(stripe_checkout_session_id);
CREATE INDEX IF NOT EXISTS idx_content_generations_user_id ON content_generations(user_id);
CREATE INDEX IF NOT EXISTS idx_content_generations_created_at ON content_generations(created_at);
CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_accounts_provider ON accounts(provider, provider_account_id);
CREATE INDEX IF NOT EXISTS idx_accounts_user_id ON accounts(user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function for atomic credit deduction to prevent race conditions
CREATE OR REPLACE FUNCTION deduct_user_credits(user_id UUID, credits_to_deduct INTEGER)
RETURNS TABLE(success BOOLEAN, remaining_credits INTEGER) AS $$
BEGIN
    UPDATE users 
    SET credits = credits - credits_to_deduct 
    WHERE id = user_id AND credits >= credits_to_deduct;
    
    IF FOUND THEN
        -- Successful deduction
        SELECT TRUE as success, u.credits as remaining_credits
        FROM users u 
        WHERE u.id = user_id
        INTO success, remaining_credits;
        
        RETURN QUERY SELECT success, remaining_credits;
    ELSE
        -- Insufficient credits
        RETURN QUERY SELECT FALSE as success, 0 as remaining_credits;
    END IF;
END;
$$ LANGUAGE plpgsql;
