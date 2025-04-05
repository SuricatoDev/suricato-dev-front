import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'
import { LoginResponse, UserWithToken } from '@/interfaces/User'

const baseUrl = process.env.BACKEND_URL

async function loginUser(
  email: string,
  password: string
): Promise<LoginResponse | null> {
  try {
    const { data, status } = await axios.post<LoginResponse>(
      `${baseUrl}/login`,
      { email, password }
    )
    return status === 200 && data.user ? data : null
  } catch (err) {
    console.error('Login error:', err)
    return null
  }
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'E‑mail', type: 'email' },
        password: { label: 'Senha', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials) return null

        const login = await loginUser(credentials.email, credentials.password)
        if (!login) return null

        const { user, access_token, token_type, passageiro, organizador } =
          login

        return {
          ...user,
          id: user.id.toString(),
          access_token,
          token_type,
          passageiroData: passageiro,
          organizadorData: organizador
        }
      }
    })
  ],

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60
  },

  jwt: { maxAge: 30 * 24 * 60 * 60 },

  callbacks: {
    async jwt({ token, user, trigger }) {
      if (trigger === 'update') {
        try {
          const response = await axios.get(`${baseUrl}/user-data/${token.id}`, {
            headers: {
              Authorization: `${token.token_type} ${token.access_token}`
            }
          })

          const { user: userData, passageiro, organizador } = response.data

          return {
            ...token,
            ...userData,
            passageiroData: passageiro,
            organizadorData: organizador
          }
        } catch (err: unknown) {
          if (axios.isAxiosError(err) && err.response?.status === 401) {
            console.error('Sessão expirada, forçando logout.')
            return null
          }
          console.error('Erro ao buscar dados atualizados do usuário:', err)
          return token
        }
      }

      if (user) {
        return { ...token, ...user }
      }

      return token
    },

    async session({ session, token }) {
      if (!token) {
        session.user = null
      } else {
        session.user = {
          ...(session.user as UserWithToken),
          ...token
        }
      }
      return session
    }
  }
}

export default NextAuth(authOptions)
