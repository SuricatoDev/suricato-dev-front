/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { DefaultSession, DefaultUser } from 'next-auth'
import { JWT as DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT, UserWithToken {
    passageiroData?: Record<string, unknown> | null
    organizadorData?: Record<string, unknown> | null
  }
}

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: UserWithToken & {
      passageiroData?: Record<string, unknown> | null
      organizadorData?: Record<string, unknown> | null
    }
  }
}
