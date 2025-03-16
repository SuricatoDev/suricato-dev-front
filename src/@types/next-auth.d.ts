/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { DefaultSession } from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      nome: string
      email: string
      email_verified_at: string | null
      data_nascimento: string
      endereco: string | null
      numero: string | null
      complemento: string | null
      bairro: string | null
      cep: string | null
      cidade: string | null
      estado: string | null
      telefone: string
      tipo: string | null
      foto_perfil: string | null
      ativo: number
      created_at: string
      updated_at: string
      telefone_emergencia: string | null
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    nome: string
    email: string
    email_verified_at: string | null
    data_nascimento: string
    endereco: string | null
    numero: string | null
    complemento: string | null
    bairro: string | null
    cep: string | null
    cidade: string | null
    estado: string | null
    telefone: string
    tipo: string | null
    foto_perfil: string | null
    ativo: number
    created_at: string
    updated_at: string
    access_token: string
    token_type: string
    telefone_emergencia: string | null
  }
}
