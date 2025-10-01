# Critical Fixes Deployment Checklist

## 🚨 BEFORE DEPLOYMENT - Database Updates Required

### 1. **Database Schema Updates**
Run these SQL commands in your Supabase SQL editor:

```sql
-- Update existing tables with new constraints (run these one by one and handle any constraint violations)

-- Add email validation constraint
ALTER TABLE users ADD CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Add credit constraint to prevent negative credits
ALTER TABLE users ADD CONSTRAINT non_negative_credits CHECK (credits >= 0);

-- Add auth provider constraint
ALTER TABLE users ADD CONSTRAINT valid_auth_provider CHECK (auth_provider IN ('email', 'google', 'linkedin', 'azure'));

-- Add checkout session ID column and constraint for webhook idempotency
ALTER TABLE credit_transactions ADD COLUMN IF NOT EXISTS stripe_checkout_session_id TEXT CHECK (LENGTH(stripe_checkout_session_id) <= 100);
ALTER TABLE credit_transactions ADD CONSTRAINT unique_checkout_session UNIQUE(stripe_checkout_session_id);

-- Add format and tone validation
ALTER TABLE content_generations ADD CONSTRAINT valid_format CHECK (format IN ('tweet', 'linkedin', 'quote-graphic', 'testimonial', 'review'));
ALTER TABLE content_generations ADD CONSTRAINT valid_tone CHECK (tone IN ('professional', 'enthusiastic', 'witty', 'conversational', 'authoritative'));

-- Add new indexes
CREATE INDEX IF NOT EXISTS idx_users_auth_provider ON users(auth_provider);
CREATE INDEX IF NOT EXISTS idx_credit_transactions_created_at ON credit_transactions(created_at);
CREATE INDEX IF NOT EXISTS idx_credit_transactions_stripe_session ON credit_transactions(stripe_checkout_session_id);
CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_accounts_provider ON accounts(provider, provider_account_id);
CREATE INDEX IF NOT EXISTS idx_accounts_user_id ON accounts(user_id);

-- Create the atomic credit deduction function
CREATE OR REPLACE FUNCTION deduct_user_credits(user_id UUID, credits_to_deduct INTEGER)
RETURNS TABLE(success BOOLEAN, remaining_credits INTEGER) AS $$
BEGIN
    UPDATE users 
    SET credits = credits - credits_to_deduct 
    WHERE id = user_id AND credits >= credits_to_deduct;
    
    IF FOUND THEN
        SELECT TRUE as success, u.credits as remaining_credits
        FROM users u 
        WHERE u.id = user_id
        INTO success, remaining_credits;
        
        RETURN QUERY SELECT success, remaining_credits;
    ELSE
        RETURN QUERY SELECT FALSE as success, 0 as remaining_credits;
    END IF;
END;
$$ LANGUAGE plpgsql;
```

## 📋 Testing Checklist

### 2. **Critical Race Condition Tests**
- [ ] **Concurrent Credit Usage Test**: 
  - Create a user with 1 credit
  - Make 5 simultaneous generation requests
  - Verify only 1 succeeds, others get "Insufficient credits"
  - Verify user has 0 credits remaining

### 3. **Webhook Idempotency Tests**
- [ ] **Duplicate Webhook Test**:
  - Process the same Stripe checkout.session.completed webhook twice
  - Verify credits are only added once
  - Check database logs for "already processed" message

### 4. **Rate Limiting Tests**
- [ ] **Generation Rate Limit Test**:
  - Make 11 generation requests within 1 hour from same user
  - Verify 11th request returns 429 status
  - Check rate limit headers are present

### 5. **Error Handling Tests**
- [ ] **Credit Refund Test**:
  - Mock OpenAI API failure after credit deduction
  - Verify credits are refunded to user
  - Check refund is logged

### 6. **Data Validation Tests**
- [ ] **Invalid Format Test**: Try invalid format, expect 400 error
- [ ] **Invalid Tone Test**: Try invalid tone, expect 400 error
- [ ] **Negative Credits Test**: Try to manually set negative credits, expect constraint violation

## 🔧 Post-Deployment Monitoring

### 7. **Monitoring Setup**
- [ ] Set up alerts for database constraint violations
- [ ] Monitor credit refund frequency (should be very low)
- [ ] Track rate limiting hits
- [ ] Monitor duplicate webhook attempts

### 8. **Performance Monitoring**
- [ ] Database query performance (especially with new indexes)
- [ ] API response times
- [ ] Credit deduction function performance

## 🛡️ Security Verification

### 9. **Security Checks**
- [ ] Verify no sensitive data in error messages
- [ ] Check rate limiting is working across all endpoints
- [ ] Confirm webhook signature validation is working
- [ ] Test RLS policies are still effective

## 🚀 Gradual Rollout Recommendations

1. **Stage 1**: Deploy database schema changes during low traffic
2. **Stage 2**: Deploy application code changes
3. **Stage 3**: Monitor for 24 hours before full rollout
4. **Stage 4**: Update monitoring and alerting

## ⚠️ Rollback Plan

If issues occur:
1. **Immediate**: Revert application code (keep database changes)
2. **Database rollback** (only if critical):
   ```sql
   -- Remove constraints if needed (EMERGENCY ONLY)
   ALTER TABLE users DROP CONSTRAINT IF EXISTS non_negative_credits;
   DROP FUNCTION IF EXISTS deduct_user_credits(UUID, INTEGER);
   ```

## 📊 Success Metrics

- Zero negative credit balances
- Zero duplicate webhook payments
- Rate limiting working (429 responses when expected)
- No race condition credit issues
- Improved API response times due to better indexing

---

## 🆘 Emergency Contacts

- Database Admin: [Your DBA]
- DevOps Lead: [Your DevOps lead]
- On-call Engineer: [Your on-call system]