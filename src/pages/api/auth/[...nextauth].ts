import { NextApiHandler } from 'next'
import NextAuth, { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '../../../lib/prisma'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare, hash } from 'bcryptjs'

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)
export default authHandler

const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/sign-in',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      id: 'app-login',
      name: 'App Login',
      credentials: {
        name: {
          label: 'Name',
          type: 'text',
          placeholder: 'John Doe',
        },
        email: {
          label: 'Email Address',
          type: 'email',
          placeholder: 'john.doe@example.com',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        try {
          let maybeUser = await prisma.user.findFirst({
            where: {
              email: credentials?.email,
            },
            select: {
              id: true,
              name: true,
              email: true,
              password_hash: true,
            },
          })
          if (!maybeUser) {
            if (!credentials?.password || !credentials.email) {
              throw new Error('Invalid credentials')
            }
            maybeUser = await prisma.user.create({
              data: {
                name: credentials.name,
                email: credentials.email!,
                password_hash: await hash(credentials.password, 6),
              },
            })
          } else {
            const isValid = await compare(
              credentials?.password!,
              maybeUser.password_hash
            )
            if (!isValid) {
              throw new Error('Invalid credentials')
            }
          }
          return {
            id: maybeUser.id,
            email: maybeUser.email,
            name: maybeUser.name,
          }
        } catch (error) {
          console.error(error)
          throw error
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    async session({ session, token, user }) {
      return session
    },
  },
}
