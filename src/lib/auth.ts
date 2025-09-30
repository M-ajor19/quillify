import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import { supabaseAdmin } from "@/lib/supabase"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
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
          await supabaseAdmin
            .from('users')
            .insert({
              id: user.id,
              email: user.email,
              name: user.name,
              credits: 3, // Free trial credits
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
