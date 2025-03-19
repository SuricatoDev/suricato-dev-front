import type { NextApiRequest, NextApiResponse } from 'next'
import apiBackend from '@/services/apiBackend'
import { getToken } from 'next-auth/jwt'
import { AxiosError } from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('aqui 2')
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token) {
    return res.status(401).json({ message: 'Acesso negado' })
  }

  const { id, id_reserva } = req.query
  const tokenType = token.token_type || 'Bearer'
  const accessToken = token.access_token

  try {
    switch (req.method) {
      case 'GET': {
        const response = await apiBackend({
          method: 'GET',
          url: `/caravanas/${id}/reservas/${id_reserva}`,
          headers: {
            Authorization: `${tokenType} ${accessToken}`
          }
        })
        return res.status(response.status).json(response.data)
      }

      case 'PUT': {
        const response = await apiBackend({
          method: 'PUT',
          url: `/caravanas/${id}/reservas/${id_reserva}`,
          headers: {
            Authorization: `${tokenType} ${accessToken}`
          },
          data: req.body
        })
        return res.status(response.status).json(response.data)
      }

      case 'DELETE': {
        const response = await apiBackend({
          method: 'DELETE',
          url: `/caravanas/${id}/reservas/${id_reserva}`,
          headers: {
            Authorization: `${tokenType} ${accessToken}`
          }
        })
        return res.status(response.status).json(response.data)
      }

      default:
        return res.status(405).json({ message: 'Method Not Allowed' })
    }
  } catch (error: unknown) {
    const axiosError = error as AxiosError
    return res
      .status(axiosError.response?.status || 500)
      .json(
        axiosError.response?.data || { message: 'Erro interno no servidor' }
      )
  }
}
