// Simple in-memory rate limiter
// For production, consider using Redis or Upstash

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

export interface RateLimitConfig {
  interval: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per interval
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Rate limiter with sliding window
 * @param identifier - Unique identifier (userId, IP, etc.)
 * @param config - Rate limit configuration
 * @returns Rate limit result
 */
export function rateLimit(
  identifier: string,
  config: RateLimitConfig = { interval: 60000, maxRequests: 10 }
): RateLimitResult {
  const now = Date.now();
  const key = identifier;
  
  // Initialize or get existing rate limit data
  if (!store[key] || now > store[key].resetTime) {
    store[key] = {
      count: 0,
      resetTime: now + config.interval,
    };
  }
  
  const current = store[key];
  
  // Check if limit exceeded
  if (current.count >= config.maxRequests) {
    return {
      success: false,
      limit: config.maxRequests,
      remaining: 0,
      reset: current.resetTime,
    };
  }
  
  // Increment counter
  current.count++;
  
  return {
    success: true,
    limit: config.maxRequests,
    remaining: config.maxRequests - current.count,
    reset: current.resetTime,
  };
}

/**
 * Clean up expired entries (call periodically)
 */
export function cleanupRateLimitStore() {
  const now = Date.now();
  Object.keys(store).forEach(key => {
    if (now > store[key].resetTime) {
      delete store[key];
    }
  });
}

// Clean up every hour
setInterval(cleanupRateLimitStore, 3600000);

