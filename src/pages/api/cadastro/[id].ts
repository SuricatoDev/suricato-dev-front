import type { NextApiRequest, NextApiResponse } from 'next'
import apiBackend from '@/services/apiBackend'
import axios from 'axios'
import { getSession } from 'next-auth/react'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'ID inválido' })
  }

  const session = await getSession({ req })
  if (!session || !session.user || session.user.id !== id) {
    return res.status(403).json({ error: 'Acesso negado' })
  }

  switch (req.method) {
    case 'PUT':
      return await handlePut(req, res, id)
    case 'DELETE':
      return await handleDelete(req, res, id)
    default:
      res.setHeader('Allow', ['PUT', 'DELETE'])
      return res.status(405).json({ error: 'Método não permitido' })
  }
}

async function handlePut(
  req: NextApiRequest,
  res: NextApiResponse,
  id: string
) {
  const data = req.body

  try {
    const response = await apiBackend.put(`/api/register/${id}`, data)
    return res.status(response.status).json(response.data)
  } catch (error) {
    console.error('Erro ao processar PUT:', error)
    if (axios.isAxiosError(error) && error.response) {
      return res.status(error.response.status).json(error.response.data)
    }
    return res.status(500).json({ error: 'Erro interno no servidor' })
  }
}

async function handleDelete(
  req: NextApiRequest,
  res: NextApiResponse,
  id: string
) {
  try {
    const response = await apiBackend.delete(`/api/register/${id}`)
    return res.status(response.status).json(response.data)
  } catch (error) {
    console.error('Erro ao processar DELETE:', error)
    if (axios.isAxiosError(error) && error.response) {
      return res.status(error.response.status).json(error.response.data)
    }
    return res.status(500).json({ error: 'Erro interno no servidor' })
  }
}
