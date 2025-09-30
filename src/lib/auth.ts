import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import LinkedInProvider from "next-auth/providers/linkedin"
import AzureADProvider from "next-auth/providers/azure-ad"
import EmailProvider from "next-auth/providers/email"
import { supabaseAdmin } from "@/lib/supabase"

export const authOptions: NextAuthOptions = {
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
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
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
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        // Get user credits from database
        const { data: userData } = await supabaseAdmin
          .from('users')
          .select('credits')
          .eq('id', user.id)
          .single()

        token.credits = userData?.credits || 0
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          credits: token.credits as number,
        },
      }
    },
    async signIn({ user, account, profile }) {
      try {
        // Create user in database if they don't exist
        const { data: existingUser } = await supabaseAdmin
          .from('users')
          .select('id')
          .eq('id', user.id)
          .single()

        if (!existingUser) {
          // Determine auth provider
          const authProvider = account?.provider || 'email'
          
          // Extract professional data for LinkedIn users
          const professionalData = authProvider === 'linkedin' ? {
            job_title: (user as any).jobTitle || null,
            company: (user as any).company || null,
            industry: (user as any).industry || null,
            auth_provider: authProvider,
          } : {
            auth_provider: authProvider,
          }

          await supabaseAdmin
            .from('users')
            .insert({
              id: user.id,
              email: user.email,
              name: user.name,
              credits: 3, // Free trial credits
              ...professionalData,
            })
        }

        return true
      } catch (error) {
        console.error('Error in signIn callback:', error)
        return false
      }
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
}
