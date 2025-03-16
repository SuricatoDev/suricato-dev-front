import type { NextApiRequest, NextApiResponse } from 'next'
import apiBackend from '@/services/apiBackend'
import axios from 'axios'
import { getToken } from 'next-auth/jwt'

interface UserUpdatePayload {
  nome?: string
  password?: string
  data_nascimento?: string
  endereco?: string
  numero?: string
  complemento?: string
  bairro?: string
  cep?: string
  cidade?: string
  estado?: string
  telefone?: string
  razao_social?: string
  inscricao_estadual?: string
  inscricao_municipal?: string
  cadastur?: boolean
}

type Data = {
  message: string
  tipo_usuario?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  if (!token || !token.id) {
    return res.status(403).json({ message: 'Acesso negado' })
  }

  const userId = String(token.id)
  const tokenType = token.token_type || 'Bearer'
  const accessToken = token.access_token

  switch (req.method) {
    case 'PUT':
      return await handlePut(req, res, userId, tokenType, accessToken)
    case 'DELETE':
      return await handleDelete(req, res, userId, tokenType, accessToken)
    default:
      res.setHeader('Allow', ['PUT', 'DELETE'])
      return res
        .status(405)
        .json({ message: `Método ${req.method} não permitido` })
  }
}

async function handlePut(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
  userId: string,
  tokenType: string,
  accessToken: string
) {
  const data = req.body as UserUpdatePayload

  try {
    const response = await apiBackend.put(`/users/${userId}`, data, {
      headers: {
        Authorization: `${tokenType} ${accessToken}`
      }
    })

    return res.status(response.status).json(response.data)
  } catch (error) {
    console.error('Erro ao processar PUT:', error)
    if (axios.isAxiosError(error) && error.response) {
      return res.status(error.response.status).json(error.response.data)
    }
    return res.status(500).json({ message: 'Erro interno no servidor' })
  }
}

async function handleDelete(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
  userId: string,
  tokenType: string,
  accessToken: string
) {
  try {
    const response = await apiBackend.delete(`/users/${userId}`, {
      headers: {
        Authorization: `${tokenType} ${accessToken}`
      }
    })
    return res.status(response.status).json(response.data)
  } catch (error) {
    console.error('Erro ao processar DELETE:', error)
    if (axios.isAxiosError(error) && error.response) {
      return res.status(error.response.status).json(error.response.data)
    }
    return res.status(500).json({ message: 'Erro interno no servidor' })
  }
}
