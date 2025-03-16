import type { NextApiRequest, NextApiResponse } from 'next'
import apiBackend from '@/services/apiBackend'
import axios from 'axios'
import { getToken } from 'next-auth/jwt'

interface CepResponse {
  cep: string
  logradouro: string
  bairro: string
  cidade: string
  uf: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CepResponse | { error: string }>
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({ error: 'Método não permitido' })
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  if (!token) {
    return res.status(401).json({ error: 'Usuário não autenticado' })
  }

  const accessToken = token.access_token
  const tokenType = token.token_type || 'Bearer'

  const { cep } = req.query

  if (!cep || typeof cep !== 'string') {
    return res.status(400).json({ error: 'CEP não informado ou inválido.' })
  }

  const numericCep = cep.replace(/\D/g, '')
  if (numericCep.length !== 8) {
    return res.status(400).json({ error: 'CEP inválido.' })
  }

  try {
    const response = await apiBackend.get(`/cep/${numericCep}`, {
      headers: {
        Authorization: `${tokenType} ${accessToken}`
      }
    })
    return res.status(response.status).json(response.data)
  } catch (error) {
    console.error('Erro ao buscar CEP:', error)
    if (axios.isAxiosError(error) && error.response) {
      return res.status(error.response.status).json(error.response.data)
    }
    return res.status(500).json({ error: 'Erro interno no servidor' })
  }
}
