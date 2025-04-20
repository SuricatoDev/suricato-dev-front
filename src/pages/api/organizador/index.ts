import type { NextApiRequest, NextApiResponse } from 'next'

import apiBackend from '@/services/apiBackend'
import { AxiosError } from 'axios'
import { getToken } from 'next-auth/jwt'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  if (!token || !token.id) {
    return res.status(403).json({ message: 'Acesso negado' })
  }

  const userId = String(token.id)
  const tokenType = token.token_type || 'Bearer'
  const accessToken = token.access_token

  try {
    const response = await apiBackend({
      method: req.method,
      url: `/register-organizador/${userId}`,
      headers: { Authorization: `${tokenType} ${accessToken}` },
      data: req.body
    })
    return res.status(response.status).json(response.data)
  } catch (error: unknown) {
    const axiosError = error as AxiosError
    return res
      .status(axiosError.response?.status || 500)
      .json(
        axiosError.response?.data || { message: 'Erro interno no servidor' }
      )
  }
}
