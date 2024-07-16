import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import { compare, hash } from 'bcryptjs'
import { redirect } from 'next/navigation'

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
      console.log(user)
      await prisma.subscription.create({
        data: { userId: user.id }
      })
    },
    signIn: async ({ user }) => {
      const sub = await prisma.subscription.findUnique({
        where: {
          userId: user.id
        }
      })

      if (!sub) {
        await prisma.subscription.create({
          data: { userId: user.id }
        })
      }
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
          role: profile.email == 'iantespinillo@gmail.com' ? 'admin' : 'user',
          image: profile.picture
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
      console.log(user, account, profile)
      /* const usr = await prisma.user.findFirst({
        where: {
          OR: [{ id: user.id }, { email: user.email }]
        }
      })
      console.log(usr)
      if (!usr.password || (account.provider === 'google' && !usr)) {
        return '/auth/change-password?id=' + usr.id
      } */
      return true
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
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async redirect ({ url, baseUrl }) {
      console.log(url)
      return url.startsWith(baseUrl) ? url : baseUrl
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60, // 24 hours
    updateAge: 24 * 60 * 60 // 24 hours
  }
}
