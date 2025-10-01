import { supabaseAdmin } from './supabase';

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: Date;
}

// Create a simple in-memory rate limiter for development
// In production, use Redis or a dedicated rate limiting service
const memoryStore = new Map<string, { count: number; resetTime: number }>();

export async function checkRateLimit(
  identifier: string,
  windowMs: number = 60 * 1000, // 1 minute
  maxRequests: number = 10
): Promise<RateLimitResult> {
  const now = Date.now();
  const key = `rate_limit:${identifier}`;
  
  // Clean up expired entries (simple cleanup)
  const current = memoryStore.get(key);
  
  if (!current || now >= current.resetTime) {
    // Reset or create new entry
    memoryStore.set(key, {
      count: 1,
      resetTime: now + windowMs
    });
    
    return {
      success: true,
      limit: maxRequests,
      remaining: maxRequests - 1,
      reset: new Date(now + windowMs)
    };
  }
  
  // Increment counter
  current.count += 1;
  
  if (current.count > maxRequests) {
    return {
      success: false,
      limit: maxRequests,
      remaining: 0,
      reset: new Date(current.resetTime)
    };
  }
  
  return {
    success: true,
    limit: maxRequests,
    remaining: maxRequests - current.count,
    reset: new Date(current.resetTime)
  };
}

// Database-based rate limiting for production use
export async function checkDatabaseRateLimit(
  userId: string,
  action: 'generate' | 'purchase',
  windowMinutes: number = 60,
  maxActions: number = 10
): Promise<RateLimitResult> {
  const windowStart = new Date(Date.now() - windowMinutes * 60 * 1000);
  
  try {
    // Count actions in the time window
    const { count, error } = await supabaseAdmin
      .from('content_generations')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .gte('created_at', windowStart.toISOString());
    
    if (error) throw error;
    
    const actionCount = count || 0;
    const remaining = Math.max(0, maxActions - actionCount);
    const resetTime = new Date(Date.now() + windowMinutes * 60 * 1000);
    
    return {
      success: actionCount < maxActions,
      limit: maxActions,
      remaining,
      reset: resetTime
    };
  } catch (error) {
    console.error('Rate limit check error:', error);
    // Fail open for availability
    return {
      success: true,
      limit: maxActions,
      remaining: maxActions,
      reset: new Date(Date.now() + windowMinutes * 60 * 1000)
    };
  }
}

// Clean up memory store periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of memoryStore.entries()) {
    if (now >= value.resetTime) {
      memoryStore.delete(key);
    }
  }
}, 5 * 60 * 1000); // Clean every 5 minutes