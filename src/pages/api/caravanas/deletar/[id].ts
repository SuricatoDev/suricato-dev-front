import type { NextApiRequest, NextApiResponse } from 'next'

import axios, { AxiosError } from 'axios'
import { getToken } from 'next-auth/jwt'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'DELETE') {
    res.setHeader('Allow', ['DELETE'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token?.id) {
    return res.status(403).json({ message: 'Acesso negado' })
  }

  const { id } = req.query

  if (typeof id !== 'string') {
    return res.status(400).json({ message: 'ID da caravana inválido' })
  }

  try {
    const response = await axios.delete(
      `${process.env.BACKEND_URL}/caravanas/${id}`,
      {
        headers: {
          Authorization: `${token.token_type || 'Bearer'} ${token.access_token}`
        }
      }
    )

    return res.status(response.status).json(response.data)
  } catch (err) {
    const axiosError = err as AxiosError
    console.error(
      'Erro no proxy DELETE /caravanas/[id]:',
      axiosError.response?.data || axiosError
    )
    return res
      .status(axiosError.response?.status || 500)
      .json(
        axiosError.response?.data || { message: 'Erro interno no servidor' }
      )
  }
}
