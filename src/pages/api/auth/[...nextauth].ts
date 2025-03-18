import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'
import { User, UserWithToken } from '@/interfaces/User'

const baseUrl = process.env.NEXT_PUBLIC_API_URL

async function loginUser(
  email: string,
  password: string
): Promise<UserWithToken | null> {
  try {
    const response = await axios.post(`${baseUrl}/login`, {
      email,
      password
    })

    if (response.status === 200 && response.data?.user) {
      const user = response.data.user as User
      const access_token = response.data.access_token
      const token_type = response.data.token_type

      return { ...user, id: user.id.toString(), access_token, token_type }
    }
  } catch (error) {
    console.error('Error logging in user:', error)
  }
  return null
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'E-mail',
          type: 'email',
          placeholder: 'Digite seu email'
        },
        password: {
          label: 'Senha',
          type: 'password',
          placeholder: 'Digite sua senha'
        }
      },
      async authorize(credentials) {
        if (!credentials) return null

        const { email, password } = credentials

        const user = await loginUser(email, password)

        if (user) {
          return user
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
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update') {
        return { ...token, ...session.user }
      }

      if (user) {
        return {
          ...token,
          id: user.id,
          nome: (user as User).nome,
          email: (user as User).email,
          email_verified_at: (user as User).email_verified_at,
          data_nascimento: (user as User).data_nascimento,
          endereco: (user as User).endereco,
          numero: (user as User).numero,
          complemento: (user as User).complemento,
          bairro: (user as User).bairro,
          cep: (user as User).cep,
          cidade: (user as User).cidade,
          estado: (user as User).estado,
          telefone: (user as User).telefone,
          foto_perfil: (user as User).foto_perfil,
          ativo: (user as User).ativo,
          created_at: (user as User).created_at,
          updated_at: (user as User).updated_at,
          access_token: (user as UserWithToken).access_token,
          token_type: (user as UserWithToken).token_type,
          cpf: (user as User).cpf,
          rg: (user as User).rg,
          passageiro: (user as User).passageiro,
          organizador: (user as User).organizador
        }
      }
      return token
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        nome: token.nome as string,
        email: token.email as string,
        email_verified_at: token.email_verified_at as string | null,
        data_nascimento: token.data_nascimento as string,
        endereco: token.endereco as string | null,
        numero: token.numero as string | null,
        complemento: token.complemento as string | null,
        bairro: token.bairro as string | null,
        cep: token.cep as string | null,
        cidade: token.cidade as string | null,
        estado: token.estado as string | null,
        telefone: token.telefone as string,
        tipo: token.tipo as string | null,
        foto_perfil: token.foto_perfil as string | null,
        ativo: token.ativo as number,
        created_at: token.created_at as string,
        updated_at: token.updated_at as string,
        telefone_emergencia: token.telefone_emergencia as string | null,
        cpf: token.cpf as string | null,
        rg: token.rg as string | null,
        passageiro: token.passageiro as boolean,
        organizador: token.organizador as boolean
      }
      return session
    }
  }
}

export default NextAuth(authOptions)
