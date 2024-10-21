import { prisma } from "@/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),

  secret: process.env.NEXTAUTH_SECRET,
  // pages: {
  //   signIn: `/login`,
  //   verifyRequest: `/login`,
  //   error: "/login", // Error code passed in query string as ?error=
  // },
  callbacks: {
    // session: ({ session, user }) => ({
    //   ...session,
    //   user: {
    //     ...session.user,
    //     id: user.id,
    //     username: user.name,
    //   },
    // }),
    async session({ session, token }) {
      if (session?.user) {
        if (token?.sub) {
          session.user.id = token?.sub
        }
      }
      return session
    },
    async jwt({ user, token }) {
      if (user) token.sub = user.id
      return token
    },
  },
} satisfies NextAuthOptions
export default NextAuth(authOptions)
