// Environment Variable Validation
// Validates all required env vars on app startup

interface EnvConfig {
  // OpenAI
  OPENAI_API_KEY: string;
  
  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: string;
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  
  // NextAuth
  NEXTAUTH_URL: string;
  NEXTAUTH_SECRET: string;
  
  // OAuth Providers
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  AZURE_AD_CLIENT_ID: string;
  AZURE_AD_CLIENT_SECRET: string;
  AZURE_AD_TENANT_ID: string;
  LINKEDIN_CLIENT_ID: string;
  LINKEDIN_CLIENT_SECRET: string;
  
  // Stripe
  STRIPE_SECRET_KEY: string;
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  
  // Email
  EMAIL_SERVER_HOST: string;
  EMAIL_SERVER_PORT: string;
  EMAIL_SERVER_USER: string;
  EMAIL_SERVER_PASSWORD: string;
  EMAIL_FROM: string;
  
  // App
  NEXT_PUBLIC_APP_URL: string;
}

type RequiredEnvKeys = keyof EnvConfig;

const REQUIRED_ENV_VARS: RequiredEnvKeys[] = [
  'OPENAI_API_KEY',
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'NEXTAUTH_URL',
  'NEXTAUTH_SECRET',
  'STRIPE_SECRET_KEY',
  'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
  'STRIPE_WEBHOOK_SECRET',
  'NEXT_PUBLIC_APP_URL',
];

const OPTIONAL_ENV_VARS: RequiredEnvKeys[] = [
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'AZURE_AD_CLIENT_ID',
  'AZURE_AD_CLIENT_SECRET',
  'AZURE_AD_TENANT_ID',
  'LINKEDIN_CLIENT_ID',
  'LINKEDIN_CLIENT_SECRET',
  'EMAIL_SERVER_HOST',
  'EMAIL_SERVER_PORT',
  'EMAIL_SERVER_USER',
  'EMAIL_SERVER_PASSWORD',
  'EMAIL_FROM',
];

export function validateEnvironment(): { valid: boolean; missing: string[]; warnings: string[] } {
  const missing: string[] = [];
  const warnings: string[] = [];
  
  // Check required variables
  for (const key of REQUIRED_ENV_VARS) {
    if (!process.env[key] || process.env[key] === `your_${key.toLowerCase()}_here`) {
      missing.push(key);
    }
  }
  
  // Check optional variables (warnings only)
  for (const key of OPTIONAL_ENV_VARS) {
    if (!process.env[key] || process.env[key]?.includes('your_')) {
      warnings.push(key);
    }
  }
  
  return {
    valid: missing.length === 0,
    missing,
    warnings,
  };
}

export function enforceEnvironment() {
  const result = validateEnvironment();
  
  if (!result.valid) {
    console.error('❌ Missing required environment variables:');
    result.missing.forEach(key => console.error(`  - ${key}`));
    
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        `Missing required environment variables: ${result.missing.join(', ')}`
      );
    } else {
      console.warn('\n⚠️  App may not function correctly without these variables\n');
    }
  }
  
  if (result.warnings.length > 0 && process.env.NODE_ENV !== 'production') {
    console.warn('⚠️  Optional features disabled (missing env vars):');
    result.warnings.forEach(key => console.warn(`  - ${key}`));
    console.warn('');
  }
  
  return result.valid;
}

// Auto-validate on import in development
if (process.env.NODE_ENV !== 'production') {
  enforceEnvironment();
}

