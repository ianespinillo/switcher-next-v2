import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import { compare, hash } from 'bcryptjs'

const prisma = new PrismaClient()

export const authOptions = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register'
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  events: {
    createUser: async ({ user }) => {
      await prisma.subscription.create({
        data: { userId: user.id }
      })
    }
  },
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
            email: credentials.email
          }
        })
        const matchPassword = await compare(credentials.password, user.password)

        if (!user || !matchPassword) {
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
        const notUsedEmail = await prisma.user.findFirst({
          where: { email: credentials.email }
        })
        const hashedPassword = await hash(credentials.password, 10)
        if (!notUsedEmail) {
          const newUser = await prisma.user.create({
            data: {
              name: credentials.nickname,
              email: credentials.email,
              password: hashedPassword,
              role:
                credentials.email === 'espinilloian@hotmail.com'
                  ? 'admin'
                  : 'user',
              Subscription: {
                create: {
                  level: 0
                }
              }
            }
          })
          return newUser
        }
      }
    })
  ],
  callbacks: {
    async signIn ({ user, account, profile, email, credentials }) {
      return user
    },
    session: async ({ session, token, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          role: token.role,
          id: token.id
        }
      }
    },
    jwt: async ({ user, token, account }) => {
      console.log(user)
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async redirect ({ url, baseUrl }) {
      return baseUrl
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60, // 24 hours
    updateAge: 24 * 60 * 60 // 24 hours
  }
}
