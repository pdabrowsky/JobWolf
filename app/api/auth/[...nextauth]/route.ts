import prisma from '@/lib/prisma'
import { Account, AuthOptions, Profile, Session, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT } from 'next-auth/jwt'
import NextAuth from 'next-auth/next'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'example@email.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials) return null

        const { email, password } = credentials

        const candidate = await prisma.candidate.findUnique({
          where: { email },
        })

        if (candidate) {
          const isPasswordValid = bcrypt.compareSync(
            password,
            candidate.password
          )
          if (isPasswordValid) {
            return { ...candidate, role: 'candidate' }
          }
        }

        const employer = await prisma.employer.findUnique({ where: { email } })

        if (employer) {
          const isPasswordValid = bcrypt.compareSync(
            password,
            employer.password
          )
          if (isPasswordValid) {
            return { ...employer, role: 'employer' }
          }
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/register',
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    async encode({ secret, token }) {
      if (!token) throw new Error('Token is undefined!')

      return jwt.sign(token, secret)
    },

    async decode({ secret, token }) {
      if (!token) throw new Error('Token is undefined!')

      const decodedToken = jwt.verify(token, secret)

      return typeof decodedToken === 'string'
        ? JSON.parse(decodedToken)
        : decodedToken
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    session: async (params: { session: Session; token: JWT; user: User }) => {
      if (params.session.user) {
        params.session.user.email = params.token.email
        params.session.user.role = params.token.role
      }

      return params.session
    },
    async jwt(params: {
      token: JWT
      user?: User | undefined
      account?: Account | null | undefined
      isNewUser?: boolean | undefined
      profile?: Profile | undefined
    }) {
      if (params.user) {
        params.token.email = params.user.email
        params.token.role = params.user.role
      }

      return params.token
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as POST, handler as GET }
