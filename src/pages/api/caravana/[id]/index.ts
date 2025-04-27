import type { NextApiRequest, NextApiResponse } from 'next'

import apiBackend from '@/services/apiBackend'
import { AxiosError } from 'axios'
import { getToken } from 'next-auth/jwt'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado' })
  }

  const { id } = req.query

  try {
    const response = await apiBackend({
      method: 'GET',
      url: `/caravana/${id}/listar-reservas`,
      headers: {
        Authorization: `${token.token_type ?? 'Bearer'} ${token.access_token}`
      }
    })
    return res.status(response.status).json(response.data)
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message: string }>
    return res.status(axiosError.response?.status ?? 500).json(
      axiosError.response?.data?.message ?? {
        message: 'Erro interno no servidor'
      }
    )
  }
}
