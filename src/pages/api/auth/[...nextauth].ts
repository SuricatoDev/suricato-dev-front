/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

interface MyUser {
  id: string
  email: string
}

async function fetchUser(email: string): Promise<MyUser | null> {
  // aqui vou chamar a função que verifica se o usuario tem cadastro
  return null
}

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'E-mail', type: 'email' },
        password: { label: 'Senha', type: 'password' }
      },
      // async authorize(credentials) {
      //   if (!credentials) return null

      //   const { email, password } = credentials
      //   const user = await fetchYourUser(email, password)
      //   if (user) {
      //     return user
      //   }
      //   return null
      // }
      async authorize(credentials) {
        if (!credentials) return null

        const { email, password } = credentials

        const testeEmail = 'teste@hotmail.com'
        const testeSenha = 'Senhateste123@'
        await new Promise((resolve) => setTimeout(resolve, 2000))
        if (email === testeEmail && password === testeSenha) {
          return { id: '1', email }
        }

        return null
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.email = token.email as string
      }
      return session
    }
  }
})
