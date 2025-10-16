-- Atomic Credit Deduction Function
-- Prevents race conditions in credit system

CREATE OR REPLACE FUNCTION deduct_credit_if_available(
  p_user_id UUID,
  p_credits_needed INTEGER DEFAULT 1
)
RETURNS TABLE(
  success BOOLEAN,
  remaining_credits INTEGER,
  message TEXT
) AS $$
DECLARE
  v_current_credits INTEGER;
  v_new_credits INTEGER;
BEGIN
  -- Lock the user row for update to prevent race conditions
  SELECT credits INTO v_current_credits
  FROM users
  WHERE id = p_user_id
  FOR UPDATE;
  
  -- Check if user exists
  IF NOT FOUND THEN
    RETURN QUERY SELECT FALSE, 0, 'User not found'::TEXT;
    RETURN;
  END IF;
  
  -- Check if sufficient credits
  IF v_current_credits < p_credits_needed THEN
    RETURN QUERY SELECT FALSE, v_current_credits, 'Insufficient credits'::TEXT;
    RETURN;
  END IF;
  
  -- Deduct credits atomically
  v_new_credits := v_current_credits - p_credits_needed;
  
  UPDATE users
  SET credits = v_new_credits,
      updated_at = NOW()
  WHERE id = p_user_id;
  
  -- Return success
  RETURN QUERY SELECT TRUE, v_new_credits, 'Credits deducted successfully'::TEXT;
END;
$$ LANGUAGE plpgsql;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION deduct_credit_if_available(UUID, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION deduct_credit_if_available(UUID, INTEGER) TO service_role;

-- Add comment
COMMENT ON FUNCTION deduct_credit_if_available IS 'Atomically deducts credits from user account with row-level locking to prevent race conditions';

