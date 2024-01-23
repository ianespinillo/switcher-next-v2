import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export const authOptions = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register'
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile (profile) {
        return {
          id: profile.sub,
          name: `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          role: profile.email == 'iantespinillo@gmail.com' ? 'admin' : 'user'
        }
      }
    }),
    CredentialsProvider({
      name: 'CustomLogin',
      credentials: {
        email: {
          label: 'email',
          type: 'email',
          placeholder: 'example@example.com'
        },
        password: { label: 'password', type: 'password' }
      },
      type: 'credentials',
      id: 'customLogin',
      async authorize (credentials) {
        if (!credentials?.email || !credentials.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
            password: credentials.password
          }
        })

        if (!user || !(credentials.password == user.password)) {
          return null
        }

        return {
          id: `${user.id}`,
          name: user.name,
          email: user.email,
          role: user.role
        }
      }
    }),
    CredentialsProvider({
      name: 'userRegistration',
      id: 'register',
      credentials: {
        nickname: {
          label: 'Your nickname',
          type: 'string',
          placeholder: 'Your nickname'
        },
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'Enter your email address'
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter your password'
        }
      },
      async authorize (credentials) {
        if (
          !credentials?.email ||
          !credentials.password ||
          !credentials.nickname
        ) {
          return null
        }
        const notUsedEmail = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!notUsedEmail) {
          const newUser = await prisma.user.create({
            data: {
              name: credentials.nickname,
              email: credentials.email,
              password: credentials.password,
              role: credentials.email === 'espinilloian@hotmail.com'?'admin':'user'
            }
          })
          return newUser
        }
      }
    })
  ],
  callbacks: {
    async signIn ({ user, account, profile, email, credentials }) {
      return true
    },
    session: async ({ session, token, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
          role: token.role
        }
      }
    },
    jwt: async ({ user, token, account }) => {
      if (user) {
        token.role = user.role
      }
      return token
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60, // 24 hours
    updateAge: 24 * 60 * 60 // 24 hours
  }
}
