import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import LinkedInProvider from "next-auth/providers/linkedin"
import AzureADProvider from "next-auth/providers/azure-ad"
import EmailProvider from "next-auth/providers/email"
import { supabaseAdmin } from "@/lib/supabase"

// Custom Supabase Adapter
const SupabaseAdapter = {
  async createUser(user: any) {
    const { data, error } = await supabaseAdmin
      .from('users')
      .insert({
        email: user.email,
        name: user.name,
        image: user.image,
        email_verified: user.emailVerified,
        credits: 3,
        auth_provider: 'email',
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  async getUser(id: string) {
    const { data } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', id)
      .single()
    
    return data
  },

  async getUserByEmail(email: string) {
    const { data } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', email)
      .single()
    
    return data
  },

  async getUserByAccount({ provider, providerAccountId }: any) {
    const { data } = await supabaseAdmin
      .from('accounts')
      .select('user_id')
      .eq('provider', provider)
      .eq('provider_account_id', providerAccountId)
      .single()

    if (!data) return null

    return await this.getUser(data.user_id)
  },

  async updateUser(user: any) {
    const { data } = await supabaseAdmin
      .from('users')
      .update(user)
      .eq('id', user.id)
      .select()
      .single()

    return data
  },

  async linkAccount(account: any) {
    await supabaseAdmin
      .from('accounts')
      .insert({
        user_id: account.userId,
        type: account.type,
        provider: account.provider,
        provider_account_id: account.providerAccountId,
        refresh_token: account.refresh_token,
        access_token: account.access_token,
        expires_at: account.expires_at,
        token_type: account.token_type,
        scope: account.scope,
        id_token: account.id_token,
        session_state: account.session_state,
      })
  },

  async createSession(session: any) {
    const { data } = await supabaseAdmin
      .from('sessions')
      .insert({
        session_token: session.sessionToken,
        user_id: session.userId,
        expires: session.expires,
      })
      .select()
      .single()

    return data
  },

  async getSessionAndUser(sessionToken: string) {
    const { data: session } = await supabaseAdmin
      .from('sessions')
      .select('*')
      .eq('session_token', sessionToken)
      .single()

    if (!session) return null

    const user = await this.getUser(session.user_id)
    return { session, user }
  },

  async updateSession(session: any) {
    const { data } = await supabaseAdmin
      .from('sessions')
      .update(session)
      .eq('session_token', session.sessionToken)
      .select()
      .single()

    return data
  },

  async deleteSession(sessionToken: string) {
    await supabaseAdmin
      .from('sessions')
      .delete()
      .eq('session_token', sessionToken)
  },

  async createVerificationToken(token: any) {
    const { data } = await supabaseAdmin
      .from('verification_tokens')
      .insert({
        identifier: token.identifier,
        token: token.token,
        expires: token.expires,
      })
      .select()
      .single()

    return data
  },

  async useVerificationToken({ identifier, token }: any) {
    const { data } = await supabaseAdmin
      .from('verification_tokens')
      .select('*')
      .eq('identifier', identifier)
      .eq('token', token)
      .single()

    if (!data) return null

    await supabaseAdmin
      .from('verification_tokens')
      .delete()
      .eq('identifier', identifier)
      .eq('token', token)

    return data
  },
}

export const authOptions: NextAuthOptions = {
  adapter: SupabaseAdapter as any,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'openid profile email',
        },
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          credits: 0, // Will be set in database
          // LinkedIn-specific professional data
          jobTitle: profile.job_title || null,
          company: profile.company || null,
          industry: profile.industry || null,
        }
      },
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      // Get fresh user data including credits
      const { data: userData } = await supabaseAdmin
        .from('users')
        .select('credits')
        .eq('id', user.id)
        .single()

      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          credits: userData?.credits || 0,
        },
      }
    },
  },
  pages: {
    signIn: '/',
    error: '/',
    verifyRequest: '/',
  },
  session: {
    strategy: 'database',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === 'development',
}
